import Nav from "../../Nav";
import Transfer from "./Transfer";

const TransferComponents = () => {
  return (
    <div>
      <div>
        <Nav />
        <main className="bg-blue-800 px-10 dark:bg-gray-900 md:px-20 lg:px-40 vh">
          <Transfer />
        </main>
      </div>
    </div>
  );
};

export default TransferComponents;
