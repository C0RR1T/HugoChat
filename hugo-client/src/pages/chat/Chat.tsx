import React from 'react';
import Messages, {MessageProps} from "./Messages";
import Members from "./Members";
import UserServiceImpl from "../../services/user/UserServiceImpl";
import MessageServiceImpl from "../../services/message/MessageServiceImpl";

const DEFAULT_NAME = "corsin";

const messageService = new MessageServiceImpl();
const userService = new UserServiceImpl();

let members = ["hugo", "timo nicolas angst", "noel", "schiel", "gebhardt", "rolf", "Michi", "dragon99", "Cyrill", "Joey Rüegg", "Mark Zuckerberg"];
let messages = [{author: "Timo Nicolas Angst", content: "ich bin timo"},
    {author: "hugo", content: "hallo corsin"}, {author: "corsin", content: "hallo", own: true},
    {
        author: "hugo", content: "hallo\n" +
            "        mein name ist hugo boss\n" +
            "        lol wenn ich hier ganz viel schreibe sollte es wrappen\n" +
            "        -----------------------------------------------------"
    }]


interface ChatState {
    name: string,
    userID?: string,
    onlineMembers: string[],
    messages: MessageProps[]
}

class Chat extends React.Component<{}, ChatState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: DEFAULT_NAME,
            onlineMembers: members,
            messages: messages
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

    componentDidMount() {
        setInterval(() => {
            members.push("cors");
    this.changeMembers(members);
}, 1000);
setInterval(() => {
    messages.push({author: "dragon99", content: "spam"});
    this.changeMessages(messages);
}, 500);
}

render() {
    return (
        <div className="parent">
            <Messages messages={this.state.messages} sendHandler={s => console.log(s)}/>
            <Members selfName={this.state.name} members={members} nameChangeHandler={name => this.setState({name})}/>
        </div>
    );
}

}

export default Chat;