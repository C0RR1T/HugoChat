import React from 'react';
import Messages from "./Messages";
import Users from "./Users";
import {Rooms} from "./Room";
import UserDTO from "../../services/user/model/UserDTO";
import {userService} from "../../services/Services";

const DEFAULT_NAME = "Hugo Boss";

interface ChatState {
    user: UserDTO
    windowWidth: number,
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
            currentRoom: "00000000-0000-0000-0000-000000000000"
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

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

    handleRoomChange = (roomId: string) => {
        this.setState({
            currentRoom: roomId
        });
    }


    render() {
        return (
            <div className="parent">
                <Rooms
                    current={this.state.currentRoom}
                    roomChangeHandler={(id) => {
                        this.handleRoomChange(id);
                    }}
                />
                <Messages scroll={true}
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