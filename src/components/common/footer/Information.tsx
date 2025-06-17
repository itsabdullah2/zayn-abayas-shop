import { informationFooterLinks } from "@/constants/footerLinks";
import { Link } from "react-router-dom";

const Information = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="uppercase text-[0.875rem] text-neutral font-medium mb-2">
        information
      </li>
      {informationFooterLinks.map((item, i) => (
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

export default Information;
