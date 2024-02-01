const nav_links = document.querySelectorAll("header nav ul li:nth-child(odd)");
const span_btn = document.querySelectorAll(".form-part span");
const input_fields = document.getElementsByTagName("input");
const alert_box = document.querySelectorAll(".alert p");
const nav_options = document.querySelectorAll(".box-2");
const cart_box = document.querySelector(".cart-box");
const cart_btn = document.querySelectorAll(".cart_btn");
const order_btn = document.querySelectorAll(".order_btn");
let product_data = document.querySelectorAll(" .cards");
const sliders = document.querySelectorAll(".slider");
const dots = document.querySelectorAll(".welcome-part ul li");
const close_profile_btn = document.querySelectorAll(
  ".userprofile main div button"
)[1];
const confirm_sec = document.querySelector(".confirm-alert");
const close_confirm_sec = document.querySelector(".fa-x");

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

nav_links[1].addEventListener("click", () => {
  let box = nav_options[0].style;
  if (box.display === "" || box.display === "none") {
    nav_links[1].style.background = "white";
    nav_links[1].style.color = "black";
    nav_links[2].style.color = "white";
    nav_links[2].style.background = "transparent";
    box.display = "flex";
    nav_options[1].style.display = "none";
  } else {
    box.display = "none";
    nav_links[1].style.background = "transparent";
    nav_links[1].style.color = "white";
  }
});
nav_links[2].addEventListener("click", () => {
  let box = nav_options[1].style;
  if (box.display === "" || box.display === "none") {
    nav_links[2].style.background = "white";
    nav_links[1].style.background = "transparent";
    nav_links[1].style.color = "white";
    nav_links[2].style.color = "black";
    box.display = "flex";
    nav_options[0].style.display = "none";
  } else {
    box.display = "none";
    nav_links[2].style.background = "transparent";
    nav_links[2].style.color = "white";
  }
});

close_profile_btn.addEventListener("click", () => {
  let box = nav_options[1].style;
  nav_links[2].style.background = "transparent";
  nav_links[2].style.color = "white";
  box.display = "none";
});
close_confirm_sec.addEventListener("click", () => {
  confirm_sec.style.display = "none";
});

alert_box[0].style.display = "block";
setTimeout(() => (alert_box[0].style.display = "none"), 3000);

function confirm_order(product) {
  const form = document.forms[1];
  document.querySelector("#order-id").textContent =
    "ODR" + Math.floor(Math.random() * 100000000);
  form.elements.product_name.value = product["product_name"];
  form.elements.price.value = product["product_price"]
    .split(",")
    .toString()
    .split("₹")[1]
    .replace(",", "");
  form.elements.loc.value = document.querySelector("#address").textContent;
  // console.log(product);
}

function addProductToCart(position) {
  let product = getProductDetails(product_data[position].children);
  let main = document.createElement("main");
  cart_box.insertAdjacentElement("beforeend", main);
  let img = document.createElement("img");
  main.insertAdjacentElement("beforeend", img);
  img.setAttribute("class", "img");
  img.setAttribute("src", product["product_img"]);
  let div = document.createElement("div");
  main.insertAdjacentElement("beforeend", div);
  let h3 = document.createElement("h3");
  div.insertAdjacentElement("beforeend", h3);
  h3.textContent = product["product_name"];
  let p1 = document.createElement("p");
  div.insertAdjacentElement("beforeend", p1);
  let strong1 = document.createElement("strong");
  p1.insertAdjacentElement("beforeend", strong1);
  strong1.textContent = product["product_price"];
  let div2 = document.createElement("div");
  div.insertAdjacentElement("beforeend", div2);
  let a1 = document.createElement("a");
  div2.insertAdjacentElement("beforeend", a1);
  a1.textContent = "Remove";
  let a2 = document.createElement("a");
  div2.insertAdjacentElement("beforeend", a2);
  a2.textContent = "Confirm";

  a1.addEventListener("click", () => {
    main.remove();
    alert_box[1].style.display = "block";
    setTimeout(() => (alert_box[1].style.display = "none"), 3000);
  });
  a2.addEventListener("click", () => {
    confirm_order(product);
    confirm_sec.style.display = "flex";
  });
}

function getProductDetails(product_data) {
  let price = product_data[1].children[2].textContent.split("/");

  return {
    product_name: product_data[1].children[0].textContent,
    product_img: product_data[0].getAttribute("src"),
    product_price: price[0],
  };
}

document.body.addEventListener("click", (e) => {
  if (
    e.target.classList[0] == "cart_btn" ||
    e.target.classList[0] == "order_btn"
  ) {
    const card_data = e.target.parentElement.parentElement.parentElement;
    for (let index in product_data)
      if (product_data[index] == card_data) {
        addProductToCart(index);
        confirm_order(getProductDetails(product_data[index].children));
        alert_box[2].style.display = "block";
        setTimeout(() => (alert_box[2].style.display = "none"), 3000);
      }
  }
  if (e.target.classList[0] == "order_btn") {
    confirm_sec.style.display = "flex";
  }
});
