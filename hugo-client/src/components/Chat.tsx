import "../App.scss"
import React, {useState} from "react";

let messageList: JSX.Element[] = [];

interface ChatProps {
    messages: MessageProps[],
    sendHandler: SubmitHandler;
}
const Chat = (props: ChatProps) => {
    return (
        <div>
            <div className="messages">
                {props.messages.map(msg => <Message author={msg.author} content={msg.content} own={msg.own}/>)}
            </div>
            <InputField submitHandler={content => {
                props.sendHandler(content);
            }}/>
        </div>
    );
}


interface MessageProps {
    author: string,
    content: string,
    own?: boolean
}

const Message = (props: MessageProps) =>
    <div className="message"
         style={(props.own) ? {backgroundColor: "#37465c"} : {}}>
        <div className="author">{props.author}</div>
        <div className="content">{props.content}</div>
    </div>


for (let i = 0; i < 100; i++) {
    messageList.push(<Message author="hugo" content="hallo corsin"/>);
}
//setInterval(() => messageList.push(<Message author="corsin" content="hallo hugo" own/>), 500)


type SubmitHandler = (content: string) => void

interface InputFieldProps {
    submitHandler: SubmitHandler
}

const InputField = (props: InputFieldProps) => {
    const [content, setContent] = useState("");

    return (
        <input onKeyPress={event => {
            if (event.key === "Enter") {
                props.submitHandler(content);
                setContent("");
            }
        }}
               onChange={event => setContent(event.target.value)}
               type="text"
               className="input-field"
               value={content}
               placeholder="Type your message..."/>
    );
}


export default Chat;
export type { MessageProps };