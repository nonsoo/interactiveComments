import { FC, useState, useEffect } from "react";
import { CommentProp, reply } from "../utils/types/projectTypes";
import "../styles/Comps/Comp.css";

import postData from "../utils/helpers/postData";

import { MdReply, MdEdit, MdDelete } from "react-icons/md";

const Comment: FC<CommentProp> = ({
  userName,
  userImg,
  postDate,
  rating,
  content,
  myComment,
  userID,
  currUser,
  setResp,
}) => {
  const [commentRating, setCommentRating] = useState<number>(rating);
  const [userImgImport, setUserImgImport] = useState<any>("");
  const [currUserImgImport, setCurrUserImgImport] = useState<any>("");
  const [replyMessage, setReplyMessage] = useState<string>("");
  const [replyStatus, setReplyStatus] = useState<boolean>(false);
  const [onUpdateState, setOnUpdateState] = useState<boolean>(false);

  useEffect(() => {
    if (userImg) {
      import(`../Imgs/avatars/${userImg}`)
        .then((res) => setUserImgImport(res.default))
        .catch((err) => console.error(err));
    }

    if (currUser) {
      import(`../Imgs/avatars/${currUser.image.png}`)
        .then((res) => setCurrUserImgImport(res.default))
        .catch((err) => console.error(err));
    }
  }, [userImg, currUser]);

  const onIncrement = () => {
    setCommentRating((prev) => prev + 1);
  };

  const onDecrement = () => {
    if (commentRating > 0) {
      setCommentRating((prev) => prev - 1);
    }
  };

  const onUpdate = () => {
    setOnUpdateState(true);
    setReplyStatus(false);
  };

  const onSubmitForm = async (e: any, route: string) => {
    e.preventDefault();

    if (replyMessage === "") return;

    if (currUser) {
      const newReply: reply = {
        id: userID,
        content: replyMessage,
        createdAt: "1 minute ago change",
        score: 3,
        replyingTo: "change",
        user: currUser,
      };
      try {
        let data: { status: number; data: any } | undefined;
        if (route === "http://localhost:5001/api/reply") {
          data = await postData(route, {
            comment: newReply,
          });
        }

        if (data?.status === 200) {
          setResp(data.data.data);
        }

        setReplyStatus(false);
        setReplyMessage("");
      } catch (e) {
        console.error(e);
      }
    }
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

          {onUpdateState ? (
            <form
              className="updateBox"
              onSubmit={(e) =>
                onSubmitForm(e, "http://localhost:5001/api/reply")
              }
            >
              <textarea
                className="updateBox__TextArea"
                value={replyMessage}
                onChange={(e) => {
                  setReplyMessage(e.target.value);
                }}
              />
              <input
                type="submit"
                className="updateBox__Submit"
                value="Update"
              />
            </form>
          ) : (
            <p className="comment__Comment">{content}</p>
          )}
        </div>

        <div className="options">
          {myComment ? (
            <>
              {!onUpdateState && (
                <div className="UserOptions">
                  <div className="UserOptions__Delete">
                    <MdDelete className="UserOptions__Delete--Icon" />
                    <span className="UserOptions__Delete--Text">Delete</span>
                  </div>
                  <div className="UserOptions__Edit" onClick={() => onUpdate()}>
                    <MdEdit className="UserOptions__Delete--Icon" />
                    <span className="UserOptions__Delete--Text">Edit</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="replyBtn" onClick={() => setReplyStatus(true)}>
              <MdReply />
              <span className="replyBtn__text">Reply</span>
            </div>
          )}
        </div>
      </section>

      {replyStatus && (
        <form
          className="replyBox"
          onSubmit={(e) => onSubmitForm(e, "http://localhost:5001/api/reply")}
        >
          <img
            src={currUserImgImport}
            alt="myProfilePic"
            className="replyBox__Img"
          />
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
