const express = require("express");
const app = express();
const cors = require('cors');
const moment = require("moment");

app.get("/", cors(), (req, res) => {
     res.json({hello: "Hi from the back end bro !"})
});



app.get("/getmonth/:startdate", cors(), (req, res) => {
   const startdate = req.params.startdate;
	console.log(startdate)
	const generateCalendar = (startingDate) => {
    const value = startingDate;
    const startDay = value.clone().startOf("month").startOf("week");
	const endDay = value.clone().endOf("month").startOf("week");
	const day = startDay.clone().subtract(1, "day");
	

	const calendar = {};
	
	while(day.isBefore(endDay, day)){
		 Array(7)
			.fill(0)
			.map(() => {
				return calendar[day.add(1, "day").clone().format("MM DD YYYY").toString()] = {workDay: true,
               times: [{time: "12:00", available: false}, {time: "15:00", available: true}, {time: "19:30", available: true}, {time: "19:00", available: false}]
               }
			})
	}
	return calendar;
}
	const data = generateCalendar(moment());
	
	res.json(data)
});


app.listen("3001", () => console.log("BAck end started"));