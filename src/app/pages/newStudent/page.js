import styles from "../../page.module.css"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function NewStudentPage(){

    // FALTA: Mandar a /api/axios.js para hacer el POST request y que el backend guarde la info en la base de datos

    return (
        <div className={styles.maindiv}>
            <Navbar />
            <h1 style={{textAlign: "center", marginTop: "50px"}}>New Student</h1>

            {/* Falta comunicar con backend */}
            <form className={styles.form} autoComplete="off">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
                <input type="submit" value="Add Student" />
            </form>
            
            <Footer />
        </div>
    )
}