import "../styles/globals.css";
import "./App.css";
import HomeComponents from "./components/Home/HomeComponents";
import Navbar from "./components/Nav";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <main className="bg-blue-800 px-10 md:px-20 lg:px-40 vh">
          <HomeComponents />
        </main>
      </div>
    </div>
  );
}

export default App;
