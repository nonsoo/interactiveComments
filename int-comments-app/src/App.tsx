import "./styles/layout.css";
import "./styles/Comps/CommentBlock.css";
import { useEffect, useState } from "react";

import Comment from "./components/Comment";

import { responseObj } from "./utils/types/projectTypes";

import fetchData from "./utils/helpers/fetchdata";

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

  console.log(resData);

  const commentBlocks = resData?.comments;

  return (
    <div className="App">
      {commentBlocks?.map((comment) => (
        <section className="commentBlock" key={comment.id}>
          <Comment
            userName={comment.user.username}
            userImg={comment.user.image.png}
            postDate={comment.createdAt}
            rating={comment.score}
            content={comment.content}
          />
          <div className="commentReplies">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                userName={reply.user.username}
                userImg={reply.user.image.png}
                postDate={reply.createdAt}
                rating={reply.score}
                content={reply.content}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
