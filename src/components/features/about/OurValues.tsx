import { FaCheckCircle, FaFeatherAlt, FaHandshake } from "react-icons/fa";
import { RiSettings4Line } from "react-icons/ri";

const OurValues = () => {
  const values = [
    {
      title: "الجودة بلا تنازل",
      desc: "نستخدم خامات عالية الجودة تضمن الراحة والمتانة.",
      icon: <FaCheckCircle size={30} className="mb-2 text-accentA" />,
    },
    {
      title: "الأصالة في التصميم",
      desc: "نحافظ على الهوية العربية ونواكب العصر.",
      icon: <FaFeatherAlt size={30} className="mb-2 text-accentA" />,
    },
    {
      title: "ثقة العملاء",
      desc: "نحرص على تقديم تجربة تسوق سهلة وآمنة ترضي جميع عملائنا.",
      icon: <FaHandshake size={30} className="mb-2 text-accentA" />,
    },
    {
      title: "الاحترافية في التفاصيل",
      desc: "من اختيار القماش إلى التغليف، كل شيء محسوب بعناية.",
      icon: <RiSettings4Line size={30} className="mb-2 text-accentA" />,
    },
  ];

  return (
    <section className="bg-neutral">
      <div className="section-container">
        <h2 className="text-primary font-bold text-3xl mb-5">قيمنا</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-10">
          {values.map((val, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-1 items-center bg-light-gray p-5 shadow hover:shadow-lg duration-200"
            >
              {val.icon}
              <h3 className="h3">{val.title}</h3>
              <p className="text-center text-sm text-gray">{val.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurValues;
