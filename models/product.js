const mongoose = require('mongoose');
//Everything in Mongoose starts with a Schema. Each schema maps to a
//MongoDB collection and defines the shape of the documents within that collection.
//====create schema for product======
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Product name must be provided'],
	},
	price: {
		type: String,
		required: [true, 'Product price must be provided'],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
		enum: {
			values: ['ikea', 'liddy', 'caressa', 'marcos'],
			message: '{VALUE} is not supported',
		},
	},
});

module.exports = mongoose.model('Product', productSchema);
