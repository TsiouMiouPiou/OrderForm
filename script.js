"use strict";

var delivInfo = {};
var delivSummary = document.getElementById("deliverTo");
var orderInfo = {};
var orderSummary = document.getElementById("order");
var instructionsInfo = {};
var instructionsSummary = document.getElementById("instruction");

// Add event listener for the incr-decr buttons
document.addEventListener("DOMContentLoaded", () => {
  const plusButtons = document.querySelectorAll(".plus");
  const minusButtons = document.querySelectorAll(".minus");
  const numElements = document.querySelectorAll(".num");

  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", () => {
      let currentValue = parseInt(numElements[i].textContent);
      numElements[i].textContent = currentValue + 1;
    });

    minusButtons[i].addEventListener("click", () => {
      let currentValue = parseInt(numElements[i].textContent);
      if (currentValue > 0) {
        numElements[i].textContent = currentValue - 1;
      }
    });
  }
});
// Function that receives the information from the form
function processDeliveryInfo() {
  delivInfo.name = document.getElementById("name").value;
  delivInfo.address = document.getElementById("address").value;
  delivInfo.city = document.getElementById("city").value;
  delivInfo.postal = document.getElementById("postal").value;
  delivInfo.email = document.getElementById("email").value;
  delivInfo.phone = document.getElementById("phone").value;

  for (var prop in delivInfo) {
    if (delivInfo.hasOwnProperty(prop)) {
      delivSummary.innerHTML += "<p>" + delivInfo[prop] + "</p>";
    }
  }

  document.getElementById("deliverTo").style.display = "block";
}
// Function that receives the Instructions from the form
function processInstruction() {
  instructionsInfo.instructions = document.getElementById("instructions").value;

  instructionsSummary.innerHTML = "<p>" + instructionsInfo.instructions + "</p>";
  
  document.getElementById("instruction").style.display = "block";

}

// Function that processes the components choices
function processComponents() {
  var mouseSelect = document.getElementById("mouse");
  var keyboardSelect = document.getElementById("keyboard");
  var monitorSelect = document.getElementById("monitor");

  var mouseQuantity = parseInt(document.getElementById("minus").textContent);
  var keyboardQuantity = parseInt(document.getElementById("plin").textContent);
  var monitorQuantity = parseInt(document.getElementById("mion").textContent);

  var selectedMouse = mouseSelect.options[mouseSelect.selectedIndex].text;
  var selectedKeyboard = keyboardSelect.options[keyboardSelect.selectedIndex].text;
  var selectedMonitor = monitorSelect.options[monitorSelect.selectedIndex].text;

  updateOrderSummary("Mouse", selectedMouse, mouseQuantity);
  updateOrderSummary("Keyboard", selectedKeyboard, keyboardQuantity);
  updateOrderSummary("Monitor", selectedMonitor, monitorQuantity);
}

function updateOrderSummary(item, value, quantity) {
  var existingSummary = orderSummary.innerHTML;
  var newSummary = "<p>" + item + ":" + " "+ value +" =" + " " + quantity  + "X" + "</p>";
  orderSummary.innerHTML = existingSummary + newSummary;
}
// Function that displays the order information
function previewOrder() {
  delivSummary.innerHTML = ""; // Clear previous delivery info
  orderSummary.innerHTML = ""; // Clear previous order info
  instructionsInfo.innerHTML = ""; // Clear previous instructions

  processDeliveryInfo();
  processComponents();
  processInstruction();
  document.getElementsByTagName("section")[0].style.display = "flex";
}

// Event listener for the preview order button
function createEventListener() {
  var submitButton = document.getElementById("previewBtn");

  if (submitButton.addEventListener) {
    submitButton.addEventListener("click", previewOrder, false);
  } else if (submitButton.attachEventListener) {
    submitButton.attachEventListener("onclick", previewOrder);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListener, false);
} else if (window.attachEventListener) {
  window.addEvent("onload", createEventListener);
}
