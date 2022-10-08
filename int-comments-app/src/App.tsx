import "./styles/layout.css";
import "./styles/Comps/CommentBlock.css";
import { useEffect, useState } from "react";

import Comment from "./components/Comment";

import { responseObj } from "./utils/types/projectTypes";

import fetchData from "./utils/helpers/fetchdata";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [resData, setResData] = useState<responseObj>();

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
      {commentBlocks?.map((comment) => (
        <section className="commentBlock" key={`${comment.id}-${uuidv4()}`}>
          <Comment
            userName={comment.user.username}
            userImg={comment.user.image.png}
            postDate={comment.createdAt}
            rating={comment.score}
            content={comment.content}
            myComment={resData?.currentUser.username === comment.user.username}
            userID={comment.id}
            currUserImg={resData?.currentUser.image.png}
            setResp={setResData}
          />
          <div className="commentReplies">
            {comment.replies.map((reply) => (
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
                currUserImg={resData?.currentUser.image.png}
                setResp={setResData}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
