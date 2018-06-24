const axios = require('axios');
const zipcodeAPIKey = require('./env').zipcodeAPIKey || process.env.zipcodeAPIKey;

async function getLocationInformation(zipcode) {
  return await axios.get(`https://www.zipcodeapi.com/rest/${zipcodeAPIKey}/info.json/${zipcode}/degrees`);
}

module.exports = async function generateLocationData(zipcode) {
  return await getLocationInformation(zipcode)
    .then(response => {
      const data = {
        lat: response.data.lat,
        lng: response.data.lng,
        city: response.data.city,
        state: response.data.state,
        alternateCities: response.data.acceptable_city_names.map(locale => locale.city),
      };
      console.log(data);
      return data;
    })
    .catch(error => {
      console.log(error);
      return 'Location data unavailable';
    });
}