export default function transformDate(date) {
  const selectDate = new Date(date);
  const dateNow = new Date();

  const dateInDays = Math.floor((dateNow - selectDate) / 1000 / 60 / 60 / 24);
  const dateInHours = Math.floor((dateNow - selectDate) / 1000 / 60 / 60);
  const dateInMinutes = Math.floor((dateNow - selectDate) / 1000 / 60);
  const dateInSecond = Math.floor((dateNow - selectDate) / 1000);

  if (dateInDays === 0) {
    if (dateInHours === 0) {
      if (dateInMinutes === 0) {
        return dateInSecond + " sec ago";
      } else {
        return dateInMinutes + " min ago";
      }
    } else {
      return dateInHours + " h ago";
    }
  } else {
    return dateInDays + " d ago";
  }
}
