const PriceRow = ({
  label,
  value,
  isDiscount,
}: {
  label: string;
  value: string;
  isDiscount?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-text font-medium">{label}</span>
      <span
        className={isDiscount ? "text-red-600" : "text-primary font-medium"}
      >
        ج.م {value}
      </span>
    </div>
  );
};

export default PriceRow;
