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
    className={`w-full py-3 rounded text-white font-semibold transition-all ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-primary hover:bg-primary/90"
    }`}
  >
    {loading ? "Processing..." : `Pay ${total} E.L`}
  </button>
);

export default SubmitButton;
