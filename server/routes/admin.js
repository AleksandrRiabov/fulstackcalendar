const express = require("express");
const router = express.Router();
const Day = require("../models/day");
const Appointment = require("../models/appointment");

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


//DELETE DAY/S ROUTE 

router.delete("/delete", async( req, res ) => {
	req.body.forEach(async(day) =>{
		await Day.findByIdAndDelete(day);
	})
	
	 res.redirect("/dashboard")
});

//DELETE APPOINTMENT/S ROUTE 

router.delete("/appointment/delete", async( req, res ) => {
	req.body.times.forEach(async(time) =>{
	 await Appointment.findOneAndDelete({time});

   const appointmentDay = await Day.findById(req.body.dayId).populate("appointments");
   if (!appointmentDay.appointments.length){
		await Day.findByIdAndDelete(req.body.dayId);
	}
	})
	 res.json({message: "Deleted"})
});

module.exports = router;