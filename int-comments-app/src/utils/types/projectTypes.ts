export interface CommentProp {
  userName: string;
  userImg: string;
  postDate: string;
  rating: number;
  content: string;
  myComment: boolean;
  userID: number;
  currUserImg: string | undefined;
  setResp?: any;
}

export interface user {
  image: {
    png: string;
    webp: string;
  };
  username: string;
}

export interface reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: user;
}

export interface comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: user;
  replies: reply[];
}

export interface responseObj {
  currentUser: user;
  comments: comment[];
}
