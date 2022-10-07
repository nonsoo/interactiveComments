import { FC, useState } from "react";
import "../styles/Comps/Comp.css";

import { MdReply, MdEdit, MdDelete } from "react-icons/md";

import ProfileImg from "../Imgs/avatars/image-amyrobson.png";

const Comment: FC = () => {
  const [commentRating, setCommentRating] = useState<number>(12);

  const onIncrement = () => {
    setCommentRating((prev) => prev + 1);
  };

  const onDecrement = () => {
    if (commentRating > 0) {
      setCommentRating((prev) => prev - 1);
    }
  };
  return (
    <section className="commentCon">
      <div className="rating">
        <p className="rating__Rate" onClick={() => onIncrement()}>
          +
        </p>
        <p className="rating__number">{commentRating}</p>
        <p className="rating__Rate" onClick={() => onDecrement()}>
          -
        </p>
      </div>

      <div className="comment">
        <div className="commentUser">
          <img src={ProfileImg} alt="" className="commentUser__Img" />
          <p className="commentUser__Name">amyrobson</p>
          <p className="commentUser__day">1 month ago</p>
        </div>

        <p className="comment__Comment">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ipsum,
          voluptates esse molestias ad tempora? Minus nulla eligendi quas,
          mollitia temporibus veritatis nemo laboriosam, optio molestiae, cumque
          animi distinctio aliquam?
        </p>
      </div>

      <div className="options">
        {true ? (
          <div className="UserOptions">
            <div className="UserOptions__Delete">
              <MdDelete className="UserOptions__Delete--Icon" />
              <span className="UserOptions__Delete--Text">Delete</span>
            </div>
            <div className="UserOptions__Edit">
              <MdEdit className="UserOptions__Delete--Icon" />
              <span className="UserOptions__Delete--Text">Edit</span>
            </div>
          </div>
        ) : (
          <div className="replyBtn">
            <MdReply />
            <span className="replyBtn__text">Reply</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comment;
