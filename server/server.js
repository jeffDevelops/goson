const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const enforce = require('express-sslify');

app.use(enforce.HTTPS({ trustProtoHeader: true }));

// const cloudinary = require('cloudinary');
  
// let config;
// if (process.env.NODE_ENV !== 'prod') {
//   config = require('./env').cloudinary;
// }
// cloudinary.config({
//   cloud_name: config.cloud_name || process.env.cloud_name,
//   api_key:    config.api_key || process.env.api_key,
//   api_secret: config.api_secret || process.env.api_secret
// });

const generateLocationData = require('./demographicInfo');
const sendEmail = require('./email');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// DISK STORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './photo_submissions')
//   },
//   filename(req, file, cb) {
//     cb(null, `${new Date()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage: storage });

// MEMORY STORAGE
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/email', upload.single('image'), async (req, res) => {
  console.log(req.file);
  const meta = req.body; // all other values passed from the client, like name, etc..
  const file = req.file; // file passed from client
  let locationData = {};
  if (meta.zipcode) {
    locationData = await generateLocationData(meta.zipcode);
  }
  console.log('LOCATION DATA IN SERVER: ', locationData);
  const emailData = { locationData, ...meta };
  console.log('EMAIL DATA: ', emailData);
  console.log('FILE: ', file);
  sendEmail({ filename: file.originalname, content: file.buffer }, emailData, (error, info) => {
    if (error) return res.json({ message: 'Email error' });
    return res.json({ message: 'Email sent!' });
  });

});



  // cloudinary.v2.uploader
  // .upload_stream({ resource_type: 'raw', public_id: "go-son", folder: 'go-son' }, (error, result) => {
  //   console.log(`${req.headers.origin}/api/doStuff`);
  //   axios({
  //     url: `${req.headers.origin}/api/doStuff`, //API endpoint that needs file URL from CDN
  //     method: 'POST',
  //     data: {
  //       url: result.secure_url,
  //     },
  //   }).then((response) => {
  //     console.log('AXIOS RESPONSE: ', response);
  //     // you can handle external API response here
  //     res.status(200).json({ success: true, fileUrl: result.secure_url })
  //   }).catch((error) => {
  //     console.log('AXIOS ERROR: ', error);
  //     res.status(500).json({error: error});
  //   });
  // }).end(req.file.buffer);

app.post('/api/doStuff', (req, res) => {
  console.log('doStuff');

  res.json({ message: 'APP.POST!'});

    // console.log('is this happening?');
    // console.log(storage);
  
})

app.use('/', express.static(path.join(__dirname, '../client/build')));
app.get('/*', (req, res) => {
  console.log(__dirname);
  console.log(__dirname + '/client/build');

  console.log('hit');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// function fileUploadMiddleware(req, res, next) {

// }



  // return await cloudinary.uploader.upload_stream((result) => {
  //   axios({
  //     url: '/api/upload', // API endpoint that needs file URL from CDN
  //     method: 'post',
  //     data: {
  //       url: result.secure_url,
  //       name: `${new Date()}-${req.file.originalname}`,
  //     },
  //   }).then((response) => {
  //     console.log(response);
  //     res.status(200).json(response.data.data);
  //   }).catch((error) => {
  //     console.log(error);
  //     res.status(500).json(error.response.data);
  //   });
  // }).end(req.file.buffer);

app.listen(port, (req, res) => console.log(`App listening on port ${port}`));
