import Nav from "../../Nav";
import Withdrawn from "./Withdrawn";

const WithdrawnComponents = () => {
  return (
    <div>
      <div>
        <Nav />
        <main className="bg-blue-800 px-10 dark:bg-gray-900 md:px-20 lg:px-40 vh">
          <Withdrawn />
        </main>
      </div>
    </div>
  );
};

export default WithdrawnComponents;
