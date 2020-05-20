import Option from "./Option"

type Topic = {
    id: string;
    userName: string;
    question: string;
    left: Option;
    right: Option;
}

export default Topic