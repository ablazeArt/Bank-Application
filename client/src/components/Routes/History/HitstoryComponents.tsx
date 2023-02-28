import Nav from "../../Nav";
import History from "./History";

const HistoryComponents = () => {
  return (
    <div>
      <div>
        <Nav />
        <main className="bg-blue-800 px-10 dark:bg-gray-900 md:px-20 lg:px-40 vh">
          <History />
        </main>
      </div>
    </div>
  );
};

export default HistoryComponents;
