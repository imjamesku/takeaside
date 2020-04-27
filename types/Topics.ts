export type TopicOption = {
    name: string;
    users: string[];
}

export type Topic = {
    question: string;
    firstOption: TopicOption;
    secondOption: TopicOption;
}