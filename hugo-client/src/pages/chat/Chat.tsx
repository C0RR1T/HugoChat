import React, {useEffect} from 'react';
import Messages, {MessageProps} from "./Messages";
import Members from "./Members";
import UserServiceImpl from "../../services/user/UserServiceImpl";
import MessageServiceImpl from "../../services/message/MessageServiceImpl";
import MessageServiceMock from "../../services/message/MessageServiceMock";
import UserServiceMock from "../../services/user/UserServiceMock";

const DEFAULT_NAME = "corsin";

const messageService = new MessageServiceImpl();
const userService = new UserServiceImpl();

interface ChatState {
    name: string,
    userID: string,
    onlineMembers: string[],
    messages: MessageProps[],
    lastCheckedMessage: string | undefined
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            lastCheckedMessage: undefined
        }
    }

    componentDidMount() {

        const userGet = userService.getUsers();
        const messageGet = messageService.getLatestMessages(20).then(msg => {
            console.log(msg);
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
                            lastCheckedMessage: messages[messages.length - 1].id
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

    handleSSE(event: MessageEvent) {
        console.log(event.data);
        if (event.data === "new messages") {
            if (this.state.lastCheckedMessage) {
                messageService.getNewMessages(this.state.lastCheckedMessage).then(newMessages => {
                    if (newMessages.length > 0) {
                        const messages = this.state.messages.concat(messageService.dtoToProps(newMessages, this.state.userID));
                        this.setState({
                            messages,
                            lastCheckedMessage: newMessages[newMessages.length - 1].id
                        });
                    }
                });
            } else {
                messageService.getLatestMessages(50).then(newMessages => {
                    if (newMessages.length > 0) {
                        const messages = this.state.messages.concat(messageService.dtoToProps(newMessages, this.state.userID));
                        this.setState({
                            messages,
                            lastCheckedMessage: newMessages[newMessages.length - 1].id
                        });
                    }
                })
            }
        } else if (event.data === "userlist changed") {
            userService.getUsers().then(users => {
                const members = userService.userDTOtoString(users, this.state.userID);
                this.setState({
                    onlineMembers: members
                });
            });
        }
    }

    render() {
        return (
            <div className="parent">
                <Messages messages={this.state.messages} sendHandler={content => {
                    if (content !== "") {
                        messageService.createMessage({
                            sentBy: this.state.name,
                            sentByID: this.state.userID,
                            body: content,
                            id: "",
                            sentOn: 0
                        }).catch(r => alert("You are writing too fast"));
                    }
                }}/>
                <Members selfName={this.state.name} members={this.state.onlineMembers}
                         nameChangeHandler={name => {
                             if (name.length < 255) {
                                 userService.changeName({
                                     id: this.state.userID,
                                     username: name
                                 }).then(r => this.setState({name}));
                             } else {
                                 alert(`Name too long: ${name.length}. Must be less than 255 characters`)
                             }
                         }}
                         sseHandler={event => this.handleSSE(event)}/>
            </div>
        );
    }
}


export default Chat;
