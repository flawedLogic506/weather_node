// Core modules
const path = require('path');

// Npm modules
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Static content config
app.use(express.static(path.join(__dirname, '../public')));

// Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Resolve routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jorge A'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Jorge A'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is some help message HBS87548',
    title: 'Help Page',
    name: 'Jorge A'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({error: 'No address provided'});
  }
  
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({error});
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    name: 'Jorge A',
    errorMessage: 'Help article not found. Please try with another search'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page Not Found',
    name: 'Jorge A',
    errorMessage: '404 Page not found!'
  })
})

app.listen(port, () => {
  console.log('Server running..')
});