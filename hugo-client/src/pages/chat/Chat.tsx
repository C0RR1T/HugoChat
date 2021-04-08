import React from 'react';
import Messages, {MessageProps} from "./Messages";
import Members from "./Members";
import UserServiceImpl from "../../services/user/UserServiceImpl";
import MessageServiceImpl from "../../services/message/MessageServiceImpl";
import MessageServiceMock from "../../services/message/MessageServiceMock";
import UserServiceMock from "../../services/user/UserServiceMock";

const DEFAULT_NAME = "corsin";

const messageService = new MessageServiceMock();
const userService = new UserServiceMock();

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

        const userGet = userService.getUsers();
        const messageGet = messageService.getAllMessages();

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
            });

            setInterval(() => {
                messageService.getNewMessages(this.state.lastMsgCheck).then(newMessages => {
                    const messages = this.state.messages.concat(messageService.dtoToProps(newMessages, selfId));
                    this.setState({messages});
                });

                this.setState({
                    lastMsgCheck: Date.now()
                });

            }, 500);
        });

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            lastMsgCheck: Date.now()
        }
    }

    render() {
        return (
            <div className="parent">
                <Messages messages={this.state.messages} sendHandler={s => console.log(s)}/>
                <Members selfName={this.state.name} members={this.state.onlineMembers}
                         nameChangeHandler={name => this.setState({name})}/>
            </div>
        );
    }

}

export default Chat;