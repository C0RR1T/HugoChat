import React from 'react';
import Messages, {MessageProps} from "./Messages";
import Members from "./Members";
import UserDTO from "../../services/user/model/UserDTO";
import MessageDTO from "../../services/message/model/MessageDTO";
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
    onlineMembers: string[],
    messages: MessageProps[],
    oldestMessageId: string | undefined,
    windowWidth: number,
    rooms: RoomDTO[]
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            oldestMessageId: undefined,
            windowWidth: 0,
            rooms: []
        }
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        const userGet = userService.getUsers();
        const messageGet = messageService.getLatestMessages("main", 20).then(msg => {
            return msg;
        });

        roomService.getAll().then(rooms => this.setState({
            rooms
        }))

        userService.createUser({
            username: DEFAULT_NAME
        }).then(r => {
            this.setState({
                userID: r.id || ""
            });
            return r.id || "";
        }).then(selfId => {

            messageGet.then(messages => {
                    this.setState({
                        messages: messageService.dtoToProps(messages, selfId),
                    });
                    if (messages.length > 0) {
                        this.setState({
                            oldestMessageId: messages[0].id
                        });
                    }
                }
            );
            userGet.then(users =>
                this.setState({
                    onlineMembers: userService.userDTOtoString(users, selfId || "")
                })
            );

            setInterval(() => userService.keepActive(selfId), 5000);
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        const windowWidth = window !== undefined ? window.innerWidth : 0;
        this.setState({windowWidth});
    }

    handleSSE = (event: MessageEvent) => {
        const eventData = JSON.parse(event.data);
        const eventType: string = eventData.type;

        if (eventType === "message") {
            const data: MessageDTO = eventData.data;
            const messageProps = messageService.dtoToProps([data], this.state.userID)[0];
            const messages1 = [...this.state.messages, messageProps];

            this.setState({
                messages: messages1,
            });
        } else if (eventType === "users") {
            const data: UserDTO[] = eventData.data;
            this.setState({
                onlineMembers: data.filter(u => u.id !== this.state.userID).map(u => u.username)
            });
        }
    }

    handleNameChange = (name: string) => {
        if (name.length < 255) {
            userService.changeName({
                id: this.state.userID,
                username: name
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
            roomId: "main"
        }).catch(_ => alert("You are writing too fast"));
    }

    handleMessageLoad = async () => {
        if (!this.state.oldestMessageId) {
            return;
        }
        const olderMessagesDTOs = await messageService.getMessagesBefore("main", this.state.oldestMessageId, 50);

        if (olderMessagesDTOs.length === 0) {
            return;
        }

        this.setState({
            oldestMessageId: olderMessagesDTOs[0].id
        });

        const olderMessages = messageService.dtoToProps(olderMessagesDTOs, this.state.userID);

        const messages = [...olderMessages, ...this.state.messages];

        this.setState({
            messages
        });
    }


    render() {
        return (
            <div className="parent">
                <Rooms rooms={this.state.rooms.map(dto => {
                    return {
                        id: dto.id,
                        name: dto.name,
                        roomChangeHandler: () => {
                        }
                    }
                })}/>
                <Messages messages={this.state.messages}
                          sendHandler={this.handleSend}
                          loadMessageHandler={this.handleMessageLoad}
                          scroll={this.state.windowWidth > 768}/>
                <Members selfName={this.state.name} members={this.state.onlineMembers}
                         nameChangeHandler={this.handleNameChange}
                         sseHandler={event => this.handleSSE(event)}/>
            </div>
        );
    }
}


export default Chat;
