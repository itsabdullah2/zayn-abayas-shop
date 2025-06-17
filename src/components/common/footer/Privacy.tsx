import { privacyFooterLinks } from "@/constants/footerLinks";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="uppercase text-[0.875rem] text-neutral font-medium mb-2">
        privacy
      </li>
      {privacyFooterLinks.map((item, i) => (
        <li
          key={i}
          className="text-text hover:underline hover:text-neutral duration-200"
        >
          <Link to={item.path}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Privacy;
