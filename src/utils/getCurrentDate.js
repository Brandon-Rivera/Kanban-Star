// Funcion que obtiene la fecha actual en formato yyyy-mm-dd
export default function getCurrentDate(){
    let currDate = new Date();
    let calendarDate = '';
    let currDay = currDate.getDate();
    let currMonth = currDate.getMonth() + 1;
    let currYear = currDate.getFullYear();

    if(currDay < 10){
      currDay = '0' + currDay;
    }

    if(currMonth < 10){
      currMonth = '0' + currMonth;
    }

    calendarDate = currYear.toString() + '-' + currMonth.toString() + '-' + currDay.toString();

    return calendarDate;
}