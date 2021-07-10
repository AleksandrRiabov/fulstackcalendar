let mongoose = require("mongoose");

let appointmentSchema = new mongoose.Schema({ 
		name: String,
      lastName: String,
		mobile: String,
		message: String,
	   date: String,
		time: String,
	    timeStamp: Date,
	    overdue: Boolean,
	    status: String,
	    notes: String,
		 email: String
});


module.exports = mongoose.model("Appointment", appointmentSchema);