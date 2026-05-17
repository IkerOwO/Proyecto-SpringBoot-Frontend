'use client';
import { useRouter } from 'next/navigation';
import styles from "../page.module.css";


export default function Navbar(){
    const router = useRouter();
    
    return (
        <div className={styles.navbar}>
            <div className={styles.brand}>
                <h1>School's App</h1>
            </div>
            <div className={styles.opciones}>
                <div className={styles.opcion}>
                    <p onClick={() => router.push("/")}>Home</p>
                </div>
                <div className={styles.opcion}>
                    <p onClick={() => router.push("/pages/newStudent")}>New Student</p>
                </div>          
                <div className={styles.opcion}>
                    <p onClick={() => router.push("/pages/updateStudent")}>Update Student</p>
                </div>
                <div className={styles.opcion}>
                    <p onClick={() => router.push("/pages/deleteStudent")}>Delete Student</p>
                </div>
            </div>
        </div>
    )
}
