import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.scss'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav className={styles.navBar}>
          <Link href="/">
            <a className={styles.brand}>pickaside.com</a>
          </Link>
          <Link href="/">
            <a className={styles.navLink}>Home</a>
          </Link>
          <Link href="/about">
            <a className={styles.navLink}>About</a>
          </Link>
          <Link href="/users">
            <a className={styles.navLink}>Users List</a>
          </Link>
          <Link href="/profile">
            <a className={styles.navLink}>Profile</a>
          </Link>
          <a href="/api/users">Users API</a>
        </nav>
      </header>
      <div className={styles.container}>
        {children}
      </div>
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )

export default Layout
