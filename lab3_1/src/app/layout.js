import "./globals.css";
import Link from 'next/link'
import styles from './page.module.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        <header className={styles['header']}>
          <nav className={styles['nav']}>
            <Link href="/pokemon" className={styles["nav-link"]}>Pokemons</Link>
            <Link href="/favorites" className={styles["nav-link"]}>Favorites</Link>
          </nav>
        </header>
        <main className={styles["main-content"]}>
          {children}
        </main>
      </body>
    </html>
  );
}
