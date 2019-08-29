var SERVER_URL = 'http://dev.cs.smu.ca:8155';


function validateForm() {
  var name = document.forms["myForm"]["name"].value;
    var address = document.forms["myForm"]["address"].value;
  var phoneNumber = document.forms["myForm"]["phoneNumber"].value;

  if (name == "" || address == "" || phoneNumber == "") {
    alert("All field must be filled out");
    return false;
	
  }else {
	  if(isNaN(phoneNumber)){
		      alert("PhoneNumber must be number");

		  return false;
	  }else{
		  return true;
	  }
  }
}
$(document).ready(function () {


$("#saveButton").click(function () {
	console.log("save button is called");
		var university = {
		"name": $("#name").val(),  "address": $("#address").val(),
		"phoneNumber": $("#phoneNumber").val()
		};
	
	if(validateForm() == true){
		
	$.post(SERVER_URL + '/saveUniversity', university,
			function (data) {
				alert(data);
				}).fail(function (error) {
					alert(error.responseText);
				});
	}

});



//search value passing to the server


$("#searchButton").click(function() {
		var universityName = {"name":$("#search").val()};
		
		$.post(SERVER_URL + '/searchUniversity', universityName,
				function(data){
					alert("Results from server"+data);
					updateTable(data);
				}).fail(function (error){
					alert("Erorr feels like::"+error.responseText);
				});
});

// display all values
$("#displayButton").click(function(){
	console.log("display button clicked...");
$.post(SERVER_URL + '/readUniversity',null,
// you could also pass null,  or an empty string etc
function (data) {
	//code if success, data is an array of rectangles
	// (in the next slide)
	//alert("REsults: "+data);
	//$('#result').html(data);
	updateTable(data);
	}).fail(function (error) {
		alert(error.responseText);
		});

});

$("#deleteButton").click(function () {
	var university = {
		"name": $("#name").val(),  "address": $("#address").val(),
		"phoneNumber": $("#phoneNumber").val()
		};
	$.post(SERVER_URL + '/removeUniversity', university,
	function (data) {
		alert("delete item number:"+data.n);//attribute "n"
		}).fail(function (error) {
			alert(error.responseText);
			});
	});

});




function updateTable(uniArray){
	if (uniArray == null || uniArray.length == 0) {           
				alert("No record found"); //no record whatsoever, let the user know
			}
			else {
				alert('Records downloaded successfully!');
	var dataTable=document.getElementById('data');
	dataTable.innerHTML = '';//empty
	
	//Header row
	var row=dataTable.insertRow(0);
	var nameCell=row.insertCell(0);
	var addressCell=row.insertCell(1);
	var phoneCell=row.insertCell(2);
	nameCell.innerHTML='University Name';
	addressCell.innerHTML='Address';
	phoneCell.innerHTML='Phone Number';
	
	
//Insert data
for(var i=0; i<uniArray.length; i++){
	var row=dataTable.insertRow(-1);
	var nameCell=row.insertCell(0);
	var addressCell=row.insertCell(1);
	var phoneCell=row.insertCell(2);
	nameCell.innerHTML=uniArray[i].name;
	addressCell.innerHTML=uniArray[i].address
	phoneCell.innerHTML=uniArray[i].phoneNumber;
	}//end for
}
}


