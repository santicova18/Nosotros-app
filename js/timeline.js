let recuerdos = JSON.parse(localStorage.getItem("recuerdos")) || [];

// ordenar
recuerdos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

const timeline = document.getElementById("timeline");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const cerrar = document.getElementById("cerrar");

recuerdos.forEach(item => {
  let div = document.createElement("div");
  div.classList.add("recuerdo");

  div.innerHTML = `
    <img src="${item.img}">
    <p>${item.fecha}</p>
  `;

  div.addEventListener("click", () => {
    modalContent.innerHTML = `
      <img src="${item.img}">
      <p>${item.texto}</p>
      <small>${item.fecha}</small>
    `;
    modal.style.display = "block";
  });

  timeline.appendChild(div);
});

cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});