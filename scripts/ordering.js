// Sprint 1 - Team 3
// Author: Glen Sturge   Date: Feb 25, 2023

//Constant
const HSTRATE = 0.15;

let deleteBtn;
let tally = 0.0;

const incrementButton = document.getElementsByClassName("inc");
const decrementButton = document.getElementsByClassName("dec");
// console.log(incrementButton);
// console.log(decrementButton);

// Increment
for (var i = 0; i < incrementButton.length; i++) {
  var button = incrementButton[i];
  button.addEventListener("click", function (event) {
    var buttonClicked = event.target;
    // console.log(buttonClicked);
    var input = buttonClicked.parentElement.children[3];
    // console.log(input);
    var inputValue = input.value;
    // console.log(inputValue);
    var newValue = parseInt(inputValue) + 1;
    // console.log(newValue);
    input.value = newValue < 10 ? `0${newValue}` : newValue;
  });
}

// Decrement
for (var i = 0; i < decrementButton.length; i++) {
  var button = decrementButton[i];
  button.addEventListener("click", function (event) {
    var buttonClicked = event.target;
    // console.log(buttonClicked);
    var input = buttonClicked.parentElement.children[3];
    // console.log(input);
    var inputValue = input.value;
    // console.log(inputValue);
    var newValue = parseInt(inputValue) - 1;
    // console.log(newValue);
    if (newValue >= 0) {
      input.value = newValue < 10 ? `0${newValue}` : newValue;
    } else {
      input.value = "00";
    }
  });
}

// Form
let myForm = document.querySelector("#form1");
let inputFields = document.getElementsByClassName("input-field");

console.log(inputFields);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  for (var i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value > 0) addToOrder(i);
  }

  clearFields();
});

const elementSubtotal = document.getElementById("subtotal");
const elementHst = document.getElementById("hst");
const elementTotal = document.getElementById("due");

function addToOrder(i) {
  let get = inputFields[i].parentElement;
  let itemName = get.children[0].textContent.trim().replace(/\n/g, "");
  // console.log(itemName);
  let itemPrice = parseFloat(get.children[1].textContent.replace("$", ""));
  // console.log(itemPrice);
  let itemQty = parseInt(get.children[3].value);
  // console.log(itemQty);
  let subtotal = itemPrice * itemQty;
  // console.log(subtotal);

  let hstDSP = elementHst.innerText.replace("$", "");
  let subtotalDSP = elementSubtotal.textContent.replace("$", "");
  // console.log(subtotalDSP);
  let newSubtotal = (parseFloat(subtotalDSP) + subtotal).toFixed(2);
  // console.log(newSubtotal);
  elementSubtotal.innerText = `$${newSubtotal}`;
  let newHST = (newSubtotal * HSTRATE).toFixed(2);
  elementHst.innerText = `$${newHST}`;
  let newTotal = parseFloat(newHST) + parseFloat(newSubtotal);
  elementTotal.innerText = `$${newTotal.toFixed(2)}`;

  // Add row to table
  let row = document.createElement("tr");

  row.innerHTML = `<td>${itemName}</td><td>${itemQty}</td><td>${itemPrice}<td>${subtotal}</td <td><input type="button" value="X" onclick="deleteRow(this)"/></td>`;
  document.querySelector("#list").appendChild(row);
}

function clearFields() {
  for (var i = 0; i < inputFields.length; i++) {
    inputFields[i].value = "00";
  }
}

// Delete button
function deleteRow(btn) {
  var row = btn.parentNode;
  let deduction = row.children[3].innerText;
  let subtotalDSP = elementSubtotal.textContent.replace("$", "");
  let newSubtotal = (parseFloat(subtotalDSP) - deduction).toFixed(2);
  elementSubtotal.innerText = `$${newSubtotal}`;
  let newHST = (newSubtotal * HSTRATE).toFixed(2);
  elementHst.innerText = newHST;
  let newTotal = parseFloat(newHST) + parseFloat(newSubtotal);
  elementTotal.innerText = `$${newTotal.toFixed(2)}`;
  row.parentNode.removeChild(row);
}

// Ideas for how I should have maybe gone about this...
//
// var orderList = {
//   allDayBreak: ["All Day Breakfast", 11.99, 0, 0],
//   pancakes: ["Pancakes and Sausage", 11.99, 0, 0],
//   burger: ["Burger and Fries", 11.99, 0, 0],
//   grilledCheese: ["Grilled Cheese and Fries", 11.99, 0, 0],
//   clubhouse: ["Clubhouse and Fries", 11.99, 0, 0],
//   grillChicken: ["Grilled Chicken and Fries", 11.99, 0, 0],
//   fries: ["Fries", 11.99, 0, 0],
//   milkshake: ["Milkshake", 11.99, 0, 0],
//   float: ["Ice Cream Float", 11.99, 0, 0],
// };

// console.log(orderList.allDayBreak[0]);
