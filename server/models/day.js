const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Appointment = require("./appointment");

const daySchema = new mongoose.Schema({ 
		day: "",
      appointments: [{type: Schema.Types.ObjectId, ref: "Appointment"}],
      workDay: {
         type: Boolean,
         default: true
      },
      workingHours: {
         type: {},
         default: {
            "08:00": true,
            "09:00": true,
            "10:00": true,
             "11:00": true,
            "12:00": true,
            "13:00": true,
             "14:00": true,
            "15:00": true,
            "16:00": true
         }
      },
});


//TO DELETE ALL REVIEWS WIDTH REMOVED CAMPGROUND/  This is mongo middleware which runs before "findOneAndDelete"

daySchema.post("findOneAndDelete", async function(doc) {
	if (doc){
		await Appointment.deleteMany({
			_id:{
				$in: doc.appointments
			}
		});
	}
});

module.exports = mongoose.model("Day", daySchema);