import "./styles/layout.css";
import "./styles/Comps/CommentBlock.css";
import "./styles/Comps/Modal.css";
import { useEffect, useState } from "react";

import Comment from "./components/Comment";

import { responseObj } from "./utils/types/projectTypes";

import fetchData from "./utils/helpers/fetchdata";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [resData, setResData] = useState<responseObj>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp: responseObj = await fetchData(
          "http://localhost:5001/api/users"
        );
        setResData(resp);
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []);

  const commentBlocks = resData?.comments;

  return (
    <div className="App">
      {commentBlocks?.map((comment, index) => (
        <section className="commentBlock" key={`${comment.id}-${uuidv4()}`}>
          <Comment
            userName={comment.user.username}
            userImg={comment.user.image.png}
            postDate={comment.createdAt}
            rating={comment.score}
            content={comment.content}
            myComment={resData?.currentUser.username === comment.user.username}
            userID={comment.id}
            currUser={resData?.currentUser}
            setResp={setResData}
            commentIndex={index}
            toggleDelete={() => setDeleteModal(true)}
          />
          <div className="commentReplies">
            {comment.replies.map((reply, index) => (
              <Comment
                key={`${reply.id}-${uuidv4()}`}
                userName={reply.user.username}
                userImg={reply.user.image.png}
                postDate={reply.createdAt}
                rating={reply.score}
                content={reply.content}
                myComment={
                  resData?.currentUser.username === reply.user.username
                }
                userID={reply.id}
                currUser={resData?.currentUser}
                setResp={setResData}
                commentIndex={index}
                toggleDelete={() => setDeleteModal(true)}
              />
            ))}
          </div>
        </section>
      ))}

      {deleteModal && (
        <div className="deleteModalCon">
          <div className="deletModal">
            <p className="deleteModal__Title">Delete comment</p>
            <p className="deleteModal__Description">
              Are you sure you want to delete this comment? This will remove the
              comment and it cannot be undone.
            </p>
            <div className="deleteModal__BtnsCon">
              <button
                className="deleteModal__Btn"
                onClick={() => setDeleteModal(false)}
              >
                No, Cancel
              </button>
              <button className="deleteModal__Btn">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
