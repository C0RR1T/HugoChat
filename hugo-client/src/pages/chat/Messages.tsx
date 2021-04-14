import "../../App.scss"
import React, {useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import MessageServiceMock from "../../services/mock/MessageServiceMock";
import MessageDTO from "../../services/message/model/MessageDTO";

const messageService = new MessageServiceMock();

interface MessagesProps {
    sendHandler: SubmitHandler,
    userId: string,
    roomId: string
    scroll: boolean,
}

const Messages = (props: MessagesProps) => {

    const [firstScroll, setFirstScroll] = useState(false);
    const [messages, setMessages] = useState<MessageDTO[]>([]);

    const messageRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const ref = messageRef.current;
        if (ref && ref.getBoundingClientRect().bottom <= window.innerHeight && props.scroll) {
            ref.scrollIntoView();
        }

        if (!firstScroll && ref) {
            ref.scrollIntoView();
            setFirstScroll(true);
        }
    });

    useEffect(() => {
        messageService.getLatestMessages(props.roomId, 20).then(
            msg => setMessages(msg)
        );
    }, [props.roomId]);

    return (
        <div className="text-chat">
            <div className="messages">
                <LoadMoreButton loadHandler={() => {
                    messageService.getMessagesBefore(props.roomId, messages[0].id, 20).then(msg => {
                        msg.push(...messages);
                        setMessages(msg);
                    })
                }}/>
                {messageService.dtoToProps(messages, props.userId).map(msg => <Message {...msg} key={msg.id}/>)}
                <div ref={messageRef}/>
            </div>
            <InputField submitHandler={content => {
                if (messageRef.current && props.scroll) {
                    messageRef.current.scrollIntoView();
                }
                props.sendHandler(content);
            }}/>
        </div>
    );
}

interface MessageProps {
    author: string,
    content: string,
    timestamp: number
    own?: boolean,
    id: string
}

const Message = (props: MessageProps) =>
    <div className={props.own ? "message own-message" : "message"}>
        <div className="author">{props.author}</div>
        <div className="time">{formatDateTime(new Date(props.timestamp))}</div>
        <ReactMarkdown className="content">{props.content}</ReactMarkdown>
    </div>

function formatDateTime(d: Date): string {
    let string = "";
    if (d.getDate() === new Date().getDate()) {
        string += "Today";
    } else if (d.getDate() === new Date().getDate() - 1) {
        string += "Yesterday"
    } else {
        string += d.toLocaleDateString();
    }
    string += " " + formatZero(d.getHours()) + ":" + formatZero(d.getMinutes());
    return string;
}

function formatZero(n: number): string {
    return `${(n < 10 ? "0" : "") + n}`;
}

interface LoadMoreButtonProps {
    loadHandler: (() => void)
}

const LoadMoreButton = (props: LoadMoreButtonProps) => {

    return (
        <div className="button-wrapper">
            <button className="load-button" onClick={props.loadHandler}>
                Load More
            </button>
        </div>
    )
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