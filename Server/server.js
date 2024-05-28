const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const routes = require('./src/routes');
//const connection = require('./src/config/connect_db');

const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

// const port = 3001;
// const hostname = "localhost";

// parse application/json

const corsOptions = {
  origin: ['http://localhost:3030', 'https://event.ptepathway.com'], // URLs of your React apps
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods if needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(
//   cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// db.Roles.create({
//   id:"1",
//   name: "admin"
// })
// db.Roles.create({
//   id:"2",
//   name: "user"
// })
// db.Roles.findAll()
// .then(users => {
//   // Xử lý dữ liệu trả về ở đây
//   console.log(users); // In ra tất cả các bản ghi
// })
// .catch(error => {
//   // Xử lý lỗi nếu có
//   console.error('Error occurred while retrieving users:', error);
// });
//console.log(db.Role);
app.get('/', (req, res) => {
  return res.send(`Server is running.. ${Date()}`);
})
routes(app);

app.listen(port, hostname, () => {
  console.log(`Server up and running on port ${hostname}:${port}`);
});
