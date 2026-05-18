"use client";

import { useState, useEffect } from "react";
import styles from "../../page.module.css"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import api from "../../api/axios"

export default function SeeStudentPage(){

    // Funcion para obtener los estudiantes del backend
    const getStudents = async () => {
        try {
            // Hacemos el GET request al backend
            const response = await api.get('/api/v1/student');
            // Retornamos los datos
            return response.data;
        } catch (error) {
            console.error("Error al obtener los estudiantes:", error);
            return [];
        }
    }

    // Hook para guardar el estado de los estudiantes
    const [students, setStudents] = useState([]);

    // Usamos el useEffect para obtener los estudiantes cuando el componente se monte
    useEffect(() => {
        getStudents().then((data) => setStudents(data));
    }, []);

    // Funcion para eliminar el estudiante
    const deleteStudent = async (id) => {
        try {
            // Hacemos el DELETE request al backend
            await api.delete(`/api/v1/student/${id}`);
            // Actualizamos la tabla
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error("Error al eliminar el estudiante:", error);
        }
    }

    // FALTA POR IMPLEMENTAR EN LA API
    //Funcion para actualizar el estudiante
    // const updateStudent = async (id) => {
    //     try {
    //         await api.put(`/api/v1/student/${id}`, );
    //         setStudents(students.filter(student => student.id !== id));
    //     } catch (error) {
    //         console.error("Error al eliminar el estudiante:", error);
    //     }
    // }

    return (
        <div className={styles.maindiv}>
            <Navbar />
            <h1 style={{textAlign: "center", marginTop: "50px", marginBottom: "50px"}}>All Students</h1>

            {/* Metemos los estudiantes en una tabla */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.password}</td>
                            <td>
                                <button className={styles.button} onClick={() => deleteStudent(student.id)}>Delete</button>
                            </td>
                            <td>
                                <button className={styles.button} onClick={() => updateStudent(student.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Footer />
        </div>
    )
}