import { SERVICES_FOOTER_LINKS } from "@/constants";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="text-[0.875rem] text-neutral font-medium mb-2">
        الخدمات
      </li>
      {SERVICES_FOOTER_LINKS.map((item, i) => (
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
