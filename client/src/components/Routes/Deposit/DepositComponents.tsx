import Nav from "../../Nav";
import Deposit from "./Deposit";

const DepositComponents = () => {
  return (
    <div>
      <div>
        <Nav />
        <main className="bg-blue-800 px-10 dark:bg-gray-900 md:px-20 lg:px-40 vh">
          <Deposit />
        </main>
      </div>
    </div>
  );
};

export default DepositComponents;
