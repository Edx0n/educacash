import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import "../App.css";
import LogoutIcon from "../Icons/Logout";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  function logout() {
    setUserInfo({});
  }

  const username = userInfo?.userName;

  return (
    <main>
      <header className="header-info">
        <nav>
          {username && (
            <>
              <div>
                <span className="welcome">
                  Bem vindo de volta, <strong>{username}</strong>
                </span>
                <a className="logoutButton" onClick={logout}>
                  <LogoutIcon fill="none" stroke="currentColor" />
                </a>
              </div>
            </>
          )}

          {!username && (
            <>
              <div className="links">
                <Link to="/login"> Login</Link>
                <Link to="/register"> Registre-se</Link>
              </div>
            </>
          )}
        </nav>
      </header>
    </main>
  );
}
