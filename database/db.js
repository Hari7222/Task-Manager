require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI ="mongodb+srv://mern:mern@cluster0.neoa3s7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
