import { User } from "./user";



export interface Post{
    _id ? : string
    author? : User
    createdDate? : Date;
    imageUrl? : string;
    description? : string;
    like? : Array<User>
}