if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const dbPassword = process.env.Mongo_Atlas_Password;
const mongoLogin = process.env.Mongo_login;

const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");

const calendarRoutes = require("./routes/calendar");
const adminRoutes = require("./routes/admin");


app.use(express.json({extended: true})); 

mongoose.connect("mongodb+srv://"+ mongoLogin +":" + dbPassword+ "@calendar.uwuzq.mongodb.net/<CalendarApp>?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}).then(() => {
	console.log(" BE CAREFULL: Connected to PRODACTION DB")
}).catch(err => {
	console.log("Something whent wrong!")
    console.log(err.message)
});

//Routes
app.use("/", cors(),calendarRoutes);
app.use("/", cors(),adminRoutes);



app.listen("3001", () => console.log("BAck end started"));