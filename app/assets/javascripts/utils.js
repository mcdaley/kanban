/******************************************************************************
 * File: assets/javascripts/utils.js
 ******************************************************************************/

/**
 * Format a date string from a JSON object to a locale specific version
 * with just the month, day, and year. If the date param is null return a dash.
 */
function formatDateString(date) {
  var date_str;
  
  if(date == null) {
    date_str = '-';
  }
  else {
    date_str = new Date(date).toLocaleDateString();
  }
  return date_str;
}