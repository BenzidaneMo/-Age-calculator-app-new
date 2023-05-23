import { DateTime } from "luxon"

const form = document.querySelector("form");
const dissyear = document.getElementById("dissyear");
const dissmonth = document.getElementById("dissmonth");
const dissday = document.getElementById("dissday");
const reqfield = document.querySelectorAll(".requiredErr");
const dayerr = document.getElementById("dayErr");
const montherr = document.getElementById("monthErr");
const yearerr = document.getElementById("yearErr");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");


let { year: currentYear } = DateTime.now().toObject()

form.addEventListener("submit", (event) => {
  event.preventDefault();

  var inputedyear = document.getElementById("yearInput").value;
  var inputedmonth = document.getElementById("monthInput").value;
  var inputedday = document.getElementById("dayInput").value;


  const inputDate = DateTime.fromObject({
    year: Number(inputedyear),
    month: Number(inputedmonth),
    day: Number(inputedday),
  });

  // var timeee = DateTime.local(parseInt(year.value), parseInt(month.value), parseInt(day.value));
  // console.log(timeee);
  if ((inputDate.isValid) && (inputedyear <= currentYear)) {
    reqfield.forEach((reqfield) => {
      reqfield.innerText = "";
    });
    removecolor();
    var dissplaytime = DateTime.now().diff(DateTime.local(parseInt(inputedyear), parseInt(inputedmonth), parseInt(inputedday)), ['years', 'months', 'days'])
    var diffYears = dissplaytime.years;
    var diffMonths = dissplaytime.months;
    var diffDays = dissplaytime.days;

    dissyear.innerText = diffYears;
    dissmonth.innerText = diffMonths;
    dissday.innerText = Math.ceil(diffDays);
  }
  else {
    if (inputedyear === "" || inputedmonth === "" || inputedday === "") {
      reqfield.forEach((reqfield) => {
        reqfield.innerText = "This field is required";
        redcolor();
      });
    } else if (inputedyear > currentYear) {
      yearerr.innerText = "Must be in the past";
      redcolor();
    }
    else if (inputDate.invalidReason && inputDate.invalidReason.includes("month")) {
      montherr.innerText = "Must be a valid month";
      redcolor();
    } else if (inputDate.invalidReason && inputDate.invalidReason.includes("day")) {
      dayerr.innerText = "Must be a valid day";
      redcolor();
    }
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
