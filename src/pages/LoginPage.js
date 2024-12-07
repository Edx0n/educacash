import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../userContext";
import "../App.css";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
  const { setUserInfo } = useContext(UserContext);

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleChangeUser = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassWord = (event) => {
    setPassWord(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userName, passWord }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Sucesso", {
          className: "toast-success",
        });
        response.json().then((userInfo) => {
          setUserInfo(userInfo);
          setRedirect(true);
        });
      } else {
        toast.error("Credenciais inválidas", {
          className: "toast-success",
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <main>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <br />
        <input
          type="text"
          placeholder="Usuário"
          value={userName}
          onChange={(e) => handleChangeUser(e)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={passWord}
          onChange={(e) => handleChangePassWord(e)}
        />

        <button>Login</button>
      </form>
      <ToastContainer />
    </main>
  );
}
