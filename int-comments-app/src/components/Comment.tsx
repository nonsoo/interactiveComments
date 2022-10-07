import { FC } from "react";
import "../styles/Comps/Comp.css";

import { MdReply } from "react-icons/md";

import ProfileImg from "../Imgs/avatars/image-amyrobson.png";

const Comment: FC = () => {
  return (
    <section className="commentCon">
      <div className="rating">
        <p className="rating__Rate">+</p>
        <p className="rating__number">12</p>
        <p className="rating__Rate">-</p>
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
        <MdReply />
        <span className="replyBtn__text">Reply</span>
      </div>
    </section>
  );
};

export default Comment;
