const nav_links = document.querySelectorAll("header nav ul li:nth-child(odd)");
const get_form_btn = document.querySelectorAll("header div span button");
const form_section = document.querySelector(".form-section");
const user_form = document.querySelectorAll(".form-part");
const span_btn = document.querySelectorAll(".form-part span");
const close_btn = document.querySelectorAll(".fa-xmark");
const input_fields = document.getElementsByTagName("input");
const alert_box = document.querySelectorAll(".alert p");
const select = document.getElementById("state");
const sliders = document.querySelectorAll(".slider");
const dots = document.querySelectorAll(".welcome-part ul li");
const email_validate = document.querySelector(".validate");
const reg_btn = document.querySelector(".reg-btn");

reg_btn.addEventListener("click", () => {
  let reg_form = document.forms[1];
  let email = reg_form.elements[1].value;
  let a = "hi@gmail.com";
  console.log(a.match("@gmail.com"));
});

sliders[0].setAttribute("id", "current");
dots[0].style.background = "white";
function change_bg() {
  setTimeout(() => {
    sliders[0].removeAttribute("id");
    sliders[0].setAttribute("id", "previous");
    sliders[1].setAttribute("id", "current");
    dots[1].style.background = "white";
    dots[0].style.background = "#2b2b2b";
    dots[2].style.background = "#2b2b2b";
    setTimeout(() => {
      sliders[0].removeAttribute("id");
      sliders[1].setAttribute("id", "previous");
      sliders[2].setAttribute("id", "current");
      dots[2].style.background = "white";
      dots[0].style.background = "#2b2b2b";
      dots[1].style.background = "#2b2b2b";
      setTimeout(() => {
        sliders[1].removeAttribute("id");
        sliders[2].setAttribute("id", "previous");
        sliders[0].setAttribute("id", "current");
        dots[1].style.background = "#2b2b2b";
        dots[2].style.background = "#2b2b2b";
        dots[0].style.background = "white";
        setTimeout(() => {
          sliders[2].removeAttribute("id");
          change_bg();
        }, 4000);
      }, 4000);
    }, 4000);
  }, 4000);
}
change_bg();

//login form
get_form_btn[0].addEventListener("click", (e) => {
  let login_form = user_form[1].style;
  if (login_form.display == "" || login_form.display === "none") {
    login_form.display = "block";
    user_form[0].style.display = "none";
    login_form.zIndex = "20";
  } else {
    login_form.display = "none";
    user_form[1].style.display = "none";
    login_form.zIndex = "0";
  }
});

//signup form
get_form_btn[1].addEventListener("click", (e) => {
  let reg_form = user_form[0].style;
  if (reg_form.display == "" || reg_form.display === "none") {
    reg_form.display = "block";
    user_form[1].style.display = "none";
    reg_form.zIndex = "20";
  } else {
    user_form[0].style.display = "none";
    reg_form.display = "none";
    reg_form.zIndex = "0";
  }
});

//this will close forms
function closeForm() {
  user_form[0].style.display = "none";
  user_form[1].style.display = "none";
}
close_btn[0].addEventListener("click", closeForm);
close_btn[1].addEventListener("click", closeForm);

function openForm(a) {
  if (a === 0) {
    user_form[0].style.display = "none";
    user_form[1].style.display = "block";
  } else {
    user_form[1].style.display = "none";
    user_form[0].style.display = "block";
  }
}
//this will open login form if we clicked on already a user
span_btn[4].addEventListener("click", () => openForm(0));
//this will open signup form if we clicked on create account
span_btn[5].addEventListener("click", () => openForm(1));
//this will reset input fields
for (const iterator of input_fields) {
  if (
    iterator.value !== "Search" &&
    iterator.value !== "Login" &&
    iterator.value !== "Sign Up"
  )
    iterator.value = "";
}
//if user clicked on nav link without login user will get this alert
nav_links[0].addEventListener("click", show_loginAlert);
nav_links[1].addEventListener("click", show_loginAlert);
nav_links[2].addEventListener("click", show_loginAlert);

function show_loginAlert() {
  alert_box[0].style.display = "block";
  user_form[1].style.display = "block";
  setTimeout(() => (alert_box[0].style.display = "none"), 8000);
}

fetch("./json/details.json")
  .then((response) => response.json())
  .then((json) => addStates(json.states));

//this will add states in datalist
function addStates(states) {
  for (const index in states) {
    let state = states[index].name;
    const option = document.createElement("option");
    select.insertAdjacentElement("beforeend", option);
    option.textContent = state;
    option.setAttribute("value", state);
  }
}
document.body.addEventListener("click", (e) => {
  if (
    e.target.classList[0] == "cart_btn" ||
    e.target.classList[0] == "order_btn"
  )
    show_loginAlert();
});
