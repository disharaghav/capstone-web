import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        Quiz<span>Quest</span>
      </Link>
      <div className={styles.links}>
        <Link to="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
        <Link to="/history" className={pathname === '/history' ? styles.active : ''}>History</Link>
      </div>
    </nav>
  )
}
