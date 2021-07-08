const express = require("express");
const router = express.Router();

const getArrayFromRequestedDays = require("../helpers/getArrayFromRequestedDays.js");
const generateResponse = require("../helpers/generateResponse.js");
const moment = require("moment");
const Appointment = require("../models/appointment");
const Day = require("../models/day");


//=======================GET / BUILD CALENDAR
router.get("/getmonth/:startdate",  async(req, res) => {
   const startdate = req.params.startdate;
	const query = getArrayFromRequestedDays(moment(startdate)); // Build Array from requested month dates, to use in mongo search.
	const dates = await Day.find({day: query}).populate("appointments");
	const data = generateResponse(dates);
	
	res.json(data);
});



//  ====================CREATE APPOINTMENT /DAY
router.post("/appointment/create", async(req, res) => {
	const {name, lastName, mobile, email,message, date, time} = req.body;

	const newAppointment = await new Appointment({name, lastName, mobile, email,message, date, time});
   const foundDay = await Day.findOne({day: date});

	 if (foundDay === null) {
				const newDay = await  new Day({day: date});
				newDay.appointments.push(newAppointment);
				newDay.workingHours[time] = false,
				await newDay.save();
				await newAppointment.save();
	 } else if (foundDay ){
				foundDay.appointments.push(newAppointment);
				foundDay.workingHours[time] = false;
				await newAppointment.save();
				await foundDay.save();
				await Day.findByIdAndUpdate(foundDay._id,  foundDay)
	 } 

     res.json({message: "Appointment has been created."})
});


module.exports = router;