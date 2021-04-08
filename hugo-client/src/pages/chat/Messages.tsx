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
        if (ref && ref.getBoundingClientRect().bottom <= window.innerHeight + 100) {
            ref.scrollIntoView({behavior: "smooth"});
        }
    });

    return (
        <div>
            <div className="messages">
                {props.messages.map(msg => <Message author={msg.author} content={msg.content} own={msg.own}/>)}
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
    own?: boolean
}

const Message = (props: MessageProps) =>
    <div className={props.own ? "message own-message" : "message"}>
        <div className="author">{props.author}</div>
        <div className="content">{props.content}</div>
    </div>


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