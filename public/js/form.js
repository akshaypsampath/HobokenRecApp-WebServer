// //console.log("form script")

//login CHECK
// document.getElementById('login').addEventListener('submit', function(evt){
//     evt.preventDefault();
    
//     console.log("SUBMITTED")
//     var username = document.getElementById('username').value;
//     console.log(username)
//     var password = document.getElementById('password').value;
//     console.log(password)
  
//     if(username=="" && password==""){
//       alert("Username & Password cannot be left blank.")
//       return;
//     }
//     if(username==""){
//       alert("Username cannot be left blank.")
//       return;
//     }
//     if(password==""){
//       alert("Password cannot be left blank.")
//       return;
//     }
//     document.getElementById('login').submit();
  
//   });

  //register CHECk
  
  //login CHECK
(function($) {
  const theForm = $("#login");
  const username = $("#username");
  const password = $("#password");
  console.log(username)
  console.log(password)

  theForm.submit(e => {
    e.preventDefault();
    const formData = {
      username: username.val(),
      password: password.val()
    };
    console.log(formData.username)
    console.log(formData.password)
    if(formData.username=="" && formData.password==""){
      alert("Username & Password cannot be left blank.")
      return;
    }
    if(formData.username==""){
      alert("Username cannot be left blank.")
      return;
    }
    if(formData.password==""){
      alert("Password cannot be left blank.")
      return;
    }

    $.ajax({
      type: "POST",
      url: "/users",
      data: formData,//JSON.stringify(formData),
      // success: function(data) {
      //   console.log(data);
      //   console.log(theResult);
      //   theResult.text(data.reply);

      // },
      success: function (response) {
        console.log(response)
        location.reload();
    },
    error: function (error) {
        console.log("Exception Caught: ")
        console.log(error);
    },
      // contentType: "application/json",
      // dataType: "json"
    });
  });
})(jQuery); // jQuery is exported as $ and jQuery

//updateScore - eventView
if(document.getElementById('updateScore')){
document.getElementById('updateScore').addEventListener('submit', function(evt){
    evt.preventDefault();
    
    console.log("SUBMITTED")
    var team1score = document.getElementById('team1score').value;
    console.log(team1score)
    var team2score = document.getElementById('team2score').value;
    console.log(team2score)
  
    if(team1score=="" && team2score==""){
      alert("Scores cannot be left blank.")
      return;
    }
    if(team1score==""){
      alert("Team 1 Score cannot be left blank.")
      return;
    }
    if(team2score==""){
      alert("Team 2 Score cannot be left blank.")
      return;
    }

    if(team1score<0 && team2score<0){
      alert("Scores cannot be negative.")
      return;
    }
    if(team1score<0){
      alert("Team 1 Score cannot be negative.")
      return;
    }
    if(team2score<0){
      alert("Team 2 Score cannot be negative.")
      return;
    }
    
    document.getElementById('updateScore').submit();
  
  });
}
//updateName CHECK
if(document.getElementById('updateName')){
document.getElementById('updateName').addEventListener('submit', function(evt){
  evt.preventDefault();
  
  console.log("SUBMITTED")
  var name = document.getElementById('name').value;
  console.log(name)

  if(name==""){
    alert("Name cannot be left blank.")
    return;
  }
  // if(name<0){
  //   alert("Team 2 Score cannot be negative.")
  //   return;
  // }
  
  document.getElementById('updateName').submit();

});
}

  
//   function validateInput(input){
//     if(typeof input !== "string") {return false}
//     var num = parseInt(input)
//     if(isNaN(num)) {return false}
//     return true;
//   }
  
// //   function isPrime( testNumber ){
// //     for(let i=2; i<testNumber; i++){
// //       if(testNumber%i===0) return false;
// //     }
// //     return testNumber>1;
// //   }
  
  