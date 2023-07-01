var employeeNo, adharNo, department, mobileNo, addressV;

function readForm() {
  employeeNo = document.getElementById("emp-num").value;
  adharNo = document.getElementById("adhar-num").value;
  mobileNo = document.getElementById("mobile-num").value;
  department = document.getElementById("department").options[document.getElementById("department").selectedIndex].value;
  addressV = document.getElementById("address").value;
  console.log(employeeNo, adharNo, mobileNo, department, addressV);
   var num= /^[0-9]+$/;
   
  if(adharNo.length!=12){
    alert("Please enter correct adhar number.");
    return false;
  }
  if(mobileNo.length!=10 ){
    alert("Please enter correct mobile number.");
    return false;
  }
  if (!employeeNo) {
    alert("Please enter employee number.");
    return false;
  }

  if (!adharNo) {
    alert("Please enter Adhar number.");
    return false;
  }

  if (!mobileNo ) {
    alert("Please enter mobile number.");
    return false;
  }
  

  if (!department) {
    alert("Please select department.");
    return false;
  }

  if (!addressV) {
    alert("Please enter address.");
    return false;
  }

  return true;
}

document.getElementById("insert").onclick = function () {
  if (!readForm()) {
    return;
  }
  firebase
    .database()
    .ref("employee/" + employeeNo)
    .set({
      employeeNo: employeeNo,
      adharNo: adharNo,
      mobileNo: mobileNo,
      department: department,
      address: addressV,
    });
  alert("Data Inserted");
  document.getElementById("emp-num").value = "";
  document.getElementById("adhar-num").value = "";
  document.getElementById("mobile-num").value = "";
  document.getElementById("address").value = "";
};


document.getElementById("read").onclick = function () {
  employeeNo = document.getElementById("emp-num").value;

  if (!employeeNo) {
    alert("Please enter Employee Number to read data");
    return;
  }

  firebase
    .database()
    .ref("employee/" + employeeNo)
    .once("value", function (snap) {
      if (snap.exists()) {
        document.getElementById("adhar-num").value = snap.val().adharNo;
        document.getElementById("mobile-num").value = snap.val().mobileNo;
        document.getElementById("department").value = snap.val().department;
        document.getElementById("address").value = snap.val().address;
      } else {
        alert("Employee not found in the database");
      }
    });
};



document.getElementById("update").onclick = function () {
  if (!readForm()) {
    return;
  }
  firebase
    .database()
    .ref("employee/" + employeeNo)
    .update({
      adharNo: adharNo,
      mobileNo: mobileNo,
      department: department,
      address: addressV,
    });
  alert("Data Updated");
  document.getElementById("emp-num").value = "";
  document.getElementById("adhar-num").value = "";
  document.getElementById("mobile-num").value = "";
  document.getElementById("address").value = "";
};

document.getElementById("delete").onclick = function () {
  readForm();

  firebase
    .database()
    .ref("employee/" + employeeNo)
    .remove();
  alert("Data Deleted");
  document.getElementById("emp-num").value = "";
  document.getElementById("adhar-num").value = "";
  document.getElementById("mobile-num").value = "";
  document.getElementById("address").value = "";
};
