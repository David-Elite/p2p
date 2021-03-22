const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require('./db')
const cookie = require('cookie-parser')

const app = express();
connection;

app.use(cors());

app.use(bodyParser.json());
app.use(cookie())

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/category'));
app.use('/', require('./routes/landing-page'));
app.use('/', require('./routes/tour_packages'));
app.use('/', require('./routes/zone'));
app.use('/', require('./routes/review'));
app.use('/', require('./routes/jobs'));
app.use('/', require('./routes/admin-user'));
app.use('/', require('./routes/home'));
app.use('/', require('./routes/blog'));
app.use('/', require('./routes/page'));

app.use('/', require('./routes/image'));
app.use('/', require('./routes/editor'));
app.use('/', require('./routes/links'));
app.use('/', require('./routes/section'));



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});