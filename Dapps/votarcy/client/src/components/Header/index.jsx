import useEth from "../../contexts/EthContext/useEth";
import Profile from "../Profile";

const Header = () => {
  const { state } = useEth();

  return (
    <header>
      <div className="Header_title_container">
        <h1>VOTARCY</h1>
      </div>
      <Profile state={state} />
    </header>
  );
};

export default Header;
