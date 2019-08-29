

function initialize(){
	var min=document.getElementById("min");
	var max=document.getElementById("max");
		if(parseInt(max,10)<parseInt(min,10)){
		//window.alert("Max cannot be less than min");
		document.getElementById("output").innerHTML = "Max value cannot be less than min";
		max.value="";
		//console.log("here into log validateMax")
	}else {
		update();
	}
}





function update(){
	var min=document.getElementById("min").value;
	var max=document.getElementById("max").value;
	//document.write(angle);
	var minInt = parseInt(min,10);
	var maxInt = parseInt(max,10);
	

     calculate(minInt, maxInt);
}



function calculate(min, max){
	
	
	var nArray = [];
	var n2Array = [];
	var n3Array = [];

	var interval =5;
	
    for (var n=min; n<=max; n+=interval){
    nArray.push(n);
    var n2= Math.pow(n,2) ;
    n2Array.push(n2);
	var n3 = Math.pow(n,3) ;
    n3Array.push(n3);
    }//end for
    updateTable(nArray, n2Array,n3Array);
    
}//end calculate



function updateTable(timeArray, distanceArray,heightArray){
    var dataTable=document.getElementById('data');
    dataTable.innerHTML = '';//empty
    //Header row
    var row=dataTable.insertRow(0);
    var timeCell=row.insertCell(0);
    var distanceCell=row.insertCell(1);
    var heightCell=row.insertCell(2);
    timeCell.innerHTML='Time';
    distanceCell.innerHTML='Distance';
    heightCell.innerHTML='Height'
	
	//document.write("hello this is working.....")

//Insert data
for(var i=0; i<timeArray.length; i++){
	console.log("here")
	var row=dataTable.insertRow(-1);
	var timeCell=row.insertCell(0);
	var distanceCell=row.insertCell(1);
	var heightCell=row.insertCell(2);
	timeCell.innerHTML=timeArray[i];
	distanceCell.innerHTML=distanceArray[i];
	heightCell.innerHTML=heightArray[i]

}

}