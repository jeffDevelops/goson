const nodemailer = require('nodemailer');

module.exports = function sendEmail(photo, demographics, callback) {

  const nA = 'Not Provided';
  let altCities;

  if (Object.keys(demographics.locationData).length > 0) {
    altCities = generateAlternateCities(demographics.locationData.alternateCities);
  } else {
    demographics.locationData.lat = nA; 
    demographics.locationData.lng = nA; 
    demographics.locationData.city = nA; 
    demographics.locationData.state = nA;
    altCities = nA;
  }

  if (!demographics.email) demographics.email = nA;
  if (!demographics.insta) demographics.insta = nA;
  if (!demographics.age) demographics.age = nA;
  if (!demographics.zipcode) demographics.zipcode = nA;


  const mailOptions = {
    from: 'jefferydreynolds@gmail.com',
    to: 'jefferydreynolds@gmail.com',
    subject: 'GoSon.org has a new supporter!', // Subject line
    attachments: [{
      filename: photo.filename,
      path: photo.path
    }],
    html: `
      <p><strong>Email:</strong> ${demographics.email}</p>
      <p><strong>Instagram handle:</strong> ${demographics.insta}</p>
      <p><strong>Age:</strong> ${demographics.age}</p>
      <p><strong>Lat, Lng:</strong> ${demographics.locationData.lat}, ${demographics.locationData.lng}</p>
      <p><strong>City:</strong> ${demographics.locationData.city}</p>
      <p><strong>Alternate Cities (Provinces, Suburbs):</strong> ${altCities}</p>
      <p><strong>State:</strong> ${demographics.locationData.state}</p>
      <p><strong>Zipcode:</strong> ${demographics.zipcode}</p>
      <p><strong>Their story:</strong> "${demographics.story}"</p>
    `
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jefferydreynolds@gmail.com',
      pass: 'drmfsltdA440!'
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return callback(error, null);
    }
    console.log(info);
    return callback(null, info);
  })

  function generateAlternateCities(citiesArray) {
    console.log(citiesArray);
    let extractedCities = citiesArray.map(locale => locale);
    let cities = '';
    extractedCities.forEach((city, index, array) => {
      index === array.length - 1
        ? cities += city
        : cities += `${city}, `;
    });
    console.log('Alternate Cities: ', cities);
    return cities;
  }
}