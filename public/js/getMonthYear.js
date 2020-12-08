"use strict";
const getMonthYear = (dateString) => {
    const newDate = new Date(dateString);
    return (`${newDate.toLocaleString('default', { month: 'long' })} ${newDate.getFullYear().toString()}`);
};
module.exports = getMonthYear;
