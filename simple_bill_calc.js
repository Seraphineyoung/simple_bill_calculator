var previous_gas_meter_reading;
var previous_electric_meter_reading;

async function get_prev_meter_reading() {
  let data;
  try {
    //go get the data
    let response = await fetch(
      "https://shine-energy.netlify.com/.netlify/functions/meter-readings"
    );
    //wait to reslove the promise and give me data
    data = await response.json();
    previous_gas_meter_reading = data.gas.reading;
    previous_electric_meter_reading = data.electricity.reading;
  } catch (e) {
    data = e;
  }
  console.log(data);
  return data;
}
get_prev_meter_reading();

var gas_meter_input = document.getElementById("gas_meter_reading");
var electric_meter_input = document.getElementById("electric_meter_reading");
var gas_bill_amount = document.getElementById("gas_bill_amount");
var electric_bill_amount = document.getElementById("electric_bill_amount");
var gas_units_used = document.getElementById("gas_units_used");
var electric_units_used = document.getElementById("electric_units_used");
var gas_heading = document.getElementById("gas_heading");
var electric_heading = document.getElementById("electric_heading");
var hide_gas_btn = document.getElementById("btn_gas");
var hide_electric_btn = document.getElementById("btn_electric");

var user_gas_reading;
var user_gas_electric;

localStorage.setItem("five_sec", false);
var five_sec_value = localStorage.getItem("five_sec");

function five_secs() {
  setTimeout(function() {
    localStorage.setItem("five_sec", true);
  }, 5000);
  setTimeout(function() {
    var five_sec_value = localStorage.getItem("five_sec");
    console.log(five_sec_value);
    return five_sec_value;
  }, 6000);
}

five_secs();

if (localStorage.getItem("five_sec") === true) {
  document.getElementById("btn_gas").disabled = true;
} else {
  document.getElementById("btn_gas").disabled = false;
}

//////////////////////////This is Mine/////////
// let cookieMonster = []
// Document.Cookie = ['not allowed', expires: epoch + 5 ]
// let cookieTime = []
// if (document.cookie === null){HTMLFormControlsCollection.log('log cookie')

//   get_gas_reading()
// }
// else {
// cookieMonster.push(`come back in ${cookieTime}`)
// }
//////////////

function check_length_of_gasinput() {
  user_gas_reading = gas_meter_input.value;
  var input_val = user_gas_reading;
  var input_length = input_val.toString().length;
  console.log(input_length);
  if (input_length > 10) {
    gas_heading.innerHTML = "You can only type 10 digits";
    gas_heading.classList.add("red");
  } else {
    get_gas_reading(user_gas_reading);
  }
}

function get_gas_reading(user_gas_reading) {
  var gas_unit_used = user_gas_reading - previous_gas_meter_reading;
  if (gas_unit_used > 2000) {
    gas_heading.style.display = "none";
    gas_meter_input.style.display = "none";
    hide_gas_btn.style.display = "none";
    gas_units_used.style.display = "block";
    gas_units_used.innerHTML =
      "Your current gas reading is more than 2000 units , please check and resubmit reading";
    gas_units_used.classList.add("red");
  } else {
    gas_heading.style.display = "none";
    gas_meter_input.style.display = "none";
    hide_gas_btn.style.display = "none";
    gas_units_used.style.display = "block";
    gas_units_used.innerHTML = "Gas units used is: " + gas_unit_used;
    check_user_gas_meter_readings(user_gas_reading, gas_unit_used);
  }
}

function check_user_gas_meter_readings(user_gas_reading, gas_unit_used) {
  if (user_gas_reading < previous_gas_meter_reading) {
    console.log(user_gas_reading);
    console.log(previous_gas_meter_reading);
    gas_units_used.innerHTML =
      "Your current gas reading is less than the previous reading. Please re-enter reading correctly";
    gas_units_used.classList.add("red");
  } else {
    calculate_gas_bill(gas_unit_used);
  }
}

function calculate_gas_bill(gas_unit_used) {
  console.log("User entered this value: ", user_gas_reading);
  if (gas_unit_used > 100) {
    var gas_subtract_100 = gas_unit_used - 100;
    var gas_bill_pence = 100 * 10 + gas_subtract_100 * 20;
    var gas_bill = gas_bill_pence / 100;
    gas_bill_amount.style.display = "block";
    ////////////////////////

    ///////////////////////
    return (gas_bill_amount.innerHTML = "Your Gas bill is : £ " + gas_bill);
  } else if (gas_unit_used >= 0 && gas_unit_used <= 100) {
    var gas_bill_pence = gas_unit_used * 10;
    var gas_bill = gas_bill_pence / 100;
    gas_bill_amount.style.display = "block";
    return (gas_bill_amount.innerHTML = "Your Gas bill is : £ " + gas_bill);
  } else {
    return (gas_units_used.innerHTML =
      "Your Gas meter reading is less than your previous reading");
  }
}

function check_length_of_electricinput() {
  user_electric_reading = electric_meter_input.value;
  var input_val = user_electric_reading;
  var input_length = input_val.toString().length;
  if (input_length > 10) {
    electric_heading.innerHTML = "You can only type 10 digits";
    electric_heading.classList.add("red");
  } else {
    get_electric_reading(user_electric_reading);
  }
}

function get_electric_reading(user_electric_reading) {
  var electric_unit_used =
    user_electric_reading - previous_electric_meter_reading;

  if (electric_unit_used > 2000) {
    electric_heading.style.display = "none";
    electric_meter_input.style.display = "none";
    hide_electric_btn.style.display = "none";
    electric_units_used.style.display = "block";
    electric_units_used.innerHTML =
      "Your current electric reading is more than 2000 units , please check and resubmit reading";
    electric_units_used.classList.add("red");
  } else {
    electric_heading.style.display = "none";
    electric_meter_input.style.display = "none";
    hide_electric_btn.style.display = "none";
    electric_units_used.style.display = "block";
    electric_units_used.innerHTML = "Gas units used is: " + electric_unit_used;
    console.log("User entered this value: ", user_electric_reading);
    check_user_electric_meter_readings(
      user_electric_reading,
      electric_unit_used
    );
  }
}

function check_user_electric_meter_readings(
  user_electric_reading,
  electric_unit_used
) {
  if (user_electric_reading < previous_electric_meter_reading) {
    console.log(user_gas_reading);
    console.log(previous_gas_meter_reading);
    electric_units_used.innerHTML =
      "Your current gas reading is less than previous reading. Please re-enter reading correctly";
    electric_units_used.classList.add("red");
  } else {
    calculate_electric_bill(electric_unit_used);
  }
}

function calculate_electric_bill(electric_unit_used) {
  if (electric_unit_used > 100) {
    var electric_subtract_100 = electric_unit_used - 100;
    var electric_bill_pence = 100 * 10 + electric_subtract_100 * 20;
    var electric_bill = electric_bill_pence / 100;
    electric_bill_amount.style.display = "block";
    electric_bill_amount.innerHTML = "Your Gas bill is : £ " + electric_bill;
  } else if (electric_unit_used >= 0 && electric_unit_used <= 100) {
    var electric_bill_pence = electric_unit_used * 10;
    var electric_bill = electric_bill_pence / 100;
    electric_bill_amount.style.display = "block";
    electric_bill_amount.innerHTML =
      "Your Electric bill is : £ " + electric_bill;
  } else {
    electric_units_used.innerHTML =
      "Your Electric meter reading is less than your previous reading";
  }
}

// function refreshPage() {
//   window.location.reload();
// }
// refreshPage()
