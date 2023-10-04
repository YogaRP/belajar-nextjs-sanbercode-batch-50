import Menu from "../menu";
import { withAuth } from "../with-auth";

const Header = () => {
  return (
    <>
      <Menu />
    </>
  );
};

export default withAuth(Header);
