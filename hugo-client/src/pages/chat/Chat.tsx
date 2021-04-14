import React from 'react';
import Messages from "./Messages";
import Users from "./Users";
import MessageServiceMock from "../../services/mock/MessageServiceMock";
import UserServiceMock from "../../services/mock/UserServiceMock";
import {Rooms} from "./Room";
import RoomServiceMock from "../../services/room/RoomServiceMock";
import RoomDTO from "../../services/room/model/RoomDTO";

const DEFAULT_NAME = "Hugo Boss";

const messageService = new MessageServiceMock();
const userService = new UserServiceMock();
const roomService = new RoomServiceMock();

interface ChatState {
    name: string,
    userID: string,
    oldestMessageId: string | undefined,
    windowWidth: number,
    rooms: RoomDTO[],
    currentRoom: string
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            oldestMessageId: undefined,
            windowWidth: 0,
            rooms: [],
            currentRoom: "00000000-0000-0000-0000-000000000000"
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        roomService.getAll().then(rooms => this.setState({
            rooms
        }));

        userService.createUser({
            name: DEFAULT_NAME,
            id: ""
        }).then(r => {
            this.setState({
                userID: r.id || ""
            });
            return r.id || "";
        }).then(selfId => {
            setInterval(() => userService.keepActive(this.state.currentRoom, selfId), 5000);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        const windowWidth = window !== undefined ? window.innerWidth : 0;
        this.setState({windowWidth});
    }

    handleNameChange = (name: string) => {
        if (name.length < 255) {
            userService.changeName({
                id: this.state.userID,
                name: name
            }).then(r => this.setState({name}));
        } else {
            alert(`Name too long: ${name.length}. Must be less than 255 characters`)
        }

    }

    handleSend = (content: string) => {
        if (content === "") {
            return;
        }
        if (content.length > 1000) {
            alert("Message too long, must be less than 1000 characters");
            return;
        }
        messageService.createMessage({
            sentBy: this.state.name,
            sentByID: this.state.userID,
            body: content,
            id: "",
            sentOn: 0,
            roomId: "00000000-0000-0000-0000-000000000000"
        }).catch(_ => alert("You are writing too fast"));
    }

    handleRoomChange = async (roomId: string) => {
        this.setState({
            currentRoom: roomId
        });
    }


    render() {
        return (
            <div className="parent">
                <Rooms
                    rooms={this.state.rooms.map(dto => {
                        return {
                            id: dto.id,
                            name: dto.name,
                            roomChangeHandler: (id) => {
                                this.handleRoomChange(id);
                            }
                        }
                    })}
                    current={this.state.currentRoom}
                />
                <Messages sendHandler={this.handleSend}
                          scroll={this.state.windowWidth > 768}
                          userId={this.state.userID}
                          roomId={this.state.currentRoom}
                />
                <Users
                    selfUser={{
                        id: this.state.userID,
                        name: this.state.name
                    }}
                    nameChangeHandler={this.handleNameChange}
                    roomId={this.state.currentRoom}
                />
            </div>
        );
    }
}

export default Chat;
