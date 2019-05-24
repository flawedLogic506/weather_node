const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/8bfe73adbee0a652190e6c9ccd1e1d21/${lat},${long}?units=si`;
  request({url, json: true}, (error, {body}) => {
    if(error) {
      callback('No network access', undefined);
    } else if(body.error) {
      callback('Unable to locate that place', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' outside.There is a ' + body.currently.precipProbability * 100 + '% chance of rain');
    }
  });
};

module.exports = forecast;