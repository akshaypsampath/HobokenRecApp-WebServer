
const Handlebars = require("express-handlebars");
// const tools = require("./tools");

// Handlebars.registerHelper('dateFormat', function(date) {
//     // var url = Handlebars.escapeExpression(object.url),
//     //     text = Handlebars.escapeExpression(object.text);
  
//     return new Handlebars.SafeString(
//         tools._getMonthDate(date)
//     //   "<a href='" + url + "'>" + text + "</a>"
//     );
//   });

var register = function(Handlebars) {
    var helpers = {
        dateFormat: function(param) {
            console.log(param.fn(this).toString())
            let dateStr = param.fn(this).toString();
            let tempDate = new Date(dateStr);
            let monthNum = tempDate.getMonth();
            //console.log("tempDate: "+tempDate);
            let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
            "July", "Aug", "Sept", "October", "Nov", "Dec"];
        
            let str= monthNames[monthNum]+" "+tempDate.getDate()+", "+tempDate.getFullYear();
            return str;
        },
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        cap:function(str){
            let word = str.fn(this).toString();
            word = word.charAt(0).toUpperCase() + word.slice(1);//str[0]
            // console.log(word)
            return word;
            // return new Handlebars.SafeString(word);
        },
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        timeFormat: function (timeStr)  {
            let arr = timeStr.fn(this).toString();
            let timeArr = arr.split(":")
            
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
    };


if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
        Handlebars.registerHelper(prop, helpers[prop]);
    }
} else {
    return helpers;
}
}

module.exports.register = register;
module.exports.helpers = register(null); 