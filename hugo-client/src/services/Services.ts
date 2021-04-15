import UserServiceImpl from "./user/UserServiceImpl";
import UserServiceMock from "./_mock/UserServiceMock";
import RoomServiceMock from "./_mock/RoomServiceMock";
import MessageServiceMock from "./_mock/MessageServiceMock";
import MessageServiceImpl from "./message/MessageServiceImpl";
import RoomServiceImpl from "./room/RoomServiceImpl";
import UserService from "./user/UserService";
import MessageService from "./message/MessageService";
import RoomService from "./room/RoomService";

const mocking = false;

const userService: UserService = mocking ? new UserServiceMock() : new UserServiceImpl();
const messageService: MessageService = mocking ? new MessageServiceMock() : new MessageServiceImpl();
const roomService: RoomService = mocking ? new RoomServiceMock() : new RoomServiceImpl();

export {userService, messageService, roomService};