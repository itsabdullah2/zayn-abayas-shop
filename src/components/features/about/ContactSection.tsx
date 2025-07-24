import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { RiInstagramFill, RiTwitterFill, RiYoutubeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <section className="py-10 px-6 bg-neutral text-primary text-center">
      <div className="section-container ">
        <h2 className="text-xl font-semibold flex justify-center items-center gap-2 mb-4">
          <FaPhoneAlt className="text-lg text-primary" />
          تواصل معنا
        </h2>

        <p>نرحب بكل استفساراتك واقتراحاتك، ويسعدنا دائمًا خدمتك.</p>

        <p className="flex justify-center items-center gap-2 mt-2">
          <FaEnvelope className="text-lg text-primary" />
          support@zaynabayas.com
        </p>

        <p className="mt-1 mb-2">تابعنا على منصات التواصل الاجتماعي</p>

        <div className="flex justify-center gap-4 text-primary text-lg">
          <Link
            to="/"
            className="text-text hover:hover:text-primary duration-200"
          >
            <RiYoutubeFill size={25} />
          </Link>
          <Link
            to="/"
            className="text-text hover:hover:text-primary duration-200"
          >
            <RiInstagramFill size={25} />
          </Link>
          <Link
            to="/"
            className="text-text hover:hover:text-primary duration-200"
          >
            <RiTwitterFill size={25} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
