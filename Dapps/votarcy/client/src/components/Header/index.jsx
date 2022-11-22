import Profile from "../Profile";
import Events from "../Events";

const Header = ({ props }) => {
  return (
    <header>
      <Profile props={props} />
      <Events props={props} />
    </header>
  );
};

export default Header;
