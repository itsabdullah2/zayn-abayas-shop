import { aboutUsFooterLinks } from "@/constants/footerLinks";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="uppercase text-[0.875rem] text-txt-light font-medium mb-2">
        about us
      </li>
      {aboutUsFooterLinks.map((item, i) => (
        <li
          key={i}
          className="text-accent hover:underline hover:text-txt-light duration-200"
        >
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default AboutUs;
