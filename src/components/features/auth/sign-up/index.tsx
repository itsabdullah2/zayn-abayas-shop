import QuoteSection from "../QuoteSection";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <section className="section-container">
      <div className="w-full bg-neutral grid grid-cols-1 md:grid-cols-2 rounded-3xl">
        <QuoteSection />
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
