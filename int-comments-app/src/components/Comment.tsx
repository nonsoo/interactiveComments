import { FC, useState, useEffect } from "react";
import { CommentProp } from "../utils/types/projectTypes";
import "../styles/Comps/Comp.css";

import { MdReply, MdEdit, MdDelete } from "react-icons/md";

import ProfImg from "../Imgs/avatars/image-amyrobson.png";

const Comment: FC<CommentProp> = ({
  userName,
  userImg,
  postDate,
  rating,
  content,
  myComment,
}) => {
  const [commentRating, setCommentRating] = useState<number>(rating);
  const [userImgImport, setUserImgImport] = useState<any>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyStatus, setReplyStatus] = useState<boolean>(false);

  useEffect(() => {
    if (userImg) {
      import(`../Imgs/avatars/${userImg}`)
        .then((res) => setUserImgImport(res.default))
        .catch((err) => console.error(err));
    }
  }, [userImg]);

  const onIncrement = () => {
    setCommentRating((prev) => prev + 1);
  };

  const onDecrement = () => {
    if (commentRating > 0) {
      setCommentRating((prev) => prev - 1);
    }
  };
  const onSubmitForm = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
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
            <img src={userImgImport} alt="" className="commentUser__Img" />
            <p className="commentUser__Name">{userName}</p>
            {myComment && <p className="commentUser__currUser">you</p>}
            <p className="commentUser__day">{postDate}</p>
          </div>

          <p className="comment__Comment">{content}</p>
        </div>

        <div className="options">
          {myComment ? (
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
            <div className="replyBtn" onClick={() => setReplyStatus(true)}>
              <MdReply />
              <span className="replyBtn__text">Reply</span>
            </div>
          )}
        </div>
      </section>

      {replyStatus && (
        <form className="replyBox" onSubmit={onSubmitForm}>
          <img src={ProfImg} alt="myProfilePic" className="replyBox__Img" />
          <textarea
            className="replyBox__TextArea"
            value={replyMessage}
            onChange={(e) => {
              setReplyMessage(e.target.value);
            }}
          />
          <input type="submit" className="replyBox__Submit" value="Reply" />
        </form>
      )}
    </>
  );
};

export default Comment;
