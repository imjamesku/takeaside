type UserResource = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}

export type TopicEssentialData = {
    id: number;
    question: string;
}

export type UserResourceWithTopics = UserResource & {
    topics: Array<TopicEssentialData>;
}
export default UserResource