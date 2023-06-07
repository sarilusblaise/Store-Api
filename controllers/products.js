const Product = require('../models/product');
const getAllProducts = async (req, res) => {
	let queryObject = {};
	const { featured, name, company, sort, fields } = req.query;
	if (featured) {
		queryObject.featured = featured === 'true' ? true : false;
	}
	if (name) {
		queryObject.name = name;
	}
	if (company) {
		queryObject.company = company;
	}
	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}

	let result = Product.find(queryObject);
	if (sort) {
		sortList = sort.split(',').join(' ');
		result = result.sort(sortList);
	} else {
		result = result.sort('createdAt');
	}

	if (fields) {
		fieldsList = fields.split(',').join(' ');
		result = result.select(fieldsList);
	}
	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;
	result = result.skip(skip).limit(limit);
	const products = await result;
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({});
	res.status(200).json({ products, nbHits: products.length });
};
module.exports = { getAllProducts, getAllProductsStatic };
