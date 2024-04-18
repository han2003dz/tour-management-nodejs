// start show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  console.log(time);
  const buttonClose = document.querySelector("[close-alert]");
  const hideAlert = () => {
    showAlert.classList.add("alert-hidden");
  };
  setTimeout(hideAlert, time);
  if (buttonClose) {
    buttonClose.addEventListener("click", hideAlert);
  }
}
// end show-alert
