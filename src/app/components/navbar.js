'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from "../page.module.css";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    
    const isActive = (path) => pathname === path;
    
    return (
        <div className={styles.navbar}>
            <div className={styles.brand} onClick={() => router.push("/")}>
                <h1>🎓 School Admin</h1>
            </div>
            <div className={styles.opciones}>
                <div 
                    className={`${styles.opcion} ${isActive('/') ? styles.opcionActive : ''}`}
                    onClick={() => router.push("/")}
                >
                    Inicio
                </div>
                <div 
                    className={`${styles.opcion} ${isActive('/pages/newStudent') ? styles.opcionActive : ''}`}
                    onClick={() => router.push("/pages/newStudent")}
                >
                    Registrar Estudiante
                </div>          
                <div 
                    className={`${styles.opcion} ${isActive('/pages/seeStudent') ? styles.opcionActive : ''}`}
                    onClick={() => router.push("/pages/seeStudent")}
                >
                    Base de Datos
                </div>
            </div>
        </div>
    );
}
