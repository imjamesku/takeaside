import Topic from "./Topic"

type TopicPageResponse = {
    topicResourceList: Array<Topic>;
    nextOffset: number;
}

export default TopicPageResponse