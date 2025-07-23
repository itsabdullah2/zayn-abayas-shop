const QuoteSection = () => {
  return (
    <div className="relative p-8 bg-gradient-to-br from-primary via-accentA to-accentB rounded-2xl m-4">
      <h5 className="absolute top-4 right-8 text-xs text-light-gray">
        اقتباس حكيم
      </h5>
      <div className="h-full flex flex-col justify-end">
        <h1 className="text-large md:text-5xl font-serif text-neutral mb-4">
          احصل على كل ما تريد
        </h1>
        <p className="text-light-gray text-sm">
          يمكنك الحصول على كل ما تريد إذا عملت بجد، وثقت في الخطواط، والتزمت
          بالخطة.
        </p>
      </div>
    </div>
  );
};

export default QuoteSection;
