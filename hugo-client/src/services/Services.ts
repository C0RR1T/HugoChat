import UserServiceImpl from "./user/UserServiceImpl";
import UserServiceMock from "./_mock/UserServiceMock";
import RoomServiceMock from "./room/RoomServiceMock";
import MessageServiceMock from "./_mock/MessageServiceMock";

const userService = new UserServiceMock();
const messageService = new MessageServiceMock();
const roomService = new RoomServiceMock();

export {userService, messageService, roomService};