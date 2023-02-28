import { Navbar } from "flowbite-react";
import  { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div>
      <Navbar fluid={true} className="bg-blue-50">
        <Navbar.Brand href="/">
          <img src="https://image.makewebeasy.net/makeweb/m_200x200/m14BHwk4P/Home/clicknext_logo2x.png?v=202012190947" className="mr-3 h-6 sm:h-9" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link to={'/'} className="mr-4">
          <Link to={'/Login'}>Logout</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Nav;
