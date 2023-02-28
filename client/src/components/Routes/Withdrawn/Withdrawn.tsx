import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { stat } from "fs";

interface Account {
  accountHolder: string;
  accountNumber: string;
  balance: number;
}

type WithdrawnState = {
  action: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  remain: number;
};

const Withdrawn: React.FC = () => {
  const [account, setAccount] = useState<Account>({
    accountHolder: "",
    accountNumber: "",
    balance: 0,
  });

  const { balance } = account;

  const { accountNumber: accountNumberParam } = useParams<{ accountNumber: string }>();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/account/${accountNumberParam}`)
      .then((response) => {
        setAccount(response.data);
      })
      .catch((err) => alert(err));
  }, [accountNumberParam]);

  const [state, setState] = useState<WithdrawnState>({
    toAccount: "",
    amount: 0,
    action: "",
    fromAccount: "",
    remain: account.balance,
  });

  const { action, fromAccount, toAccount, amount, remain } = state;

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //create withdrawn data
    axios
      .post(`http://localhost:5000/transaction`, { action, fromAccount, toAccount, amount, remain })
      .then((response) => {
        setState({ ...state, amount: 0 });
        Swal.fire("Congratulations", "Withdrawn completed", "success");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
    //update balance
    axios
      .put(`http://localhost:5000/account/${accountNumberParam}`, { balance })
      .then((response) => {
        const { balance } = response.data;
        setAccount({ ...account, balance });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };

  //กำหนดค่าให้state
  useEffect(() => {
    setState({ ...state, action: "Withdrawn", fromAccount: account.accountNumber, toAccount: account.accountNumber, remain: account.balance - Number(state.amount) });
  }, [account, state.amount]);

  const inputValue = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setState({ ...state, [name]: event.target.value });
  };

  const updateBalance = () => {
    if (remain >= 0) {
      setAccount({ ...account, balance: remain });
    }
  };

  return (
    <section id="withdrawn" className="pb-8">
      <div className="flex text-white py-8">
        <Link to={`/account/${accountNumberParam}`}>
          <AiOutlineArrowLeft className="text-4xl" />
        </Link>
        <h1 className="text-2xl py-1 mx-auto">Withdrawn</h1>
      </div>
      <div>
        <h3 className="text-2xl py-1 text-white">Account</h3>
        <div className="flex flex-col gap-10 pt-5 pb-10 lg:flex-row lg:flex-wrap">
          <div className="bg-neutral-50 rounded-lg flex-1 text-left md:mb-18">
            <div className="flex my-3">
              <img src="https://image.makewebeasy.net/makeweb/m_200x200/m14BHwk4P/Home/clicknext_logo2x.png?v=202012190947" className="mt-2 ml-6 mr-6 h-6 sm:h-11 sm:mt-0" alt="" />
              <div className="md:text-xl text-base">
                <h1 className=" mt-2 text-gray-500 ">bank account number</h1>
                <h1 className="font-bold">{account.accountNumber}</h1>
                <h1 className="mb-4">{account.balance} THB</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={submitForm}>
        <div className="bg-blue-50 pb-10">
          <h3 className="ml-6 pt-4 pb-1 text-2xl font-bold">Amount</h3>
          <div className="text-center">
            <input type="number" value={amount} onChange={inputValue("amount")} placeholder="0.00 THB" className="w-5/6 text-blue-800 placeholder-blue-800 text-xl font-bold mt-8 border-0 border-b border-blue-500 bg-blue-50" />
            <p className="text-left ml-28 mt-2 text-gray-500 pb-5">Enter account number (10-19 difits)</p>
            <button onClick={updateBalance} typeof="submit" className="w-5/6 bg-blue-800 text-white p-3 hover:bg-blue-700 rounded-lg">
              Confirm
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Withdrawn;
