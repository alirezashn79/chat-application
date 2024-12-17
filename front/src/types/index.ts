import { User, NewUser } from "../../../back/src/db/schemas/user";
import { Message, NewMessage } from "../../../back/src/db/schemas/message";

export enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}
export type NotificationType = { senderId: string; count: number };
export type { User, NewUser, Message, NewMessage };
