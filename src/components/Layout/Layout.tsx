import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import styles from './layout.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../_reducers'
import { userActions } from '../../_actions/user.actions'
import Router, { useRouter } from 'next/router'
import { alertActions } from '../../_actions/alert.actions'

type Props = {
  title?: string
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = 'This is the default title',
}) => {
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn)
  const dispatch = useDispatch()
  const alert = useSelector((state: RootState) => state.alert)
  // const router = useRouter()

  // React.useEffect(() => {
  //   dispatch(alertActions.clear())
  // }, [router.pathname])
  React.useEffect(() => {
    dispatch(userActions.loadUser())

  }, [])
  Router.events.on('routeChangeStart', () => dispatch(alertActions.clear()))

  const publicLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    {href: "/signin", text: "Log in"}
  ]

  const privateLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/users", text: "Users List" },
    { href: "/profile", text: "Profile" },
  ]

  const navLinks = loggedIn ? privateLinks : publicLinks

  return (
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
          {navLinks.map((link, index) => <Link key={index} href={link.href}><a className={styles.navLink}>{link.text}</a></Link>)}
          {/* <Link href="/">
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
          </Link> */}
          {/* <a href="/api/users">Users API</a> */}
          {loggedIn && <button onClick={() => dispatch(userActions.logout())}>Logout</button>}
        </nav>
      </header>
      <div className={styles.container}>
        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
        {children}
      </div>
      <footer className={styles.footer}>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
