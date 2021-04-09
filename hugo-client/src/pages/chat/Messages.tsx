import "../../App.scss"
import React, {useEffect, useRef, useState} from "react";

interface MessagesProps {
    messages: MessageProps[],
    sendHandler: SubmitHandler;
}

const Messages = (props: MessagesProps) => {

    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ref = messageRef.current;
        if (ref && ref.getBoundingClientRect().bottom <= window.innerHeight) {
            ref.scrollIntoView({behavior: "smooth"});
        }
    });


    const messages = props.messages.map(msg => <Message {...msg} key={msg.timestamp + msg.author}/>);

    return (
        <div className="text-chat">
            <div className="messages">
                {messages}
                <div ref={messageRef}/>
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
    timestamp: number
    own?: boolean
}

const Message = (props: MessageProps) =>
    <div className={props.own ? "message own-message" : "message"}>
        <div className="author">{props.author}</div>
        <div className="time">{formatDateTime(new Date(props.timestamp))}</div>
        <div className="content">{props.content}</div>
    </div>

function formatDateTime(d: Date): string {
    let string = "";
    if (d.getDate() === new Date().getDate()) {
        string += "Today ";
    } else if (d.getDate() === new Date().getDate() - 1) {
        string += "Yesterday "
    } else {
        string += d.toLocaleDateString();
    }
    string += formatZero(d.getHours()) + ":" + formatZero(d.getMinutes());
    return string;
}

function formatZero(n: number): string {
    return `${n < 10 ? "0" : "" + n}`;
}

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


export default Messages;
export type {MessageProps};