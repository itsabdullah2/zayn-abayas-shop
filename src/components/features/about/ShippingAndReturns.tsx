import { FaExchangeAlt, FaHeadset, FaTruck } from "react-icons/fa";

const ShippingAndReturns = () => {
  const shippingData = [
    {
      icon: <FaTruck size={30} className="text-xl text-accentA mb-2" />,
      text: "الشحن السريع لجميع مدن [اكتب الدولة أو الدول] خلال [عدد] أيام عمل.",
    },
    {
      icon: <FaExchangeAlt size={30} className="text-xl text-accentA mb-2" />,
      text: "الاستبدال متاح خلال 7 أيام من استلام الطلب في حال وجود خطأ في المقاس أو المنتج.",
    },
    {
      icon: <FaHeadset size={30} className="text-xl text-accentA mb-2" />,
      text: "فريق الدعم جاهز لخدمتك على مدار الأسبوع.",
    },
  ];

  return (
    <section className="py-10 px-6">
      <div className="section-container">
        <h2 className="text-primary font-bold text-3xl mb-5">
          الشحن والاستبدال
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6 xl:gap-10">
          {shippingData.map((item, index) => (
            <li
              key={index}
              className="flex flex-col gap-1 items-center bg-neutral p-5 shadow hover:shadow-lg duration-200"
            >
              {item.icon}
              <p className="text-center text-sm text-gray">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShippingAndReturns;
