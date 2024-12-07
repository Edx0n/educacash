import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../pages/Header";
import { UserContext } from "../userContext";
import BalanceChart from "../components/BalanceChart";

function MainPage() {
  const { userInfo } = useContext(UserContext);

  const [name, setName] = useState("");
  const [datetime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    const url = process.env.REACT_APP_API_URL + "/transactions";

    fetch(url)
      .then((response) => {
        response.json().then((json) => {
          setTransactions(json);
        });
      })
      .catch((error) => {
        console.error("error", error);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  function addNewTransaction(ev) {
    ev.preventDefault();

    if (!datetime || !name || !description) {
      return toast.error("Preencha todos os campos", {
        className: "toast-success",
      });
    }

    const url = process.env.REACT_APP_API_URL + "/transaction";

    const price = parseFloat(name.split(" ")[0]);
    const transactionName = name.substring(name.indexOf(" ") + 1);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price,
        name: transactionName ?? price.toString(),
        description,
        datetime,
        userId: userInfo?.id,
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          toast.success("Transação adicionada com sucesso", {
            className: "toast-success",
          });
          console.log("json", json);
        });
      })
      .finally(() => {
        setName("");
        setDateTime("");
        setDescription("");
        fetchTransactions();
      });
  }

  // Filtrar transações pelo userId do usuário logado
  const userTransactions = transactions.filter(
    (transaction) => transaction.userId === userInfo?.id
  );

  let balance = userTransactions
    .reduce((acc, transaction) => acc + transaction.price, 0)
    .toFixed(2);
  const [integerPart, fractionPart] = balance.split(".");

  return (
    <React.Fragment>
      <Header />
      <main>
        <h1>
          R${integerPart}
          <span>.{fractionPart}</span>
        </h1>

        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              placeholder={"+20 mesada"}
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(ev) => setDateTime(ev.target.value)}
            />
          </div>
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder={"descrição"}
            />
          </div>
          <button type="submit" disabled={!userInfo?.id}>
            {!userInfo?.id
              ? "Você precisa estar logado para adicionar uma nova transação!"
              : "Adicionar nova transação"}
          </button>
        </form>

        <BalanceChart transactions={userTransactions} />

        <div className="transactions">
          {userTransactions.length > 0 ? (
            userTransactions.map((transaction) => (
              <div className="transaction" key={transaction._id}>
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={`price ${
                      transaction.price < 0 ? "red" : "green"
                    }`}
                  >
                    R${transaction.price}
                  </div>
                  <div className="datetime">
                    {moment(transaction.datetime).format("DD/MM/YYYY, HH:mm")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="nodata">Nenhuma transação registrada ainda!</div>
          )}
        </div>

        <ToastContainer />
      </main>
    </React.Fragment>
  );
}

export default MainPage;
