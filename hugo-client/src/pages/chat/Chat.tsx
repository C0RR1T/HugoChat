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
        const userCreate = userService.createUser({
            username: DEFAULT_NAME
        }).then(r => {
            this.setState({
                userID: r.id || ""
            });
            return r.id;
        });

        const userGet = userService.getUsers().then(r => {
            Promise.all([userCreate]).then(_ => {
                this.setState({
                    onlineMembers: userService.userDTOtoString(r, this.state.userID || "")
                });
            });
        });

        messageService.getAllMessages().then(r => {
            Promise.all([userCreate]).then(id => {
                this.setState({
                    messages: messageService.dtoToProps(r, (id[0] || ""))
                })
            });
        })

        this.state = {
            userID: "",
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: [],
            lastMsgCheck: Date.now()
        }

        setInterval(() => {
            messageService.getNewMessages(this.state.lastMsgCheck).then(newMessages => {
                const messages = this.state.messages.concat(messageService.dtoToProps(newMessages, this.state.userID));
                this.setState({messages});
            });

            this.setState({
                lastMsgCheck: Date.now()
            })

        }, 500);

        Promise.all([userCreate]).then(_ => {
            setInterval(() => {
                userService.getUsers().then(users => {
                    const members = userService.userDTOtoString(users, this.state.userID || "");
                    this.setState({
                        onlineMembers: members
                    });
                });
            });
        });

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