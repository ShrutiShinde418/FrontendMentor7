const email = document.getElementById("email");
const form = document.getElementById("form");
const errorElement = form.querySelector(".error");

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValue = email.value.trim();
  if (emailValue === "") {
    errorElement.innerText =
      "Whoops! It looks like you forgot to add your email";
    if (window.matchMedia("(max-width: 768px)").matches) {
      errorElement.style.marginBottom = "1.25em";
    }
    email.classList.add("error-control");
  } else if (!isValidEmail(emailValue)) {
    errorElement.innerText = "Please provide a valid email address";
    if (window.matchMedia("(max-width: 768px)").matches) {
      errorElement.style.marginBottom = "1.25em";
    }
    email.classList.add("error-control");
  } else {
    errorElement.innerText = "";
    email.classList.remove("error-control");
    if (window.matchMedia("(max-width: 768px)").matches) {
      errorElement.style.marginBottom = "0";
    }
  }
});
