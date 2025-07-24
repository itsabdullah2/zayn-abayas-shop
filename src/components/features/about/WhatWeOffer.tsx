const WhatWeOffer = () => {
  return (
    <section className="">
      <div className="section-container">
        <h2 className="text-primary font-bold text-3xl mb-5">ماذا نقدم؟</h2>
        <p>
          نُقدم في <strong>زين عباءات</strong> مجموعة مختارة من العباءات
          الرجالية الرسمية واليومية، بتصاميم عصرية وهُوية واضحة:
        </p>
        <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5 lg:gap-6 xl:gap-10 mt-5">
          {/* <div></div> */}
          <li className="text-primary font-medium text-[17px]">
            عباءات للدوام والعمل
          </li>
          <li className="text-primary font-medium text-[17px]">
            عباءات المناسبات
          </li>
          <li className="text-primary font-medium text-[17px]">
            عباءات بيضاء وسوداء
          </li>
          <li className="text-primary font-medium text-[17px]">
            تفصيل خاص حسب المقاسات (قريبًا)
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhatWeOffer;
