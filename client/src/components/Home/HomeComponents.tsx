import React, { useState, useEffect } from "react";
import { BiHistory, BiTransferAlt } from "react-icons/bi";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Account {
  accountHolder: string;
  accountNumber: string;
  balance: number;
}

const HomeComponents: React.FC = () => {
  const { accountNumber: accountNumberParam } = useParams<{ accountNumber: string }>();
  const [account, setAccount] = useState<Account>({
    accountHolder: "",
    accountNumber: "",
    balance: 0,
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/account/${accountNumberParam}`)
    .then(response=>{
      setAccount(response.data);
    })
    .catch(err=>alert(err))
  }, [accountNumberParam]);

  return (
    <section id="portfolio" className="py-10">
          <div>
            <h3 className="text-3xl py-1 text-white">Welcome Back, {account.accountHolder}</h3>
          </div>
          <div className="flex flex-col gap-10 py-10 lg:flex-row lg:flex-wrap">
            <div className="bg-neutral-50 rounded-lg basis-2/3 flex-1 text-center md:mb-18 flex flex-col lg:flex-row lg:flex-wrap gap-2 pt-2">
              <h1 className="basis-2/3 flex-1 my-2 text-xl font-bold">Account information</h1>
              <div className="basis-1/3 flex-1 mb-2 text-xl text-center">
                <h1>Owner : {account.accountHolder}</h1>
                <h1 className="mb-4">account number : {account.accountNumber}</h1>
              </div>
              <div className="basis-1/3 flex-1 mb-2 text-xl">
                <h1>Available balance</h1>
                <h1 className="mb-4 font-bold text-3xl">{account.balance} THB</h1>
              </div>
            </div>
            <div className="bg-neutral-50 text-blue-900 rounded-lg  basis-1/3 flex-1 text-center md:mb-18 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
              <Link to={"Deposit"}>
                <h1 className="my-2 text-xl font-bold">Deposit</h1>
                <GiPayMoney className="mx-auto text-5xl mb-2" />
              </Link>
            </div>
            <div className="bg-neutral-50 text-blue-900 rounded-lg  basis-1/3 flex-1 text-center md:mb-18 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
              <Link to={"Withdrawn"}>
                <h1 className="my-2 text-xl font-bold">Withdrawn</h1>
                <GiReceiveMoney className="mx-auto text-5xl mb-2" />
              </Link>
            </div>
            <div className="bg-neutral-50 text-blue-900 rounded-lg  basis-1/3 flex-1 text-center md:mb-18 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
              <Link to={"Transfer"}>
                <h1 className="my-2 text-xl font-bold">Transfer</h1>
                <BiTransferAlt className="mx-auto text-5xl mb-2" />
              </Link>
            </div>
            <div className="bg-neutral-50 text-blue-900 rounded-lg  basis-1/3 flex-1 text-center md:mb-18 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300">
              <Link to={"History"}>
                <h1 className="my-2 text-xl font-bold">Transaction History</h1>
                <BiHistory className="mx-auto text-5xl mb-2" />
              </Link>
            </div>
          </div>
    </section>
  );
};

export default HomeComponents;
