import { Link } from "react-router-dom";
import LogoTagline from "../images/LOGO_Tagline.png";

export default function Header() {
  return (
    <div className="UpperNavbar">
      <img className="loginlogo1" src={LogoTagline} alt="Icon" />\
      <Link to="/dashboard">
        <button className="btn btn-dark btn-lg"> Dashboard</button>
      </Link>
      <Link to="/dashboard">
        {" "}
        <i class="fa-solid fa-gear fa-xl"></i>
      </Link>
      <Link to="/user">
        {" "}
        <i class="fa-solid fa-user fa-xl"></i>
      </Link>
    </div>
  );
}
