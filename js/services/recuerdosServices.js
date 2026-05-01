import { db } from "../firebase.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const coleccion = collection(db, "recuerdos");

export async function guardarRecuerdo(recuerdo) {
  await addDoc(coleccion, recuerdo);
}

export async function obtenerRecuerdos() {
  const snapshot = await getDocs(coleccion);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}