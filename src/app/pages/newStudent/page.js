"use client";

import { useState } from "react";
import styles from "../../page.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import api from "../../api/axios";

export default function NewStudentPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [toasts, setToasts] = useState([]);

    const showToast = (title, message, type = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hacemos el POST request al backend
            const response = await api.post('/api/v1/student', formData);
            
            showToast(
                "¡Registro Exitoso!", 
                `El estudiante ${formData.name} ha sido guardado correctamente en el sistema.`, 
                "success"
            );
            
            // Limpiamos el formulario
            setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            showToast(
                "Error de Registro", 
                "Hubo un error al intentar guardar al estudiante. Por favor, intente de nuevo.", 
                "error"
            );
        }
    };

    return (
        <div className={styles.maindiv}>
            <Navbar />
            
            <div className={`${styles.contentWrapper} animate-fade-in`}>
                <div className={styles.pageHeader}>
                    <h1>Registrar Estudiante 📝</h1>
                    <p>Introduce las credenciales para dar de alta a un nuevo alumno en la plataforma administrativa.</p>
                </div>

                <div className={styles.formContainer}>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Nombre Completo</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className={styles.formInput}
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Ej. Juan Pérez"
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                className={styles.formInput}
                                value={formData.email} 
                                onChange={handleChange} 
                                placeholder="ejemplo@escuela.com"
                                required 
                            />
                        </div>
                        
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                className={styles.formInput}
                                value={formData.password} 
                                onChange={handleChange} 
                                placeholder="Mínimo 6 caracteres"
                                required 
                            />
                        </div>
                        
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSubmit}`}>
                            Añadir Estudiante
                        </button>
                    </form>
                </div>
            </div>

            {/* Sistema de Notificaciones Toast */}
            <div className={styles.toastContainer}>
                {toasts.map((toast) => (
                    <div 
                        key={toast.id} 
                        className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}
                    >
                        <div className={styles.toastIcon}>
                            {toast.type === 'success' ? '✅' : '❌'}
                        </div>
                        <div className={styles.toastContent}>
                            <div className={styles.toastTitle}>{toast.title}</div>
                            <div className={styles.toastMessage}>{toast.message}</div>
                        </div>
                    </div>
                ))}
            </div>
            
            <Footer />
        </div>
    );
}