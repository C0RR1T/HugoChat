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
    userID?: string,
    onlineMembers: string[],
    messages: MessageProps[]
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);
        const userCreate = userService.createUser({
            name: DEFAULT_NAME
        }).then(r => {
            this.setState({
                userID: r.uuid
            });
            return r.uuid;
        });
        userService.getUsers().then(r => this.setState({
            onlineMembers: r
        }))
        messageService.getAllMessages().then(r => {
            Promise.all([userCreate]).then(id => {
                this.setState({
                    messages: messageService.dtoToProps(r, (id[0] || ""))
                })
            });
        })
        this.state = {
            name: DEFAULT_NAME,
            onlineMembers: [],
            messages: []
        }
    }

    changeMembers(members: string[]) {
        this.setState({
            onlineMembers: members
        })
    }

    changeMessages(messages: MessageProps[]) {
        this.setState({
            messages: messages
        })
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