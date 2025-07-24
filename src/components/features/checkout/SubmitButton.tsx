interface SubmitButtonProps {
  loading: boolean;
  total: number;
  stripeAvailable: boolean;
}

const SubmitButton = ({
  loading,
  total,
  stripeAvailable,
}: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={!stripeAvailable || loading}
    className={`w-full py-3 rounded-lg text-white font-semibold cursor-pointer ${
      loading
        ? "bg-soft-gray cursor-not-allowed"
        : "bg-primary relative overflow-hidden group"
    }`}
  >
    {loading ? "جارٍ المعالجة..." : `ادفع ${total} ج.م`}
    <span className="shine-effect group-hover:animate-shine" />
  </button>
);

export default SubmitButton;
