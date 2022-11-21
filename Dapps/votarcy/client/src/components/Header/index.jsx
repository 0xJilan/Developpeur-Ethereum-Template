import useEth from "../../contexts/EthContext/useEth";

const Header = () => {
  const { state } = useEth();

  return (
    <header>
      <div className="Header_title_container">
        <h1>VOTARCY</h1>
      </div>
    </header>
  );
};

export default Header;
