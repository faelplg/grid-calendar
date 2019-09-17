/*
 * Imports
 */
import './style.css';
import moment from 'moment';
import Calendar from './calendar/calendar.class.js';

/*
 * Understanding date operations
 */
const today = moment();
console.log(`Today is ${today.format('DD/MM/YYYY')}`);
console.log(`The day of the week is ${today.day() + 1}`); // starts with 0
console.log(`The day of the month is ${today.date()}`);
console.log(`The month of the year is ${today.month() + 1}`); // starts with 0
console.log(`The year is ${today.year()}`);

/*
 * Manipulating calendar
 */
const myCalendar = new Calendar(today.date(), today.month(), today.year());
console.log(myCalendar);

const monthArray = myCalendar.formatMonth();
console.log(monthArray);

/*
 * Setting the HTML
 */
/** Create title */
const pageTitle = document.createElement('div');
pageTitle.className = 'title';
pageTitle.innerHTML = `<h1>${today.local().format('dddd, MMMM Do YYYY')}</h1>`;
/** Create the calendar toolbar */
const pageTools = document.createElement('div');
pageTools.className = 'toolbar';
/** Create the calendar content */
const pageContainer = document.createElement('div');
pageContainer.className = 'container';

/*
 * Rendering
 */
myCalendar.render(pageContainer, pageTools, monthArray);

/*
 * Appending into app
 */
const app__div = document.getElementById('app');
app__div.appendChild(pageTitle);
app__div.appendChild(pageTools);
app__div.appendChild(pageContainer);