const express = require("express");
const router = express.Router();
const Day = require("../models/day");


// =======================GET ALL BOOKED DAYS INFO
router.get("/bookeddays",  async(req, res) => {
	const bookedDays = await Day.find({}).populate("appointments");
	const respond = bookedDays.map(day => {
      return {dayDate: day.day, booked: day.appointments.length, dayId: day._id}
   })
	res.json(respond);
});


//============================GET SINGLE DAY APPOITMENTS
router.get("/singleday/:id",  async(req, res) => {
	const dayAppointments = await Day.findOne({_id: req.params.id}).populate("appointments");
	res.json(dayAppointments.appointments);
});


module.exports = router;