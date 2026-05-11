import { db } from "../firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

export async function guardarRecuerdo(recuerdo) {
  const coleccion = collection(db, "recuerdos");
  await addDoc(coleccion, recuerdo);
}

export async function obtenerRecuerdos() {
  const coleccion = collection(db, "recuerdos");
  const snapshot = await getDocs(coleccion);
  const recuerdos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  // Ordenar por fecha descendente (más nuevos primero)
  return recuerdos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export async function eliminarRecuerdo(id) {
  const docRef = doc(db, "recuerdos", id);
  await deleteDoc(docRef);
}