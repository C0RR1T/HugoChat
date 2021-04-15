import "../../App.scss"
import React, {RefObject, useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import MessageDTO from "../../services/message/model/MessageDTO";
import UserDTO from "../../services/user/model/UserDTO";
import formatDateTime from "../../util/FormatDateTime";
import {BASE_URL} from "../../services/AxiosUtility";
import {messageService} from "../../services/Services";

interface MessagesProps {
    user: UserDTO
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
    }, [firstScroll]);

    useEffect(() => {
        messageService.getLatestMessages(props.roomId, 20).then(
            msg => setMessages(msg)
        );
    }, [props.roomId]);

    useEffect(() => {
        let eventSource = new EventSource(BASE_URL + `/rooms/${props.roomId}/update`);

        eventSource.onmessage = (event: MessageEvent<string>) => {
            const data: {type: string, data: any} = JSON.parse(event.data);

            if (data.type === "message") {
                const newMsg = [...messages, data.data];
                setMessages(newMsg);
            }
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, [props.roomId, messages])

    return (
        <div className="text-chat">
            <div className="messages">
                <LoadMoreButton loadHandler={() => {
                    if (messages[0]) {
                        messageService.getMessagesBefore(props.roomId, messages[0].id, 20).then(msg => {
                            msg.push(...messages);
                            setMessages(msg);
                        })
                    }
                }}/>
                {messageService.dtoToProps(messages, props.user.id).map(msg => <Message {...msg} key={msg.id}/>)}
                <div ref={messageRef}/>
            </div>
            <InputField submitHandler={content => submitHandler(content, messageRef, props)}/>
        </div>
    );
}


const submitHandler = (content: string, messageRef: RefObject<HTMLDivElement>, props: MessagesProps) => {
    if (content.length > 1000) {
        alert("Message too long, must be less than 1000 characters");
        return;
    }
    if (messageRef.current && props.scroll) {
        messageRef.current.scrollIntoView();
    }
    messageService.createMessage(props.roomId, {
        sentBy: props.user.name,
        sentByID: props.user.id,
        body: content,
        id: "",
        sentOn: 0,
    }).catch(err => {
        //TODO better error messages
        alert("You are writing too fast");
    });
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

interface InputFieldProps {
    submitHandler: ((content: string) => void),
}

const InputField = (props: InputFieldProps) => {
    const [content, setContent] = useState("");

    return (
        <input onKeyPress={event => {
            if (event.key === "Enter" && content !== "") {
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