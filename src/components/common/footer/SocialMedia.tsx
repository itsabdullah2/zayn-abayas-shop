import { Link } from "react-router-dom";

import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";

const SocialMedia = () => {
  return (
    <ul className={`flex flex-col gap-2`}>
      <li className="uppercase text-[0.875rem] text-neutral font-medium mb-2">
        social media
      </li>
      <li className="flex items-center gap-2">
        <Link to="/" className="text-text hover:text-secondary duration-200">
          <RiYoutubeFill size={25} />
        </Link>
        <Link to="/" className="text-text hover:text-secondary duration-200">
          <RiInstagramFill size={25} />
        </Link>
        <Link to="/" className="text-text hover:text-secondary duration-200">
          <RiTwitterFill size={25} />
        </Link>
      </li>
    </ul>
  );
};

export default SocialMedia;
