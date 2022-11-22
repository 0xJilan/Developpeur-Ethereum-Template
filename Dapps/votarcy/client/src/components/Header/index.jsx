import useEth from "../../contexts/EthContext/useEth";
import Connect from "../Connect";

const Header = () => {
  const { state } = useEth();

  return (
    <header>
      <div className="Header_title_container">
        <h1>VOTARCY</h1>
      </div>
      <Connect state={state} />
    </header>
  );
};

export default Header;
