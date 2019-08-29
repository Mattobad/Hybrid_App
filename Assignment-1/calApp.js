function add (){
	var number1 = document.getElementById("number1").value;
	var number2 = document.getElementById("number2").value;

	document.getElementById("output").innerHTML = parseInt(number1,10) + parseInt(number2,10);
	//document.getElementById("velocityDisplay").innerHTML = velocity;
}

function multiply (){
	var number1 = document.getElementById("number1").value;
	var number2 = document.getElementById("number2").value;

	document.getElementById("output").innerHTML =parseInt(number1,10) * parseInt(number2,10);
	//document.getElementById("velocityDisplay").innerHTML = velocity;
}

function divide (){
	var number1 = document.getElementById("number1").value;
	var number2 = document.getElementById("number2").value;

	document.getElementById("output").innerHTML = parseInt(number1,10) / parseInt(number2,10);
	//document.getElementById("velocityDisplay").innerHTML = velocity;
}

function subtract (){
	var number1 = document.getElementById("number1").value;
	var number2 = document.getElementById("number2").value;

	document.getElementById("output").innerHTML = parseInt(number1,10) - parseInt(number2,10);
	//document.getElementById("velocityDisplay").innerHTML = velocity;
}