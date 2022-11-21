import useEth from "../../contexts/EthContext/useEth";

const Voting = () => {
  const { state } = useEth();

  return !state.accounts ? (
    <main>
      <div className="Header_title_container">
        <h1>WELCOME TO VOTARCY</h1>
      </div>
      <div className="Header_section">
        <p>Please Connect to your wallet to access dapp.</p>
      </div>
    </main>
  ) : (
    <div className="container">
      <p>Hello fren!</p>
    </div>
  );
};

export default Voting;
