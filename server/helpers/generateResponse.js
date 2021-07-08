 const generateResponse = (foundDays) => {
	const calendar = {};
	foundDays.forEach( day => {
      const times = Object.keys(day.workingHours).map(key => ({time: key, available: day.workingHours[key]}))
		calendar[day.day] = {workDay: day.workDay, times}
	});
	return calendar;
}

module.exports = generateResponse;