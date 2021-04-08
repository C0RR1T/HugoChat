import React from 'react';
import Chat, {MessageProps} from "./Chat";
import Members from "./Members";


let members = ["hugo", "timo nicolas angst", "noel", "schiel", "gebhardt", "rolf", "Michi", "dragon99", "Cyrill", "Joey Rüegg", "Mark Zuckerberg"];
let messages = [{author: "Timo Nicolas Angst", content: "ich bin timo"},
    {author: "hugo", content: "hallo corsin"}, {author: "corsin", content: "hallo", own: true},
    {
        author: "hugo", content: "hallo\n" +
            "        mein name ist hugo boss\n" +
            "        lol wenn ich hier ganz viel schreibe sollte es wrappen\n" +
            "        -----------------------------------------------------"
    }]


interface AppState {
    name: string,
    onlineMembers: string[],
    messages: MessageProps[]
}

class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: "corsin",
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
                <Chat messages={this.state.messages} sendHandler={s => console.log(s)}/>
                <Members selfName="corsin" members={members}/>
            </div>
        );
    }

}

export default App;