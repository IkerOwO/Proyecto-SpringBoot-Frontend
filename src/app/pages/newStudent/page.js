"use client";

import { useState } from "react";
import styles from "../../page.module.css"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import api from "../../api/axios"

export default function NewStudentPage(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

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
            alert("Estudiante guardado exitosamente!");
            // Limpiamos el formulario
            setFormData({ name: "", email: "", password: "" });
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error al guardar el estudiante.");
        }
    };

    return (
        <div className={styles.maindiv}>
            <Navbar />
            <h1 style={{textAlign: "center", marginTop: "50px"}}>New Student</h1>

            <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                
                <input type="submit" value="Add Student" />
            </form>
            
            <Footer />
        </div>
    )
}