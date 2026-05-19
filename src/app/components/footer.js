import styles from "../page.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <p>
                Panel de Administración 🎓 Hecho con <span>❤️</span> por Iker &copy; {new Date().getFullYear()}
            </p>
        </div>
    );
}