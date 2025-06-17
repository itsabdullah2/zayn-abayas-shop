import { servicesFooterLinks } from "@/constants/footerLinks";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="uppercase text-[0.875rem] text-neutral font-medium mb-2">
        services
      </li>
      {servicesFooterLinks.map((item, i) => (
        <li
          key={i}
          className="text-text hover:underline hover:hover:text-neutral duration-200"
        >
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Services;
