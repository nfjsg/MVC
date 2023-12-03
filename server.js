const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const routes = require('./controllers');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars as the template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware: Parse incoming JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware: Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware: Setup express-session and connect-session-sequelize for persistent sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const sess = {
  secret: 'your_secret_key',
  cookie: { maxAge: 86400000 }, // 1 day
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// Middleware: Include authentication middleware if needed

// Routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

