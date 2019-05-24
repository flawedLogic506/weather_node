const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZmxhd2VkbG9naWM1MDYiLCJhIjoiY2p2cjlidXFsMGU0dDQ0b2VnemxyYTA3eCJ9.Oiy2he_Cr2sIxp-4b5YChw&limit=1`;
  request({url, json:true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect', undefined);
    } else if(body.features.length === 0) {
      callback('Unable to find place. Try again', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  });
}

module.exports = geocode;