const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const routes = require("./routes/api");

mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Database is connected successfully"))
	.catch((err) => console.log(err));

// mongoose promise is deprecated, we override it with node's promise
mongoose.Promise = global.Promise;

const port = process.env.PORT || 5000;
const app = express();

app.use((req, res, next) => {
	res.header("Allow-Access-Allow-Origin", "*");
	res.header(
		"Allow-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.use(express.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
