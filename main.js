import { DateTime } from "luxon"

// form
const form = document.querySelector("form");
// span error output
const reqfield = document.querySelectorAll(".requiredErr");
const dayerr = document.getElementById("dayErr");
const montherr = document.getElementById("monthErr");
const yearerr = document.getElementById("yearErr");
// input & label
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
// display
const dissyear = document.getElementById("dissyear");
const dissmonth = document.getElementById("dissmonth");
const dissday = document.getElementById("dissday");


// getting the current year so i can compare it later 
// to the inputed year and see if it is in the past. 
const { year: currentYear } = DateTime.now().toObject()

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputedyear = document.getElementById("yearInput").value;
  const inputedmonth = document.getElementById("monthInput").value;
  const inputedday = document.getElementById("dayInput").value;

  // getting the number of days in the inputed month 
  // and year so i can compare it later to the inputed day
  const day_in_month = DateTime.local(parseInt(inputedyear), parseInt(inputedmonth)).daysInMonth;


  if (inputedyear === "" || inputedmonth === "" || inputedday === "") {
    // if the input is empty than it will give in error
    reqfield.forEach((reqfield) => {
      reqfield.innerText = "This field is required";
      redcolor();
    });
  } else if ((inputedmonth > 12 || inputedmonth < 1) && (isNaN(day_in_month)) && (inputedyear > currentYear)) {
    // i used isNaN to check if the day_in_month is a 
    // number or not because if the inputed month is not
    // a valid month than the day_in_month will be NaN.
    montherr.innerText = "Must be a valid month";
    dayerr.innerText = "Must be a valid day";
    yearerr.innerText = "Must be in the past";
    redcolor();
  }
  else if ((inputedmonth > 12 || inputedmonth < 1) && (isNaN(day_in_month))) {
    montherr.innerText = "Must be a valid month";
    dayerr.innerText = "Must be a valid day";
    redcolor();
  } else if (inputedyear > currentYear) {
    yearerr.innerText = "Must be in the past";
    redcolor();
  } else if (inputedmonth > 12 || inputedmonth < 1) {
    montherr.innerText = "Must be a valid month";
    redcolor();
  } else if (inputedday > day_in_month || inputedday < 1) {
    dayerr.innerText = "Must be a valid day";
    redcolor();
  } else if (inputedyear <= currentYear) {
    reqfield.forEach((reqfield) => {
      reqfield.innerText = "";
    });
    // first remove the error red color if it was there
    removecolor();
    // calculating the difference between the current date and the inputed date.
    // i used DateTime.now() because i want to get the current date and 
    // DateTime.local(inputed year, inputed month, inputed day) because i want to get the inputed date. 
    // then i used diff() to calculate the difference between the current date and the inputed date. 
    const dissplaytime = DateTime.now().diff(DateTime.local(parseInt(inputedyear), parseInt(inputedmonth), parseInt(inputedday)), ['years', 'months', 'days'])

    // then i used diffYears, diffMonths, diffDays to get the difference in years, months, days. 
    const diffYears = dissplaytime.years;
    const diffMonths = dissplaytime.months;
    const diffDays = dissplaytime.days;

    // and finally output the difference 
    dissyear.innerText = diffYears;
    dissmonth.innerText = diffMonths;
    // then i used Math.ceil() to round up the difference in days.
    dissday.innerText = Math.ceil(diffDays);
  }

})

function redcolor() {
  inputs.forEach((input) => {
    input.classList.add("brd--clr--red");
  });
  labels.forEach((label) => {
    label.classList.add("clr--red");
  });
}

function removecolor() {
  inputs.forEach((input) => {
    input.classList.remove("brd--clr--red");
  });
  labels.forEach((label) => {
    label.classList.remove("clr--red");
  });
}
