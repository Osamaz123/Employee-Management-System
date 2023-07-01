var employeeNo, adharNo, department, mobileNo, addressV;

function readForm() {
  employeeNo = document.getElementById("emp-num").value;
  adharNo = document.getElementById("adhar-num").value;
  mobileNo = document.getElementById("mobile-num").value;
  department = document.getElementById("department").options[document.getElementById("department").selectedIndex].value;
  addressV = document.getElementById("address").value;
  console.log(employeeNo, adharNo, mobileNo, department, addressV);
  if (!employeeNo) {
    alert("Please enter employee number.");
    return false;
  }

  if (!adharNo) {
    alert("Please enter Adhar number.");
    return false;
  }

  if (!mobileNo) {
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





