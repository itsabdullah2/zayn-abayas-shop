import QuoteSection from "../QuoteSection";
import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <section className="section-container">
      <div className="w-full bg-neutral grid grid-cols-1 md:grid-cols-2 rounded-3xl">
        <SignInForm />
        <QuoteSection />
      </div>
    </section>
  );
};

export default SignIn;
