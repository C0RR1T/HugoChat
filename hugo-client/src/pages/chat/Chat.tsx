import React, {useEffect} from 'react';
import Messages, {MessageProps} from "./Messages";
import Members from "./Members";
import UserServiceImpl from "../../services/user/UserServiceImpl";
import MessageServiceImpl from "../../services/message/MessageServiceImpl";
import MessageServiceMock from "../../services/message/MessageServiceMock";
import UserServiceMock from "../../services/user/UserServiceMock";
import UserDTO from "../../services/user/model/UserDTO";
import MessageDTO from "../../services/message/model/MessageDTO";
import {receiveMessageOnPort} from "worker_threads";

const DEFAULT_NAME = "Hugo Boss";

const messageService = new MessageServiceMock();
const userService = new UserServiceMock();

interface ChatState {
    name: string,
    userID: string,
    onlineMembers: string[],
    messages: MessageProps[],
    oldestMessageId: string | undefined
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            oldestMessageId: undefined
        }
    }

    componentDidMount() {

        const userGet = userService.getUsers();
        const messageGet = messageService.getLatestMessages(20).then(msg => {
            return msg;
        });

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

    handleSSE = (event: MessageEvent) => {
        const eventData = JSON.parse(event.data);
        const eventType: string = eventData.type;

        if (eventType === "message") {
            const data: MessageDTO = eventData.data;
            console.log(data);
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
            sentOn: 0
        }).catch(_ => alert("You are writing too fast"));
    }

    handleMessageLoad = async () => {
        if (!this.state.oldestMessageId){
            return;
        }
        const olderMessagesDTOs = await messageService.getOldMessages(this.state.oldestMessageId);

        if (olderMessagesDTOs.length === 0){
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
                <Messages messages={this.state.messages}
                          sendHandler={this.handleSend}
                          loadMessageHandler={this.handleMessageLoad}/>
                <Members selfName={this.state.name} members={this.state.onlineMembers}
                         nameChangeHandler={this.handleNameChange}
                         sseHandler={event => this.handleSSE(event)}/>
            </div>
        );
    }
}


export default Chat;
