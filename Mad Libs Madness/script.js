function formValue(id) {
  let formElement = document.getElementById(id);
  
  if (formElement === null) {
    return `[${id} NOT FOUND]`;
  }

  let value = formElement.value;

  if (formElement.value.trim() === "") {
    return `[${formElement.placeholder}]`;
  }

  return document.getElementById(id).value;
}

function addClassToElement(id, className) {
  let element = document.getElementById(id);
  element.classList.add(className);
}

function generate() {
//Retrieve Form Values
let relative = formValue("relative");
let adjective1 = formValue("adjective-1");
let adjective2 = formValue("adjective-2");
let adjective3 = formValue("adjective-3");
let famousPerson = formValue("famous-person");
let noun = formValue("noun");
let dessert = formValue("dessert");
let petName = formValue("pet-name");

let madLib = `
Dear ${relative},
<br><br>
I have been having a really ${adjective1} time 
at camp. The counselour is ${adjective2} and 
the food is ${adjective3}. I met ${famousPerson} 
and we quickly became ${noun}. Talk soon!
<br><br>
Your ${dessert},
<br>
${petName}
`;

document.getElementById("output").innerHTML = madLib;
addClassToElement("container","generated");
}
