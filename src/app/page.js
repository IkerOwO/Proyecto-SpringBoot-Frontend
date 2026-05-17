import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


// Los estilos se declaran asi: div className={styles.page} el .page es el nombre de la clase que se ha puesto en el CSS
export default function Home() {
  return (
    <div className={styles.maindiv}>
      {/* Navbar desde /components navbar.js */}
      <Navbar />





      {/* Footer desde /components footer.js */}
      <Footer />
    </div>
  );
}
