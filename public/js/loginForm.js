//console.log("form script")

document.getElementById('login').addEventListener('submit', function(evt){
    evt.preventDefault();
    
    console.log("SUBMITTED")
    var num = document.getElementById('username').value;
    console.log(num)
  
    if(num==""){
      alert("Please Enter a Value!")
      return;
    }
    
    var result= document.createElement("LI");
    
    if(isPrime(num)){
      result.innerHTML = num+" is a prime number";
      result.setAttribute("class", "is-prime")
    }
    else{
      result.innerHTML = num+" is NOT a prime number";
      result.setAttribute("class", "not-prime")
    }
    
    var attemptList = document.getElementById('attempts');
    attemptList.appendChild(result);
  
    document.getElementById('numberInput').value = "";
    
    //document.body.insertBefore(result, attemptList.childNodes[0])
  
  })
  
  
  
  function validateInput(input){
    if(typeof input !== "string") {return false}
    var num = parseInt(input)
    if(isNaN(num)) {return false}
    return true;
  }
  
//   function isPrime( testNumber ){
//     for(let i=2; i<testNumber; i++){
//       if(testNumber%i===0) return false;
//     }
//     return testNumber>1;
//   }
  
  