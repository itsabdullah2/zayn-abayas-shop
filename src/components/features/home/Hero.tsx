import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[url(\hero-img.jpeg)] w-full h-screen bg-center bg-cover relative">
      <div className="absolute bg-black/40 w-full h-full z-10" />

      <div className="flex flex-col items-center absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-neutral font-bold text-5xl text-center">
          Wear Power. Wear Zayn.
        </h1>
        <p className="text-light-gray/70 mt-2 text-center">
          Luxury abayas that blend timeless Saudi heritage with
          <br /> contemporary design — crafted for today’s man.
        </p>

        <Link
          to="/shop"
          className="relative group overflow-hidden primary-btn w-fit mt-2 shadow-lg"
        >
          <span className="relative z-10 text-[15px]">Shop Collection</span>

          {/* Scanner Shine */}
          <span className="shine-effect group-hover:animate-shine" />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
