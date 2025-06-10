import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import SearchInput from "./SearchInput";

const SearchPopup = () => {
  const handleCloseSearchPopup = useContextSelector(
    AppContext,
    (ctx) => ctx?.handleCloseSearchPopup
  );

  return (
    <>
      <div className="absolute bg-black/70 top-0 left-0 w-full h-full z-90" />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 bg-background text-primary py-8 px-5 rounded-xl w-[95vw] sm:w-[40.625rem] h-[28.125rem] max-h-[37.5rem] overflow-y-auto `}
      >
        <div className="flex flex-col gap-5">
          <SearchInput />

          <ul className="flex flex-col gap-3">
            <li className="odd:bg-light-gray/50 even:bg-light-gray py-4 px-2 rounded-lg h-fit">
              <Link to="#" className="flex flex-col">
                <h3 className="font-medium text-black">First Result</h3>
                <p className="text-gray text-sm">
                  {/* Condition here to handle the number of characters if the length of the desc > 80 character will render 80 characters with => ... */}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corporis, maiores!
                </p>
              </Link>
            </li>
          </ul>
        </div>

        <Button
          role="button"
          size="sm"
          className="bg-gray/30 text-black border border-gray absolute top-2 right-5 cursor-pointer hover:bg-gray/60 hover:text-white duration-200"
          onClick={handleCloseSearchPopup}
        >
          Esc
        </Button>
      </div>
    </>
  );
};

export default SearchPopup;
