import logo from "../../assets/images/logo-matchlive.jpeg";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__container">
        
        {/* Logo */}
        <div className="navbar__logo">
          <img src="/logo.png" alt="MATCH&LIVE" />
        </div>

        {/* Links */}
        <nav className="navbar__nav">
          <a href="#features" className="navbar__link">Features</a>
          <a href="#how-it-works" className="navbar__link">How It Works</a>
          <a href="#testimonials" className="navbar__link">Testimonials</a>
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <button className="btn btn--primary">Get Started</button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;