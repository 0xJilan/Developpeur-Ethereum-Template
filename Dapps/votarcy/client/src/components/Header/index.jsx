import Profile from "../Profile";
import Events from "../Events";
import Status from "../Status";

const Header = ({ props }) => {
  return (
    <header>
      <Profile props={props} />
      <Status props={props} />
      <Events props={props} />
    </header>
  );
};

export default Header;
