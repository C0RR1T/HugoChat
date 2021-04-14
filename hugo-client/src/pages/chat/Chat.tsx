import React from 'react';
import Messages from "./Messages";
import Users from "./Users";
import UserServiceMock from "../../services/_mock/UserServiceMock";
import {Rooms} from "./Room";
import RoomServiceMock from "../../services/room/RoomServiceMock";
import RoomDTO from "../../services/room/model/RoomDTO";
import UserDTO from "../../services/user/model/UserDTO";

const DEFAULT_NAME = "Hugo Boss";

const userService = new UserServiceMock();
const roomService = new RoomServiceMock();

interface ChatState {
    user: UserDTO
    windowWidth: number,
    rooms: RoomDTO[],
    currentRoom: string
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            user: {
                name: DEFAULT_NAME,
                id: ""
            },
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

        userService.createUser(DEFAULT_NAME).then(user => {
            this.setState({user});
            setInterval(() => userService.keepActive(this.state.currentRoom, user.id), 5000);
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
                id: this.state.user.id,
                name: name
            }).then(user => this.setState({user}));
        } else {
            alert(`Name too long: '${name.length}'. Must be less than 255 characters`)
        }

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
                <Messages scroll={this.state.windowWidth > 768}
                          user={this.state.user}
                          roomId={this.state.currentRoom}
                />
                <Users
                    user={this.state.user}
                    nameChangeHandler={this.handleNameChange}
                    roomId={this.state.currentRoom}
                />
            </div>
        );
    }
}

export default Chat;
