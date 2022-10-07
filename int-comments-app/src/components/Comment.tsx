import { FC, useState } from "react";
import { CommentProp } from "../utils/types/projectTypes";
import "../styles/Comps/Comp.css";

import { MdReply, MdEdit, MdDelete } from "react-icons/md";

const Comment: FC<CommentProp> = ({
  userName,
  userImg,
  postDate,
  rating,
  content,
}) => {
  const [commentRating, setCommentRating] = useState<number>(rating);

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
          <img src={userImg} alt="" className="commentUser__Img" />
          <p className="commentUser__Name">{userName}</p>
          <p className="commentUser__day">{postDate}</p>
        </div>

        <p className="comment__Comment">{content}</p>
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
