import classes from './Header.module.scss';
import Link from 'next/link'
import HeaderMessagesButton from "../messages/HeaderMessagesButton";
import LogoMak from "./LogoMAK";
import {useContext} from "react";
import AuthContext from "../../context-store/auth-context";

function Header(props) {
  const authContext = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <LogoMak/>
        <p>Next With Context</p>
      </div>

      <nav>
        {
          !authContext.isLoggedIn &&
          <ul>
            <li>
              <Link href='/login'>Login</Link>
            </li>
            <li>
              <Link href='/signup'>Sign Up</Link>
            </li>
          </ul>
        }
        {
          authContext.isLoggedIn &&
          <ul>
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/products'>Products</Link>
            </li>
          </ul>
        }
      </nav>
      <HeaderMessagesButton onClick={props.onShowCart}/>
    </header>
  );
}

export default Header;
