const LoadingOrError = ({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}) => {
  if (loading) {
    return (
      <p className="text-text absolute-center">
        Product is Loading. Please wait:)
      </p>
    );
  }

  if (error) {
    return <p className="text-red-500 absolute-center">{error}</p>;
  }
  return null;
};

export default LoadingOrError;
