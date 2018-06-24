const axios = require('axios');

async function getLocationInformation(zipcode) {
  const zipcodeAPIKey = '90a4BsFElFmvuXzZH5KK3lkv33tScR5t2qbLpVdWyjKlcFhHIr83ISY5qdAQwwos';
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