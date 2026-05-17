import styles from "../page.module.css";

export default function Navbar(){
    return (
        <div className={styles.navbar}>
            <div className={styles.brand}>
                <h1>School's App</h1>
            </div>
            <div className={styles.opciones}>
                <div className={styles.opcion}>
                    <p>Home</p>
                </div>
                <div className={styles.opcion}>
                    <p>Profile</p>
                </div>
                <div className={styles.opcion}>
                    <p>Settings</p>
                </div>
                <div className={styles.opcion}>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}
