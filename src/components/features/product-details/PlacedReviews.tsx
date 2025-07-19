import { useState } from "react";
import { FaStar, FaThumbsUp } from "react-icons/fa";
// import ReplyField from "./ReplyField";
// import { useContextSelector } from "use-context-selector";
// import { AuthContext } from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";

type Props = {
  reviews: string[];
  username?: string;
};

const PlacedReviews = ({ reviews, username }: Props) => {
  const [like, setLike] = useState(false);
  // const [reply, setReply] = useState(false);
  // const [replyVal, setReplyVal] = useState("");
  // const isAuthenticated = useContextSelector(
  //   AuthContext,
  //   (ctx) => ctx?.isAuthenticated
  // );
  // const navigate = useNavigate();

  // const handleReplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setReplyVal(e.target.value);
  // };
  // const handleReplySubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!isAuthenticated) {
  //     navigate("/sign-in");
  //     return;
  //   }
  //   if (replyVal.trim() === "") {
  //     return;
  //   }

  //   setReplyVal("");
  // };

  return reviews.length <= 0 ? (
    <div className="text-text text-xl text-center">No Reviews Placed</div>
  ) : (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex gap-4 pb-4 border-b border-soft-gray">
        <div
          className={`bg-accentA rounded-full w-10 h-10 flex-center text-neutral text-[18px]`}
        >
          AO
        </div>
        <div className="flex flex-col">
          <h3 className="">{username}</h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <p className="text-text text-sm mt-2 w-[25rem] lg:w-[32rem]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus error iure modi facere veritatis iusto nihil ipsam
            nesciunt fuga sunt earum impedit, sapiente odio blanditiis eveniet
            est numquam itaque magnam.
          </p>

          <div className="flex items-center gap-5 mt-3">
            {/* <button
              className="cursor-pointer text-text font-medium text-sm hover:text-primary duration-200"
              onClick={() => setReply((prev) => !prev)}
            >
              Reply
            </button> */}
            <button
              className={`cursor-pointer ${
                like
                  ? "text-primary"
                  : "text-text hover:text-primary duration-200"
              } font-medium text-sm`}
              onClick={() => setLike((prev) => !prev)}
            >
              <FaThumbsUp />
            </button>
          </div>

          {/* {reply && (
            <ReplyField
              value={replyVal}
              onChange={handleReplyChange}
              onSubmit={handleReplySubmit}
            />
          )} */}
        </div>
      </div>
    </section>
  );
};

export default PlacedReviews;
