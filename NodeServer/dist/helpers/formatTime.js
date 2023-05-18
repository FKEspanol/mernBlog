"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTime(time) {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';
    // Convert hours to a number
    let hour = parseInt(hours, 10);
    // Determine the period (AM or PM)
    const period = hour >= 12 ? 'PM' : 'AM';
    // Adjust hour value for 12-hour format
    if (hour === 0) {
        formattedTime += '12';
    }
    else if (hour > 12) {
        formattedTime += (hour - 12).toString();
    }
    else {
        formattedTime += hour.toString();
    }
    // Append the minutes
    formattedTime += `:${minutes}`;
    // Append the period
    formattedTime += ` ${period}`;
    return formattedTime;
}
const getDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const time = getTime(`${date.getHours()}:${date.getMinutes()}`);
    return `${year}/${month}/${day}/${time}`;
};
exports.default = getDate;
