import UserServiceImpl from "./user/UserServiceImpl";
import UserServiceMock from "./_mock/UserServiceMock";
import RoomServiceMock from "./_mock/RoomServiceMock";
import MessageServiceMock from "./_mock/MessageServiceMock";
import MessageServiceImpl from "./message/MessageServiceImpl";
import RoomServiceImpl from "./room/RoomServiceImpl";

const mocking = false;

const userService = mocking ? new UserServiceMock() : new UserServiceImpl();
const messageService = mocking ? new MessageServiceMock() : new MessageServiceImpl();
const roomService = mocking ? new RoomServiceMock() : new RoomServiceImpl();

export {userService, messageService, roomService};