import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Label, TextInput, Button } from "flowbite-react";
import {useNavigate} from 'react-router-dom';

interface State {
  accountNumber: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    accountNumber: "",
    password: "",
  });

  const { accountNumber, password } = state;

  const inputValue = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.value } as Pick<State, keyof State>);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table({accountNumber,password})
    navigate(`/account/${accountNumber}`);
  };

  return (
    <section id="deposit" className="pb-8 w-full">
      <img src="https://image.makewebeasy.net/makeweb/m_200x200/m14BHwk4P/Home/clicknext_logo2x.png?v=202012190947" className="h-10 md:h-20 mx-auto" alt="" />
      <div className="flex text-white py-8">
        <h1 className="text-2xl py-1 mx-auto">Login</h1>
      </div>
      <form onSubmit={submitForm} action="" className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <label className="text-white">Account Number</label>
          </div>
          <TextInput
            type="text"
            placeholder="Your account number"
            value={accountNumber}
            onChange={inputValue("accountNumber")}
          />
        </div>
        <Button type="submit" className="hover:bg-blue-400 mt-4">Submit</Button>
      </form>
    </section>
  );
};

export default Login;
