"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import api from "./api/axios";

export default function Home() {
    const router = useRouter();
    const [totalStudents, setTotalStudents] = useState(0);
    const [apiStatus, setApiStatus] = useState("checking"); // "checking", "online", "offline"

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/api/v1/student');
                setTotalStudents(response.data.length);
                setApiStatus("online");
            } catch (error) {
                console.error("Error al obtener estadísticas:", error);
                setApiStatus("offline");
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={styles.maindiv}>
            <Navbar />
            <div className={`${styles.contentWrapper} animate-fade-in`}>
                <div className={styles.welcomeCard}>
                    <h2>👋 ¡Bienvenido al Panel de Control!</h2>
                    <p>
                        Aquí puedes gestionar todos los datos relacionados con el cuerpo estudiantil de forma rápida,
                        intuitiva y segura. Introduce nuevos alumnos, edita sus credenciales o elimina registros según sea necesario.
                    </p>
                </div>

                <div className={styles.dashboardGrid}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIconWrapper} ${styles.statIconBlue}`}>🎓</div>
                        <div className={styles.statInfo}>
                            <h3>Estudiantes Registrados</h3>
                            <div className={styles.statValue}>{totalStudents}</div>
                        </div>
                        <span className={`${styles.statBadge} ${styles.badgeGreen}`}>Activos</span>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIconWrapper} ${apiStatus === 'online' ? styles.statIconGreen : styles.statIconBlue}`}>
                            {apiStatus === 'online' ? '🟢' : apiStatus === 'offline' ? '🔴' : '🟡'}
                        </div>
                        <div className={styles.statInfo}>
                            <h3>Estado del Servidor</h3>
                            <div className={styles.statValue}>
                                {apiStatus === 'online' ? 'Conectado' : apiStatus === 'offline' ? 'Desconectado' : 'Verificando...'}
                            </div>
                        </div>
                        <span 
                            className={`${styles.statBadge}`} 
                            style={{ 
                                backgroundColor: apiStatus === 'offline' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)', 
                                color: apiStatus === 'offline' ? 'var(--danger)' : 'var(--success)',
                                display: apiStatus === 'checking' ? 'none' : 'block'
                            }}
                        >
                            Spring Boot
                        </span>
                    </div>

                    <div className={styles.statCard}>
                        <div className={`${styles.statIconWrapper} ${styles.statIconBlue}`}>⚡</div>
                        <div className={styles.statInfo}>
                            <h3>Acciones Rápidas</h3>
                            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                                <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => router.push('/pages/newStudent')}>
                                    + Registrar
                                </button>
                                <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => router.push('/pages/seeStudent')}>
                                    Ver Listado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
