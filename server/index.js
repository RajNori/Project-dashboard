require('dotenv').config();
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
//path module for production/deploy to heroku 🚀
const path = require('path');

const app = express();

//connect
connectDB();

app.use(cors());

// My settings👇
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

//static folder for serving files in production/deploy to heroku 🚀 ⟠ 👇
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
});
// path resolve for serving the index file 🚀 ⟠ 👆
const PORT = process.env.PORT || 5000;
//deployment 🚀 ⟠ 👆

app.listen(PORT, console.log(`Server running on ${PORT}`));
