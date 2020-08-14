/**
 * Change date to name of the month plus the 4 digit year
 * @param {string} dateString - date value
 * @return {string} - month and year - example: January 2020
 */
const getMonthYear = (dateString: string) => {
  let newDate = new Date(dateString);

  return (
    newDate.toLocaleString('default', { month: 'long' }) +
    ' ' +
    newDate.getFullYear().toString()
  );
};

module.exports = getMonthYear;
