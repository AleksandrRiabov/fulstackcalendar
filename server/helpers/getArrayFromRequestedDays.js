
const getArrayFromRequestedDays = (startingDate) => {
   const value = startingDate;
   const startDay = value.clone().startOf("month").startOf("week");
  const endDay = value.clone().endOf("month").startOf("week");
  const day = startDay.clone().subtract(1, "day");
    
   const dates = [];
  while(day.isBefore(endDay, day)){
   Array(7)
     .fill(0)
     .map(() => {
        return  dates.push(day.add(1, "day").clone().format("MM DD YYYY").toString());
      }
    )
}
  return dates;
}

module.exports = getArrayFromRequestedDays;