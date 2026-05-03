import { db } from "../firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


export async function guardarRecuerdo(recuerdo) {
  const coleccion = collection(db, "recuerdos");
  await addDoc(coleccion, recuerdo);
}

export async function obtenerRecuerdos() {
  const coleccion = collection(db, "recuerdos");
  const snapshot = await getDocs(coleccion);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}