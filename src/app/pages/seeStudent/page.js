"use client";

import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import api from "../../api/axios";

export default function SeeStudentPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toasts, setToasts] = useState([]);
    
    // Estados para la ventana modal de edición
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const showToast = (title, message, type = "success") => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    // Función para obtener los estudiantes del backend
    const getStudents = async () => {
        try {
            const response = await api.get('/api/v1/student');
            return response.data;
        } catch (error) {
            console.error("Error al obtener los estudiantes:", error);
            showToast("Error de Conexión", "No se pudo sincronizar con la base de datos de estudiantes.", "error");
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStudents().then((data) => setStudents(data));
    }, []);

    // Función para eliminar el estudiante
    const deleteStudent = async (id, name) => {
        if (confirm(`¿Estás seguro de que deseas eliminar permanentemente a ${name}?`)) {
            try {
                await api.delete(`/api/v1/student/${id}`);
                setStudents(students.filter(student => student.id !== id));
                showToast("Estudiante Eliminado", `${name} fue dado de baja correctamente.`, "success");
            } catch (error) {
                console.error("Error al eliminar el estudiante:", error);
                showToast("Error al Eliminar", "No se pudo realizar la eliminación en el servidor.", "error");
            }
        }
    };

    // Abre el modal e introduce la información inicial del estudiante
    const openUpdateModal = (student) => {
        setSelectedStudent(student);
        setEditFormData({
            name: student.name,
            email: student.email,
            password: student.password
        });
        setShowModal(true);
    };

    // Controla cambios en el input dentro de la ventana modal
    const handleEditChange = (e) => {
        setEditFormData({
            ...editFormData,
            [e.target.name]: e.target.value
        });
    };

    // Envía el PUT request al backend para actualizar el estudiante
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/api/v1/student/${selectedStudent.id}`, editFormData);
            
            // Actualizamos la tabla localmente
            setStudents(students.map(student => 
                student.id === selectedStudent.id 
                    ? { ...student, ...editFormData } 
                    : student
            ));
            
            setShowModal(false);
            showToast("Estudiante Actualizado", `Los datos de ${editFormData.name} han sido actualizados con éxito.`, "success");
        } catch (error) {
            console.error("Error al actualizar estudiante:", error);
            showToast("Error al Actualizar", "Hubo un fallo al intentar modificar los datos.", "error");
        }
    };

    return (
        <div className={styles.maindiv}>
            <Navbar />
            
            <div className={`${styles.contentWrapper} animate-fade-in`}>
                <div className={styles.pageHeader}>
                    <h1>Base de Datos Estudiantil 🎓</h1>
                    <p>Administra, edita y elimina registros de los estudiantes matriculados en el sistema.</p>
                </div>

                {loading ? (
                    <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", fontSize: "1.1rem" }}>
                        Cargando base de datos...
                    </div>
                ) : students.length === 0 ? (
                    <div className={styles.tableContainer}>
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📂</div>
                            <div className={styles.emptyText}>
                                <h3>Base de datos vacía</h3>
                                <p>No se encontraron registros en el sistema. Agrega un estudiante nuevo en la barra superior.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Estudiante</th>
                                    <th>Email</th>
                                    <th>Contraseña</th>
                                    <th style={{ textAlign: "right" }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <div className={styles.studentInfo}>
                                                <div className={styles.avatar}>
                                                    {student.name ? student.name.charAt(0) : "S"}
                                                </div>
                                                <div className={styles.studentName}>{student.name}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={styles.studentEmail}>{student.email}</span>
                                        </td>
                                        <td>
                                            <span className={styles.passwordField}>••••••••</span>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                                <button 
                                                    className={`${styles.btn} ${styles.btnEdit}`} 
                                                    onClick={() => openUpdateModal(student)}
                                                >
                                                    ✏️ Editar
                                                </button>
                                                <button 
                                                    className={`${styles.btn} ${styles.btnDanger}`} 
                                                    onClick={() => deleteStudent(student.id, student.name)}
                                                >
                                                    🗑️ Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Ventana Modal para Editar Estudiante */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h2>Editar Estudiante</h2>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleUpdateSubmit}>
                            <div className={styles.modalBody}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="edit-name">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        id="edit-name" 
                                        name="name" 
                                        className={styles.formInput}
                                        value={editFormData.name} 
                                        onChange={handleEditChange} 
                                        required 
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="edit-email">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        id="edit-email" 
                                        name="email" 
                                        className={styles.formInput}
                                        value={editFormData.email} 
                                        onChange={handleEditChange} 
                                        required 
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="edit-password">Contraseña</label>
                                    <input 
                                        type="text" 
                                        id="edit-password" 
                                        name="password" 
                                        className={styles.formInput}
                                        value={editFormData.password} 
                                        onChange={handleEditChange} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button 
                                    type="button" 
                                    className={`${styles.btn} ${styles.btnSecondary}`} 
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    className={`${styles.btn} ${styles.btnPrimary}`}
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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