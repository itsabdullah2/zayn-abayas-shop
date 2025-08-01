import { PRIVACY_FOOTER_LINKS } from "@/constants";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="text-[0.875rem] text-neutral font-medium mb-2">
        الخصوصية
      </li>
      {PRIVACY_FOOTER_LINKS.map((item, i) => (
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
