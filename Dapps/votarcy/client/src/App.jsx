import { EthProvider } from "./contexts/EthContext";
import Header from "./components/Header";
import Voting from "./components/Voting";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Header />
          <Voting />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
