function setTodaysDate() {
  var today = new Date();
  var dd = ("0" + today.getDate()).slice(-2);
  var mm = ("0" + (today.getMonth() + 1)).slice(-2);
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  document.getElementById("todays-date").value = today;
}
setTodaysDate();
