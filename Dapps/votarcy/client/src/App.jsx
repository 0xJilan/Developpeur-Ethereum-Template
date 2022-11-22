import { EthProvider } from "./contexts/EthContext";
import Layout from "./components/Layout";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <Layout />
      </div>
    </EthProvider>
  );
}

export default App;
