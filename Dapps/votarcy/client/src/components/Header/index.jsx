import Profile from "../Profile";
import Events from "../Events";
import Error from "../Error";
import Status from "../Status";

const Header = ({ props }) => {
  return (
    <header>
      <Profile props={props} />
      <Status props={props} />
      <Events props={props} />
      <Error props={props} />
    </header>
  );
};

export default Header;
