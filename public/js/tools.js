//HELPER FUNCTIONS - for string formatting etc

function _str2upper(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  
  }

  function _getMonthDate (dateStr) {
    let tempDate = new Date(dateStr);
    //console.log(dateStr +" _-_ "+tempDate);
    let monthNum = tempDate.getMonth();
    //console.log("tempDate: "+tempDate);
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "October", "Nov", "Dec"];
  
    return monthNames[monthNum]+" "+tempDate.getDate();
  }
  function _isFutureEvent (dateStr) {
    let tempDate = new Date(dateStr);
    //tempDate.setDate(tempDate.getDate()-1);
    let todayDate = new Date();
    todayDate.setDate(todayDate.getDate()-1);
    //console.log(todayDate +" _-_ "+tempDate);
  
    return tempDate>=todayDate;
  }
  
  function _getTimeAmPm (timeStr)  {
    let timeArr = timeStr.split(":")
    let end = "AM";
  
    if(timeArr[0]>12)
    {
      let hours = Number(timeArr[0]);
      hours = hours-12;
  
      timeArr[0] = hours.toString();
      end = "PM";
    }
    let result = timeArr[0]+":"+timeArr[1]+end;
  
    return result;
  }