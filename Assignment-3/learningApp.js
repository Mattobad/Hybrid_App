function redirectPage(){


	password = "1234";
	userName ="sarbo"

	//if the password matches
	if (document.getElementById("passcode").value === password 
		&& document.getElementById("username").value === userName ){
	//if not agreed yet
if (localStorage.getItem("agreedToLegal") === null) {
	$("#btnEnter").attr("href","#legalNotice").button();
} else if (localStorage.getItem("agreedToLegal") === "true") {
	$("#btnEnter").attr("href","#pageMenu").button();
}
}else {
	alert("Incorrect username/password, please try again.");
}

}

/* Clear History of the app*/

function clearRecordHistory(){

	// Removes all record data from localStorage 
	$("#btnClearHistory").click(function () {
		localStorage.removeItem("tbRecords");
		listRecords();
		alert("All records have been deleted.");
	});
}

function AddNewRecord(){
/* The value of the Submit Record button is used
* to determine which operation should be
* performed
*/
$("#btnAddRecord").click(function () {
	/*.button("refresh") function forces jQuery
	* Mobile to refresh the text on the button
	*/
	$("#btnSubmitRecord").val("Add").button("refresh");
});

}

function checkAddOrEditRecord() {
	var formOperation = $("#btnSubmitRecord").val();
	if (formOperation == "Add Learning Path") {
		addRecord();
		$.mobile.changePage("#pageRecords");
	} else if (formOperation == "Update Expense") {
		editRecord($("#btnSubmitRecord").attr("indexToEdit"));
		$.mobile.changePage("#pageRecords");
		$("#btnSubmitRecord").removeAttr("indexToEdit");
	}
	/*Must return false, or else submitting form
	* results in reloading the page
	*/
	return false;}


/* Adds given text value to the password text * field*/
function addValueToPassword(button) {
var currVal = $("#passcode").val();
if (button === "bksp") {
$("#passcode").val(currVal.substring(0, currVal.length - 1));
} 
else {
$("#passcode").val(currVal.concat(button));
}
}


/** Function to store the data on click of sign up **/

function saveSignUpUser(){
	console.log("inside saveSignUpUser function")
	var user ={
		"FirstName": $("#signupFirstName").val(),
		"LastName": $("#signupLastName").val(),
		"DateofBirth": $("#date").val(),
		"EmailId": $("#emailId").val(),
		"NewPassword": $("#confirmPassword").val(),
		"Gender": $("signgenderType option:selected").val()
	};


	try{
		localStorage.setItem("user", JSON.stringify(user));
		alert("Saving Information");
				$.mobile.changePage("#legalNotice");
				window.location.reload();
	}catch (e){
		/* Google browsers use different error
		 * Constant
		 */
		 if(window.navigator.vender ==="Google Inc."){
		 	if(e == DOMException.QUOTA_EXCEEDED_ERR){
		 	alert("Error: Local Storage limit exceeds.");
		 }
		}else if(e == QUOTA_EXCEEDED_ERR){
			alert("Error: Saving to local Storage.");
		}

		console.log(e);
	}
}


/* Records that the user has agreed to the legal 
* disclaimer on this device/browser
*/

function saveDisclaimer(){
	localStorage.setItem("agreedToLegal","true");
	$.mobile.changePage("#pageMenu");
	window.location.reload();
}