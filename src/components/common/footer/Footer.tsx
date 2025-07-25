import Privacy from "./Privacy";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Information from "./Information";
import SocialMedia from "./SocialMedia";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary min-h-52 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <Link to="/">
            <h2 className="text-neutral text-2xl font-bold">زين عباءات</h2>
          </Link>
          <Privacy />

          <Services />

          <AboutUs />

          <Information />

          <SocialMedia />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
