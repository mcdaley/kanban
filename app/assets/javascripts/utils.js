/******************************************************************************
 * File: assets/javascripts/utils.js
 ******************************************************************************/

///////////////////////////////////////////////////////////////////////////////
// TODO: 05/17/2016
// -  NEED TO LOOK INTO USING THE moments.js JAVASCRIPT LIBRARY TO HANDLE
//    THE DATE/TIME FORMATTING.
///////////////////////////////////////////////////////////////////////////////

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