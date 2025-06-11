require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

// Create a Neon SQL client using your DATABASE_URL from .env
const sql = neon(process.env.DATABASE_URL);

const express = require("express");

const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const cors = require("cors");

// Allow requests from your frontend (adjust the origin if needed)
app.use(cors({
  origin: "https://myshopz.netlify.app",
  credentials: true
}));

const db = require("./models");
const { where } = require("sequelize");
const Item = db.Item;
const User = db.User;


app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));


const cookieParser = require("cookie-parser");
// const csrf = require("tiny-csrf");
const user = require("./models/user");

app.use(cookieParser("secret"));

app.set('trust proxy', 1);
// Session middleware (must come before passport)
app.use(
  session({
    secret: "your_session_secret_here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // or 'username' if you use username
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) return done(null, false, { message: "Incorrect email." });
        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: "Incorrect password." });
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


//Routes
app.get("/", (req, res) => {
  res.send("myShop backend is running!");
});



//yes

app.post("/signup", async (req, res, next) => {
  try {
    const { name, shopName, siteName, number, email, password } = req.body;
    // Check for existing email, number, or siteName
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered." });
    }
    const existingNumber = await User.findOne({ where: { number } });
    if (existingNumber) {
      return res.status(400).json({ message: "Phone number already registered." });
    }
    const existingSite = await User.findOne({ where: { siteName } });
    if (existingSite) {
      return res.status(400).json({ message: "Site name already taken." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      shopName,
      siteName,
      number,
      email,
      password: hashedPassword,
    });
    req.login(user, function (err) {
      if (err) { return next(err); }
      return res.status(201).json({ message: "Account created and logged in!", user });
    });
  } catch (error) {
    // Handle unique constraint errors from the DB
    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0]?.path;
      if (field === 'number') {
        return res.status(400).json({ message: "Phone number already registered." });
      }
      if (field === 'email') {
        return res.status(400).json({ message: "Email already registered." });
      }
      if (field === 'siteName') {
        return res.status(400).json({ message: "Site name already taken." });
      }
      return res.status(400).json({ message: "Duplicate field error." });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Signup failed. Please try again." });
  }
});



app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: info?.message || "Invalid credentials" });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      // Authentication successful, send user info as JSON
      return res.json({ success: true, user });
    });
  })(req, res, next);
});

app.get("/logout", ensureLoggedIn('/login'), (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
}
);



app.get("/loggedin", ensureLoggedIn('/login'), async (req, res) => {
  // const user = await User.findOne({ where: { id: req.user.id } });
  // return res.render("account", { title: "myShop Account", data: user, siteName: user.siteName, csrfToken: req.csrfToken(), active: 'account' }); // Pass the user's siteName to the view
  return res.json({ success: true })
})

app.get("/account", ensureLoggedIn('/login'), async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  // return res.render("account", { title: "myShop Account", data: user, siteName: user.siteName, csrfToken: req.csrfToken(), active: 'account' }); // Pass the user's siteName to the view
  return res.json(user)
})


app.post("/account", ensureLoggedIn('/login'), async (req, res) => {
  try {
    const user = await User.update(
      { name: req.body.name, siteName: req.body.siteName, number: req.body.number, shopName: req.body.shopName },
      { where: { id: req.user.id } }
    );
    return res.json({ success: true, message: "Account updated successfully!" });
  } catch (error) {
    console.error("Error updating account:", error);
    return res.send("Error updating account");
  }
}
);

//Route to get all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.getAllItem(req.user.id);
    return res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json(error);
  }
});

//Route to add an item
app.post("/additem", ensureLoggedIn('/login'), async (req, res) => {
  try {
    const item = await Item.addItem({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      userId: req.user.id, // Associate item with logged-in user
    });
    return res.json({ success: true });
  } catch (error) {
    console.error("Error adding item:", error);
    return res.send("Error adding item");
  }
});

//Route to update an item
app.post("/update", ensureLoggedIn('/login'), async (req, res) => {
  try {
    const item = await Item.updateItem({
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      userId: req.user.id, // Associate item with logged-in user
    });
    return res.json({ success: true });
  } catch (error) {
    return res.send("Error updating item");
  }
});

//Route to delete an item
app.delete("/delete/:id", ensureLoggedIn('/login'), async (req, res) => {
  try {
    const item = await Item.deleteItem({ id: req.params.id, userId: req.user.id }); // Ensure the item belongs to the logged-in user
    return res.send("Item deleted successfully!");
  } catch (error) {
    return res.send("Error deleting item");
  }
});


app.get("/myshop/:siteName", async (req, res) => {
  try {
    const user = await User.findOne({ where: { siteName: req.params.siteName } });
    if (!user) {
      return res.status(404).json({ message: "Site not found!" });
    }
    const items = await Item.getAllItem(user.id);
    res.json({
      shopName: user.shopName,
      siteName: user.siteName,
      number: user.number,
      items
    });
  } catch (error) {
    console.error("Error loading template:", error);
    res.status(500).json({ message: "Error loading site!" });
  }
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication
    res.redirect('/dashboard');
  }
);

app.post("/contact", ensureLoggedIn('/login'), async (req, res) => {
  const { name, email, message } = req.body;

  // Configure your transporter (use your real email and app password or SMTP credentials)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  // Email options
  let mailOptions = {
    from: email,
    to: 'customerhelp.myprod@gmail.com',
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Thank you for reaching out! We'll get back to you soon." });
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).json({
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later."
    });
  }
});


module.exports = app;
