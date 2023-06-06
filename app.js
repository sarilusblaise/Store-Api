const express = require('express');
const app = express();
const connectDb = require('./db/connect');
//package for keeping the connection string secret
require('dotenv').config();
require('express-async-errors');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const productsRouter = require('./routes/products');
const { connect } = require('mongoose');

//=========middleware===============

//This is a built-in middleware function in Express. It serves static files and is based on serve-static.
//app.use(express.static());

//This is a built-in middleware function in Express.
//It parses incoming requests with JSON payloads and is based on body-parser.
//Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json());

app.get('/', (req, res, next) => {
	res.send('Life is beautiful, programming is my life');
});

// api/v1/ is products he root route
app.use('/api/v1/products', productsRouter);

// middleware error when route does not exist
app.use(notFound);
// custom middleware error that catch error in related to the database and send to express
app.use(errorHandlerMiddleware);
const port = 5000;

const start = async () => {
	try {
		await connectDb(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port} ...`));
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
	}
};

start();
