import React from 'react';
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
    lastMsgCheck: number
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            lastMsgCheck: Date.now()
        }
    }

    componentDidMount() {

        const userGet = userService.getUsers();
        const messageGet = messageService.getOldMessages();

        userService.createUser({
            username: DEFAULT_NAME
        }).then(r => {
            this.setState({
                userID: r.id || ""
            });
            return r.id || "";
        }).then(selfId => {

            messageGet.then(messages =>
                this.setState({
                    messages: messageService.dtoToProps(messages, selfId)
                })
            );

            userGet.then(users =>
                this.setState({
                    onlineMembers: userService.userDTOtoString(users, selfId || "")
                })
            );

            setInterval(() => {
                userService.getUsers().then(users => {
                    const members = userService.userDTOtoString(users, selfId || "");
                    this.setState({
                        onlineMembers: members
                    });
                });
            }, 1000);

            setInterval(() => {
                messageService.getNewMessages(this.state.lastMsgCheck).then(newMessages => {
                    const messages = this.state.messages.concat(messageService.dtoToProps(newMessages, selfId));
                    this.setState({messages});
                });

                this.setState({
                    lastMsgCheck: Date.now()
                });

            }, 500);

            setInterval(() => userService.keepActive(selfId), 5000);
        });
    }

    render() {
        return (
            <div className="parent">
                <Messages messages={this.state.messages} sendHandler={content => messageService.createMessage({
                    sentBy: this.state.name,
                    sentOn: Date.now(),
                    sentByID: this.state.userID,
                    body: content,
                    id: ""
                })}/>
                <Members selfName={this.state.name} members={this.state.onlineMembers}
                         nameChangeHandler={name => {
                             userService.changeName({
                                 id: this.state.userID,
                                 username: name
                             }).then(r => this.setState({name}));

                         }}/>
            </div>
        );
    }

}

export default Chat;