import { StatusType } from "../enums/StatusType";


export interface CommentInfoDto {
    id: string;
    userId: string;
    postId: string;
    content: string;
    status: StatusType;
    createAt: Date;
    updateAt: Date;
}