const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const generateLocationData = require('./demographicInfo');
const sendEmail = require('./email');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', express.static(path.join(__dirname, '../client/build')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './photo_submissions')
  },
  filename(req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

app.post('/email', upload.single('image'), async (req, res) => {
  const file = req.file; // file passed from client
  const meta = req.body; // all other values passed from the client, like name, etc..
  let locationData = {};
  if (meta.zipcode) {
    locationData = await generateLocationData(meta.zipcode);
  }
  console.log('LOCATION DATA IN SERVER: ', locationData);
  const emailData = { locationData, ...meta };
  console.log('EMAIL DATA: ', emailData);

  console.log('FILE: ', file);
  sendEmail({ filename: 'Go Son Campaign', path: file.path }, emailData, (error, info) => {
    if (error) return res.json({ message: 'Email error' });
    return res.json({ message: 'Email sent!' });
  });
});

app.get('/*', (req, res) => {
  console.log(__dirname);
  console.log(__dirname + '/client/build');

  console.log('hit');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, (req, res) => console.log(`App listening on port ${port}`));
