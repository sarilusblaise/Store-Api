const Product = require('../models/product');
const getAllProducts = async (req, res) => {
	let queryObject = {};
	const { featured, name, company } = req.query;
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (name) {
		queryObject.name = name;
	}
	if (company) {
		queryObject.company = company;
	}
	if (company) {
		queryObject.name = { $regex: search, $options: 'i' };
	}
	const products = await Product.find(queryObject);
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
	const search = 'a';
	const products = await Product.find({
		name: { $regex: search, $options: 'i' },
	});
	res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getAllProducts, getAllProductsStatic };
