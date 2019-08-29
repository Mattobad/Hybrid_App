/*Runs the function to display the user information, history,
 * graph or suggestions, every time their div is shown
 */
      
      $(document).on("pageshow", function () {
         if ($('.ui-page-active').attr('id') == "pageRecords"){
            loadPageRecords();
            loadHourSpend();

         }

         else if ($('.ui-page-active').attr('id') == "pageUserInfo"){
            loadUserInformation();
         }
		 else if ($('.ui-page-active').attr('id') ==
				"pageAdvice") {
				advicePage();
				resizeGraph();
		} else if ($('.ui-page-active').attr('id') ==
				"pageGraph") {
				drawGraph();
				resizeGraph();
			  }

});






        $(document).ready(function(){
        // Removes all record data from localStorage 
        $("#btnClearHistory").click(function () {
          localStorage.removeItem("tbRecords");
          /*listRecords();*/
          alert("All records have been deleted.");
          loadHourSpend();
          window.location.reload();
        });
      });



        function addValueToPassword(button) {
            var currVal = $("#passcode").val();
            if(button === "bksp"){
                $("#passcode").val(currVal.substring(0, currVal.length - 1));
            }
            else{
              $("#passcode").val(currVal.concat(button));
            }
          }

        function saveSignUpUser(){

          if (validateUserForm() == true){
            var user = {
              "FirstName" :$("#signupFirstName").val(),
              "LastName" : $("#signupLastName").val(),
              "DateOfBirth" : $("#dateOfBirth").val(),
              "EmailId" : $("#signupEmailId").val(),
              "NewPassword" : $("#confirmPassword").val(),
              "Gender": $("#signgenderType option:selected").val()
              };

              try{
                
                localStorage.setItem("user", JSON.stringify(user));
                alert("Saving Information");
                
                $.mobile.changePage("#legalNotice");
                window.location.reload();
              } catch(e){
                
                if (window.navigator.vendor === "Google Inc."){
                  if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                  alert("Error: Local Storage limit exceeds");
                 }
               }  else if (e == QUOTA_EXCEEDED_ERR){
                alert("Error: Saving to local Storage");
               }
               console.log(e);
            }
            }else
          {
            alert(" Invalid enteries");
             /*$.mobile.changePage("#pageSignup");*/
              window.location.reload();
          }
        }

        function redirectPage(){
          //if the password matches
            var user = JSON.parse(localStorage.getItem("user"));
			//console.log(user[1]);
			//for (var i = 0; i < user.length; i++) {
            //var rec = user[i];
			var password = user.NewPassword;
			var username = user.FirstName;
			console.log(user);
			console.log(password + " "+ username );

            if (document.getElementById("passcode").value === password && document.getElementById("username").value === username )
            {
                //if not agreed yet
                if (localStorage.getItem("agreedToLegal") === null) 
               {
                    $("#btnEnter").attr("href","#legalNotice").button();
                } 
                else if (localStorage.getItem("agreedToLegal") === "true") 
                {
                       $("#btnEnter").attr("href","#pageMenu").button();
                }
            }
			
            else {
                  alert("Incorrect username/password, please try again.");
                  $.mobile.changePage("#pageHome");
                   window.location.reload();
              }

        }

        /** Validate the User Form **/
        function validateUserForm() { 

              var currentDate = new Date();
              var dd = currentDate.getDate();
              var mm = currentDate.getMonth() + 1;
              var yyyy = currentDate.getFullYear();
              if (dd < 10) {
                dd = '0' + dd;
              }
              if (mm < 10) {
                mm = '0' + mm;
              }
              currentDate = yyyy + '-' + mm + '-' + dd;
              //Check for empty fields in the form
                if (
                  ($("#signupFirstName").val() != "") && 
                  ($("#newPassword").val()!= "") && 
                  ($("#confirmPassword").val()!= "") &&
                  ($("#dateOfBirth").val() <= currentDate) &&
                  ($("#signupLastName").val() != "") &&
                  ($("#signupEmailId").val() != "") &&
                  ($("#dateOfBirth").val() != "") &&
                  ($("#signgenderType option:selected").val() != "Choose Gender")) {
                  return true;
                } else {
                  return false;
                }
          }
        

        function saveUserForm() {


            var user = {
               "FirstName": $("#updateFirstName").val(),
              "LastName": $("#updateLastName").val(),
              "DateOfBirth": $("#updatedateOfBirth").val(),
              "EmailId": $("#updateEmailId").val(),
              "NewPassword": $("#editPassword").val(),
              "Gender": $("#updategenderType option:selected").val()
            };
            try {
                localStorage.setItem("user", JSON.stringify(
                  user));
                alert("Saving Information");
                $.mobile.changePage("#pageMenu");
                window.location.reload();
              } catch (e) {
                /* Google browsers use different error 
                 * constant
                 */
                if (window.navigator.vendor ===
                  "Google Inc.") {
                  if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert("Error: Local Storage limit exceeds.");
                  }
                } else if (e == QUOTA_EXCEEDED_ERR) {
                  alert("Error: Saving to local storage.");
                }

                console.log(e);
              }
          }

        function loadUserInformation(){
           var user = JSON.parse(localStorage.getItem("user"));
           if (user != null) {
                /*document.getElementById("signupFirstName").value=user.FirstName*/
                $("#updateFirstName").val(user.FirstName);
                $("#updateLastName").val(user.LastName);
                $("#updatedateOfBirth").val(user.DateOfBirth);
                $("#updateEmailId").val(user.EmailId);
                $("#editPassword").val(user.NewPassword);
                $('#updategenderType option[value=' + user.Gender + ']').attr('selected', 'selected');
                $("#updategenderType option:selected").val(user.Gender);
                $('#updategenderType').selectmenu('refresh',true);
            }
       }


        function saveDisclaimer(){
          localStorage.setItem("agreedToLegal","true");
          $.mobile.changePage("#pageMenu");
          window.location.reload();
        }

        
        function loadPageRecords(){
         
         try {
          var user = JSON.parse(localStorage.getItem(
                      "user"));
          } catch (e) {
              if (window.navigator.vendor ===
                      "Google Inc.") {
                  if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                      alert(
                              "Error: Local Storage limit exceeds."
                              );
                  }
              } else if (e == QUOTA_EXCEEDED_ERR) {
                  alert("Error: Saving to local storage.");
              }

              console.log(e);
          }
          if (user != null) {
              $("#divUserSection").empty();


              $("#divUserSection").append("User's Name:" +
                      user.FirstName + " " + user.LastName +
                      "<br>Date Of Birth: " + user.DateOfBirth +
                      "<br>Email Id: " + user.EmailId +
                      "<br>New Password : " + user.NewPassword +
                      "<br>Gender : " + user.Gender);
              $("#divUserSection").append(
                      "<br><a href='#pageUserInfo' data-mini='true' data-role='button' data-icon='edit' data-iconpos='left' data-inline='true' >Edit Profile</a>"
                      );
              $('#divUserSection [data-role="button"]').button(); // 'Refresh' the button
          }
        }

       

        function checkAddOrEditRecord(){
          var formOperation = $("#btnSubmitRecord").val();
          if (formOperation == "Add Learning") {
             addRecord();
             $.mobile.changePage("#pageRecords");
          } else if (formOperation == "Update Learning") {
                editRecord($("#btnSubmitRecord").attr("indexToEdit"));
                $.mobile.changePage("#pageRecords");
                $("#btnSubmitRecord").removeAttr("indexToEdit");
          }
          /*Must return false, or else submitting form
           * results in reloading the page
           */
          return false;
      }

      function addRecord(){
            var record = {
                  "Date": $('#datExpenseDate').val(),
                  "LearningType": $('#txtType').val(),
                  "HoursSpend": $('#txtAmount').val()
             };
            var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
            if (tbRecords == null) {
                tbRecords = [];
            }
            tbRecords.push(record);
            localStorage.setItem("tbRecords", JSON.stringify(tbRecords));
            clearNewRecordForm();
          
      }

      function loadHourSpend()
      {

        try {
        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
      } catch (e) {
        if (window.navigator.vendor ===
                "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert(
                        "Error: Local Storage limit exceeds."
                        );
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }

        console.log(e);
    }

    //Load previous records, if they exist
    if (tbRecords != null) {

        //Initializing the table
        $("#tblRecords").html(
                "<thead>" +
                "   <tr>" +
                "     <th>Date </th>" + " <td>" + " &nbsp &nbsp" +"</td>" +
                "     <th>Learning Type </th>" + " <td>" + " &nbsp&nbsp" +"</td>" +
                "     <th> Hours Spend </th>" +  " <td>" + " &nbsp&nbsp" +"</td>" +
                "     <th>Edit / Delete</th>" +
                "   </tr>" +
                "</thead>" +
                "<tbody>" +
                "</tbody>"
                );

        //Loop to insert the each record in the table
        for (var i = 0; i < tbRecords.length; i++) {
            var rec = tbRecords[i];
            $("#tblRecords tbody").append("<tr>" +
                    "  <td>" + rec.Date + "</td>" + " <td>" + "&nbsp&nbsp" +"</td>" +
                    "  <td>" + rec.LearningType + "</td>" +" <td>" + "&nbsp&nbsp" +"</td>" +
                    "  <td>" + rec.HoursSpend + "</td>" + " <td>" + "&nbsp&nbsp" +"</td>" +
                    "  <td><a data-inline='true' data-mini='true' data-role='button' href='#pageNewRecordForm' onclick='callEdit(" +
                    i +
                    ")' data-icon='edit' data-iconpos='notext'></a>" +
                    "  <a data-inline='true'  id = 'btndeleteRecord' data-mini='true' data-role='button' href='#' onclick='callDelete(" +
                    i +
                    ")' data-icon='delete' data-iconpos='notext'></a></td>" +
                    "</tr>");
        }

        $('#tblRecords [data-role="button"]').button();
    } else {
        tbRecords = [];
        $("#tblRecords").html("");
    }
    return true;

      }

var i = 0;
    function addNewRecord() {
      if (i == 0){
         $("#btnSubmitRecord").val("Add Learning");
         i+=1;
       }
      else{
        $("#btnSubmitRecord").val("Add Learning").button("refresh");
      }
   }


    function showRecordForm(index) {
        try {
            var tbRecords = JSON.parse(localStorage.getItem(
                    "tbRecords"));
            var rec = tbRecords[index];
            $('#datExpenseDate').val(rec.Date),
                    $('#txtType').val(rec.LearningType),
                    $('#txtAmount').val(rec.HoursSpend)
        } catch (e) {
            if (window.navigator.vendor ===
                    "Google Inc.") {
                if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                    alert(
                            "Error: Local Storage limit exceeds."
                            );
                }
            } else if (e == QUOTA_EXCEEDED_ERR) {
                alert("Error: Saving to local storage.");
            }

            console.log(e);
        }
}

function clearRecordForm() {
    $('#datExpenseDate').val(""),
            $('#txtType').val(""),
            $('#txtAmount').val("")
    return true;
}


function editRecord(index) {
    try {
        var tbRecords = JSON.parse(localStorage.getItem(
                "tbRecords"));
        tbRecords[index] = {
            "Date": $('#datExpenseDate').val(),
            "LearningType": $('#txtType').val(),
            "HoursSpend": $('#txtAmount').val()
        }; 
        localStorage.setItem("tbRecords", JSON.stringify(
                tbRecords));
        alert("Saving Information");
        clearRecordForm();
        listRecords();
    } catch (e) {
        if (window.navigator.vendor ===
                "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert(
                        "Error: Local Storage limit exceeds."
                        );
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }

        console.log(e);
    }
    return true;
}

      function callEdit(index) {
          $("#btnSubmitRecord").attr("indexToEdit", index);

          if (i == 0){
            $("#btnSubmitRecord").val("Update Learning");
            i+=1;
          }
          else{
            $("#btnSubmitRecord").val("Update Learning").button("refresh");
          }
          showRecordForm($("#btnSubmitRecord").attr("indexToEdit"));
      }



      function callDelete(index) {
          deleteRecord(index);
          loadHourSpend();
      }


      function deleteRecord(index) {
          try {
              var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));

              tbRecords.splice(index, 1);

              if (tbRecords.length == 0) {
                  localStorage.removeItem("tbRecords");
              } else {
                  localStorage.setItem("tbRecords", JSON.stringify(
                          tbRecords));
              }
          } catch (e) {
              if (window.navigator.vendor ===
                      "Google Inc.") {
                  if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                      alert(
                              "Error: Local Storage limit exceeds."
                              );
                  }
              } else if (e == QUOTA_EXCEEDED_ERR) {
                  alert("Error: Saving to local storage.");
              }

              console.log(e);
          }
}

     function clearNewRecordForm() {
        $('#datExpenseDate').val(""),
                $('#txtType').val(""),
                $('#txtAmount').val("")
        return true;
      }



      function drawGraph(){
         if (localStorage.getItem("tbRecords") === null) {
        alert("No records exist.");
        /*$.mobile.changePage("#pageMenu");*/

       /* $(location).attr("href", "#pageMenu");*/
       window.location.href = "#pageMenu";
        }else {
           var c = document.getElementById("GraphCanvas");
           var ctx = c.getContext("2d");

           ctx.fillStyle = "#FFFFFF";
           ctx.fillRect(0, 0, 500, 500);

            var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
            ExpenseArr = []
            Datearr = []

             tbRecords.sort(function (a, b) {
                  return  +new Date(a.Date) - +new Date(b.Date);
              });
              console.log(tbRecords);

          for (var i = 0; i < tbRecords.length; i++) {
              var date = new Date(tbRecords[i].Date);
              var m = date.getMonth() + 1;
              var d = date.getDate() + 1;
              Datearr[i] = (m + "/" + d);
              ExpenseArr[i] = parseFloat(tbRecords[i].HoursSpend);
          }

          drawlines(ExpenseArr, 0, 0, Datearr);
          labelaxes();
          window.location.href = "#pageGraph";
          }
}



      function drawlines(ExpenseArr, expenseUpper, expenseLower,
        Datearr){
            var expenseLine = new RGraph.Line("GraphCanvas",ExpenseArr, 0, 0)
            .Set("labels", Datearr)
            .Set("colors", ["blue"])
            .Set("shadow", true)
            .Set("shadow.offsetx", 1)
            .Set("shadow.offsety", 1)
            .Set("linewidth", 1)
            .Set("numxticks", 6)
            .Set("scale.decimals", 2)
            .Set("xaxispos", "bottom")
            .Set("gutter.left", 40)
            .Set("tickmarks", "filledcircle")
            .Set("ticksize", 5)
            .Set("chart.labels.ingraph", [, , ["Hours",
                    "blue", "yellow", 1, 80
                ], , ])
            .Set("chart.title", "HoursSpend")
            .Draw();
      }

      function labelaxes() {
        var c = document.getElementById("GraphCanvas");
        var ctx = c.getContext("2d");
        ctx.font = "11px Georgia";
        ctx.fillStyle = "green";
        ctx.fillText("Date(MM/DD)", 400, 470);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText("Hours Learned", -250, 10);
}


      function advicePage() {
        if (localStorage.getItem("tbRecords") === null) {
        alert("No records exist.");

       window.location.href = "#pageMenu";
      }else
      {
        var canvas = document.getElementById("AdviceCanvas");//get the element
        var ctx = canvas.getContext("2d");//get the context

        var tbRecords = JSON.parse(localStorage.getItem("tbRecords"));
        var Learning = 0;
        for(var i=0; i<tbRecords.length;i++){
          Learning = Learning + parseInt(tbRecords[i].HoursSpend)
          }


        ctx.font = "12px Arial";
        ctx.fillStyle = "blue";
		ctx.backgroundColor="green"
        ctx.fillText("Your current Learning hours is " + Learning +  ".", 25, 320);

          ctx.fillText(
            "Your target Learning range is: 200-280 Hours per week",  25, 350);
          levelwrite(ctx, Learning);
          levelMeter(ctx, Learning);
          window.location.href = "#pageAdvice";
      }
    }


      //For deciding what to write for given values
    //For deciding what to write for given values
      function levelwrite(ctx, Learning) {
        if ((Learning >= 0) && (Learning <= 10)) {
          writeAdvice(ctx, "red");
        } else if ((Learning > 10) && (Learning <= 30)) {
          writeAdvice(ctx, "yellow");
        } else {
          writeAdvice(ctx, "green");
        }
      }


      function writeAdvice(ctx, level) {
          var adviceLine1 = "";
          var adviceLine2 = "";

          if (level == "red") {
            adviceLine1 = "Get Motivated and push yourself.";
          } else if (level == "yellow") {
            adviceLine1 = "Push yourself harder, Sky is the only limit!!";
          } else if (level = "green") {
            adviceLine1 =
              "Keep doing the good work, cause Sky is not the limit!!.";
          }
          ctx.fillText("Your Learning is " + level +
            ".", 25, 380);
          ctx.fillText(adviceLine1, 25, 410);
          ctx.fillText(adviceLine2, 25, 440);
        }


      function levelMeter(ctx, Learning) {

        

        if (Learning <= 100) {
          var cg = new RGraph.CornerGauge(
              "AdviceCanvas", 0, 100, Learning)
            cg.Set("chart.colors.ranges", [
              [1, 10, "red"],
              [11, 30, "yellow"],
              [30, 100, "#0f0"]
            ]);
        } else {
          var cg = new RGraph.CornerGauge(
              "AdviceCanvas", 0, Learning, Learning)
            cg.Set("chart.colors.ranges", [
              [1, 10, "red"],
              [11, 30, "yellow"],
              [0.01, 0.1, "#0f0"],
              [100.01, Learning, "red"]
            ]);
        }
        drawMeter(cg);
      }

      // Meter properties
      function drawMeter(g) {
           g.Set("chart.value.text.units.post", " Hours")
          g.Set("chart.value.text.boxed", false)
          g.Set("chart.value.text.size", 14)
          g.Set("chart.value.text.font", "Verdana")
          g.Set("chart.value.text.bold", true)
          g.Set("chart.value.text.decimals", 2)
          g.Set("chart.shadow.offsetx", 5)
          g.Set("chart.shadow.offsety", 5)
          g.Set("chart.scale.decimals", 2)
          g.Set("chart.title", "Learning Limit")
          g.Set("chart.radius", 250)
          g.Set("chart.centerx", 50)
          g.Set("chart.centery", 250)
          g.Draw();
      }

    function resizeGraph() {
        if ($(window).width() < 700) {
            $("#GraphCanvas").css({
                "width": $(window).width() - 50
            });
            $("#AdviceCanvas").css({
                "width": $(window).width() - 50
            });
        }
    }


    $(window).resize(function () {
        resizeGraph();
    });
        