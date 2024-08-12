import { StatusType } from "../enums/StatusType";

export interface CreatePostDto {
    id: string;
    title: string;
    content: string;
    userId: string;
    status: StatusType;
    createAt: Date;
    imageUrl: string;
    likes: number;
    comments: number;
}