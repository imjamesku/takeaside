import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import styles from "./layout.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../_reducers";
import { userActions } from "../../_actions/user.actions";
import Router from "next/router";
import { alertActions } from "../../_actions/alert.actions";

type Props = {
  title?: string;
  description?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "Create your topic now! | imbiased",
  description = "Want to know what MOST people think? imbiased is a voting platform where you can create topics and let people vote and talk about it. Find out what people think about a topic now!",
}) => {
  const loggedIn = useSelector(
    (state: RootState) => state.authentication.loggedIn
  );
  const dispatch = useDispatch();
  const alert = useSelector((state: RootState) => state.alert);
  // const router = useRouter()

  // React.useEffect(() => {
  //   dispatch(alertActions.clear())
  // }, [router.pathname])
  React.useEffect(() => {
    dispatch(userActions.loadUser());
  }, []);
  Router.events.on("routeChangeStart", () => dispatch(alertActions.clear()));

  const publicLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/signin", text: "Log in" },
  ];

  const privateLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    // { href: "/users", text: "Users List" },
    // { href: "/profile", text: "Profile" },
  ];

  const navLinks = loggedIn ? privateLinks : publicLinks;

  return (
    <>
      <div className={styles.wrap}>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content={description} />
        </Head>
        <header>
          <nav className={styles.navBar}>
            <Link href="/">
              <a className={styles.brand}>imbiased.net</a>
            </Link>
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <a className={styles.navLink}>{link.text}</a>
              </Link>
            ))}
            {loggedIn && (
              <button onClick={() => dispatch(userActions.logout())}>
                Logout
              </button>
            )}
          </nav>
        </header>
        <div className={styles.container}>
          {alert.message && (
            <div className={`alert ${alert.type}`}>{alert.message}</div>
          )}
          {children}
        </div>
        <footer className={styles.footer}>
          <div>
            <h3>About</h3>
            <span>Fun voting platform</span>
          </div>

          <div>
            <h3>Contact</h3>
            <span>jameskubusiness@gmail.com</span>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
