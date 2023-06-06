require('dotenv').config();
const connectDD = require('./db/connect');
const product = require('./models/product');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
	try {
		await connectDD(process.env.MONGO_URI);
		product.deleteMany();
		product.create(jsonProducts);
		console.log('success');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
start();
