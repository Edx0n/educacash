import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");

  const handleChangeUser = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassWord = (event) => {
    setPassWord(event.target.value);
  };

  const register = async (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ userName, passWord }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        toast.success("Usuário criado com sucesso!", {
          className: "toast-success",
        });
        setUserName("");
        setPassWord("");
      } else {
        toast.error("Erro ao se registrar!", {
          className: "toast-success",
        });
      }

      const data = await response.json();
      console.log(data); // Log no response
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <form className="register" onSubmit={register}>
        <h1>Registre-se</h1>
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
        <button>Registrar</button>
      </form>
      <ToastContainer />
    </main>
  );
}
