// firebase.js
// Usa importaciones desde CDN: asegúrate de que la red cargue estos módulos
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ===== 1. Configuración de Firebase =====
const firebaseConfig = {
  apiKey: "AIzaSyAUq2XW3hHWun11G_I0iUkKgrSi7dYKa2o",
  authDomain: "beautystudio-a0fc3.firebaseapp.com",
  projectId: "beautystudio-a0fc3",
  storageBucket: "beautystudio-a0fc3.appspot.com", // Debe terminar en .appspot.com
  messagingSenderId: "819260848097",
  appId: "1:819260848097:web:37afb19a6c73b6f57fc4a0",
  measurementId: "G-9KQH552244"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Mensaje en consola para confirmar carga
console.log("Firebase inicializado correctamente.");

// ===== 2. Función principal cuando DOM está listo =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando listeners de formulario.");

  const form = document.getElementById("reservaForm");
  if (!form) {
    console.error("No se encontró el formulario con id 'reservaForm'. Asegúrate de que el id coincida.");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Envío de formulario detectado.");

    // Capturar valores de inputs con id explícito
    const nombreInput = document.getElementById("inputNombre");
    const correoInput = document.getElementById("inputCorreo");
    const fechaInput = document.getElementById("inputFecha");
    const horaInput = document.getElementById("inputHora");
    const servicioSelect = document.getElementById("selectServicio");
    const comentariosTextarea = document.getElementById("textareaComentarios");

    if (!nombreInput || !correoInput || !fechaInput || !horaInput || !servicioSelect || !comentariosTextarea) {
      console.error("Algún input no fue encontrado. Verifica los ids.");
      alert("Error interno: elementos del formulario no encontrados.");
      return;
    }

    const nombre = nombreInput.value.trim();
    const correo = correoInput.value.trim();
    const fecha = fechaInput.value;
    const hora = horaInput.value;
    const servicio = servicioSelect.value;
    const comentarios = comentariosTextarea.value.trim();

    // Validaciones básicas
    if (!nombre || !correo || !fecha || !hora || !servicio) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }
    console.log("Datos capturados:", { nombre, correo, fecha, hora, servicio, comentarios });

    // ===== 3. Verificar disponibilidad: no duplicar fecha+hora =====
    try {
      const citasRef = collection(db, "reservas");
      const q = query(citasRef, where("fecha", "==", fecha), where("hora", "==", hora));
      const snapshot = await getDocs(q);
      console.log("Consulta de disponibilidad completada, docs encontrados:", snapshot.size);

      if (!snapshot.empty) {
        alert("⚠️ Ya existe una cita agendada para esa fecha y hora. Por favor escoge otro horario.");
        return;
      }
    } catch (error) {
      console.error("Error al consultar disponibilidad:", error);
      alert("Error al verificar disponibilidad. Intenta de nuevo más tarde.");
      return;
    }

    // ===== 4. Guardar la cita =====
    try {
      const citasRef = collection(db, "reservas");
      const nuevo = {
        nombre,
        correo,
        fecha,
        hora,
        servicio,
        comentarios,
        createdAt: new Date().toISOString()
      };
      console.log("Intentando guardar la cita:", nuevo);
      const docRef = await addDoc(citasRef, nuevo);
      console.log("Cita guardada con ID:", docRef.id);
      alert("✅ ¡Tu cita ha sido registrada con éxito!");
      form.reset();
    } catch (error) {
      console.error("Error al registrar la cita:", error);
      alert("❌ Hubo un error al registrar tu cita. Inténtalo más tarde.");
    }
  });
});
