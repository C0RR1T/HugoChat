import "./Chat.scss"
import React, {useState} from "react";

let messageList: JSX.Element[] = [];


const Chat = () => {
    const [messages, setMessages] = useState(messageList);

    return (
        <div>
            <div className="messages">
                {messages}
                <Message author="Timo Nicolas Angst" content="ich bin timo"/>
                <Message author="hugo" content="hallo corsin"/>
                <Message author="corsin" content="hallo" own/>
                <Message author="hugo" content="hallo
        mein name ist hugo boss
        lol wenn ich hier ganz viel schreibe sollte es wrappen
        -----------------------------------------------------
        successful wrap completed"/>
                <Message author="corsin" content="das muss ich selbst testen
            -----------------------------------
            -----------------------------------
            -----------------------------------
            -----------------------------------
            -----------------------------------
            -----------------------------------
            -----------------------------------
            ----------------------------------- oh stimmt es wrapped Hecht
            (der spell checker wollte Hecht aus echt machen)" own/>
            </div>
            <InputField submitHandler={content => {
                console.log(content);
                messageList.push(<Message author="corsin" content="f" own/>);
                setMessages(messageList);
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


for (let i = 0; i < 0; i++) {
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
