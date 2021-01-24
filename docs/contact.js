// variables
const btnSend = document.querySelector(".btn-send");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
const spinner = document.querySelector("#spinner");
const form = document.querySelector("#form");
const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
document.addEventListener("DOMContentLoaded", starApp);

function starApp() {
  // disable thee button
  preventSent();
  // event fields
  email.addEventListener("blur", validateForm);
  subject.addEventListener("blur", validateForm);
  message.addEventListener("blur", validateForm);
  // enviar el formulario

  form.addEventListener("submit", sendForm);
}

function preventSent() {
  btnSend.style.opacity = "0.4";
  btnSend.disabled = true;
  document.querySelector(".btn-send").style.cursor = "not-allowed";
}
function validateForm(e) {
  e.target.classList.remove("border-gray");
  if (e.target.value == "") {
    e.target.classList.add("border-red");
    e.target.classList.remove("border-green");
    showError("All the fields are required");
  } else {
    e.target.classList.remove("border-red");
    e.target.classList.add("border-green");
    if (document.querySelectorAll(".border-red").length === 0) {
      if (document.querySelectorAll(".error").length > 0) {
        form.removeChild(document.querySelector(".error"));
      }
    }
  }
  if (e.target.type === "email") {
    if (reg.test(e.target.value)) {
      console.log("calido");
    } else {
      showError("Email Invalido!!!");

      e.target.classList.add("border-red");
      e.target.classList.remove("border-green");
    }
  }
  if (reg.test(email.value) && subject.value !== "" && message.value !== "") {
    btnSend.style.opacity = "1";
    btnSend.disabled = false;
    document.querySelector(".btn-send").style.cursor = "pointer";
  }
}
function showError(content) {
  const div = document.createElement("div");
  div.classList.add("error");
  div.textContent = content;
  let errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    form.appendChild(div);
  }
}

function sendForm(e) {
  e.preventDefault();
  spinner.style.display = "flex";
  setTimeout(() => {
    spinner.style.display = "none";
    // mostrar parrafo de exito

    const p = document.createElement("p");
    p.textContent = "El mensaje se envio correctament !!!";
    p.classList.add("exito");
    form.insertBefore(p, document.querySelector(".action"));

    setTimeout(() => {
      p.remove();
      form.reset();
      preventSent();
      email.classList.add("border-gray");
      subject.classList.add("border-gray");
      message.classList.add("border-gray");
    }, 5000);
  }, 3000);
}
