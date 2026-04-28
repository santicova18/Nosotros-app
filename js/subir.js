let recuerdos = JSON.parse(localStorage.getItem("recuerdos")) || [];

document.getElementById("guardar").addEventListener("click", () => {
  let archivo = document.getElementById("imagen").files[0];
  let texto = document.getElementById("texto").value;
  let fecha = document.getElementById("fecha").value;

  if (!archivo || !texto || !fecha) {
    alert("Completa todo 😡");
    return;
  }

  let reader = new FileReader();

  reader.onload = function(e) {
    let nuevo = {
      img: e.target.result, // base64
      texto: texto,
      fecha: fecha
    };

    recuerdos.push(nuevo);

    localStorage.setItem("recuerdos", JSON.stringify(recuerdos));

    alert("Recuerdo guardado ❤️");

    window.location.href = "timeline.html";
  };

  reader.readAsDataURL(archivo);
});