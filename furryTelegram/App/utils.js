export function getDate(currDate) {
    var date = currDate.getDate(); //Current Date
    var month = currDate.getMonth() + 1; //Current Month
    var year = currDate.getFullYear(); //Current Year
    return (date + '/' + month + '/' + year);
}

export function getDateTime(currDate) {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    return (getDate(currDate) + ' ' + hours + ':' + min + ':' + sec);
}