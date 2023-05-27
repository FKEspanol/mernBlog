import {} from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-10 py-5 bg-primary">
      <div className="my-container">
        <div className="flex justify-between items-center">
          <a
            href=""
            className="text-white text-xl md:text-2xl font-semibold uppercase"
          >
            Hello World
          </a>
          <nav className="grid grid-flow-col gap-x-5">
            <Link to="/" className="nav-link">
              Sign In
            </Link>
            <Link to="/signUp" className="nav-link">
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
