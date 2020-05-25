import Option from "./Option"
import Comment from "./Comment"

type Topic = {
    id: number;
    userName: string;
    question: string;
    left: Option;
    right: Option;
    commentCount: number;
    createdAt: Date;
}

export default Topic