import UserResource from "./UserResource";

export default interface Comment {
    id: number;
    user: UserResource;
    content: string;
    subcommentCount: number;
    createdAt: Date;
    editedAt: Date;
}