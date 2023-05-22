import { DateTime } from "luxon"
// import { setupCounter } from './counter.js'

const form = document.querySelector("form");
const dissyear = document.getElementById("dissyear");
const dissmonth = document.getElementById("dissmonth");
const dissday = document.getElementById("dissday");


// let { year: currentYear, month: currentMonth, day: currentDay } = DateTime.now().toObject()
// let nowtime = DateTime.now().toObject()

// console.log(currentYear, currentMonth, currentDay)


form.addEventListener("submit", (event) => {
  event.preventDefault();

  var year = document.getElementById("yearInput");
  var month = document.getElementById("monthInput");
  var day = document.getElementById("dayInput");

  // var timeee = DateTime.local(parseInt(year.value), parseInt(month.value), parseInt(day.value));
  // console.log(timeee);

  var dissplaytime = DateTime.now().diff(DateTime.local(parseInt(year.value), parseInt(month.value), parseInt(day.value)), ['years', 'months', 'days'])
  var diffYears = dissplaytime.years;
  var diffMonths = dissplaytime.months;
  var diffDays = dissplaytime.days;

  dissyear.innerHTML = diffYears;
  dissmonth.innerHTML = diffMonths;
  dissday.innerHTML = Math.ceil(diffDays);

  // let { year: currentYear, month: currentMonth, day: currentDay } = dissplaytime;
  // console.log(currentYear, currentMonth, currentDay)


})


// setupCounter(document.querySelector('#counter'))
