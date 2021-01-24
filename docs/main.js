// document.addEventListener('DOMContentLoaded',()=>{console.log(11)}); // ejecuta los codigo desde de cargar el html
document.querySelector(".table-card").style.display = "none";
const courses = document.querySelector("#courses");
const deleteCard = document.querySelector(".delete-card");
const emptyCard = document.querySelector(".carrito-vacio");
const cardsList = document.querySelector(".card-list tbody");
let cards = [];

allAddevent();
function allAddevent() {
  document.querySelector("#card").addEventListener("mouseout", () => {
    document.querySelector(".table-card").style.display = "none";
  });
  document.querySelector("#card").addEventListener("mouseover", () => {
    document.querySelector(".table-card").style.display = "flex";
  });
  courses.addEventListener("click", addCourse);
  cardsList.addEventListener("click", deleteCourse);
  deleteCard.addEventListener("click", () => {
    cards = [];
    genereHtmlCourses();
  });
  document.addEventListener("DOMContentLoaded", () => {
    cards = JSON.parse(localStorage.getItem("carts")) || [];
    genereHtmlCourses();
  });
}

function addCourse(e) {
  if (e.target.classList.contains("btn-add-course")) {
    const selectCourse = e.target.parentElement;
    //   console.log(selectCourse);
    getInfoCourseSelected(selectCourse);
  }
}
function deleteCourse(e) {
  if (e.target.classList.contains("delete-course")) {
    // obtener el id del curso
    const cursoId = e.target.getAttribute("data-id");
    // borrar el curso del array
    cards = cards.filter((course) => course.id !== cursoId);
    genereHtmlCourses();
  }
}
function getInfoCourseSelected(course) {
  // tomando las datos del curso
  const infoCourse = {
    image: course.querySelector("img").src,
    name: course.querySelector(".name").textContent,
    price: course.querySelector(".price").textContent,
    count: 1,
    id: course.querySelector("a").getAttribute("data-id"),
  };

  // comprobar si el curso ya estaba para aumentar  la cantidad ...
  const existio = cards.some((course) => course.id === infoCourse.id);
  if (existio) {
    // actualizar la cantidad
    cards.forEach((course) => {
      if (course.id === infoCourse.id) {
        course.count++;
        genereHtmlCourses();
      }
    });
  } else {
    //agregamos al curso
    cards = [...cards, infoCourse];
  }
  // console.log(existio);

  genereHtmlCourses();
  // console.log(cards);
}

function genereHtmlCourses() {
  // tenemos que limpiar el html ahi primero para que no se repiten

  clearHtml();

  // contruir el html del carrito
  if (cards.length == 0) {
    // const div = document.createElement('div');
    // div.setAttribute('class', 'carrito-vacio');
    // div.textContent = 'Tu carrito está vacio...';
    //  cardsList.parentElement.parentElement.insertBefore(div,deleteCard);
    emptyCard.style.display = "block";
    deleteCard.style.display = "none";
  } else if (cards.length > 0) {
    emptyCard.style.display = "none";
    deleteCard.style.display = "block";
    cards.forEach((course) => {
      let row = document.createElement("tr");
      row.innerHTML = `
            <td> <img src =" ${course.image}" </td>
            <td> ${course.name}</td>
            <td> ${course.price}</td>
            <td> ${course.count}</td>
            <td > <a class="delete-course" data-id="${course.id}" href="#" > x</a></td>
        `;
      cardsList.appendChild(row);
    });
  }
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carts", JSON.stringify(cards));
}
function clearHtml() {
  // primera forma de limpair el html

  /* cardsList.innerHTML = '';*/

  // segunda forma
  while (cardsList.firstChild) {
    cardsList.removeChild(cardsList.firstChild);
  }
}
