import axios from 'axios';

// Creamos una instancia de axios configurada con la URL base de tu backend SpringBoot
const api = axios.create({
  baseURL: 'http://localhost:8080', // Asumiendo que SpringBoot corre en este puerto
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;