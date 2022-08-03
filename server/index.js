const express = require('express');
const colors = require('colors');
const cors = require ('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const connectDB  = require('./config/db')
//path module for production/deploy to heroku 🚀
const path = require('path')


const app = express();

//connect
connectDB()

app.use(cors())

app.use('/graphql', graphqlHTTP({
 schema,
 graphiql: process.env.NODE_ENV === 'development'
}))

//sttic folder for serving files in production/deploy to heroku 🚀 ⟠ 👇
app.use(express.static('public'));

app.get('*',(req,res)=>{
 res.sendFile(path.resolve(__dirname,'public','index.html'))
})
// path resolve for serving the index file 🚀 ⟠ 👆
const port = process.env.PORT || 5000;
//deployment 🚀 ⟠ 👆


app.listen(port, console.log(`Server running on ${port}`))