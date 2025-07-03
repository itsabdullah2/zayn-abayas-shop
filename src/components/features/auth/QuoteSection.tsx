const QuoteSection = () => {
  return (
    <div className="relative p-8 bg-gradient-to-br from-primary via-accentA to-accentB rounded-2xl m-4">
      <h5 className="absolute top-4 left-8 text-xs text-light-gray">
        A Wise Quote
      </h5>
      <div className="h-full flex flex-col justify-end">
        <h1 className="text-large md:text-5xl font-serif text-neutral mb-4">
          Get Everything You Want
        </h1>
        <p className="text-light-gray text-sm">
          You can get everything you want if you work hard, trust the process,
          and stick to the plan.
        </p>
      </div>
    </div>
  );
};

export default QuoteSection;
