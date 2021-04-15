import "../../App.scss"
import React, {RefObject, useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router-dom";
import MessageDTO from "../../services/message/model/MessageDTO";
import UserDTO from "../../services/user/model/UserDTO";
import formatDateTime from "../../util/FormatDateTime";
import {BASE_URL} from "../../services/AxiosUtility";
import {messageService} from "../../services/Services";

interface MessagesProps {
    user: UserDTO
    scroll: boolean,
}

const Messages = (props: MessagesProps) => {

    const [firstScroll, setFirstScroll] = useState(false);
    const [messages, setMessages] = useState<MessageDTO[]>([]);

    const {roomId} = useParams() as any;

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
    }, [firstScroll, props.scroll]);

    useEffect(() => {
        messageService.getLatestMessages(roomId, 20).then(
            msg => setMessages(msg)
        );
    }, [roomId]);

    useEffect(() => {
        let eventSource = new EventSource(BASE_URL + `/rooms/${roomId}/update`);

        eventSource.onmessage = (event: MessageEvent<string>) => {
            const data: { type: string, data: any } = JSON.parse(event.data);

            if (data.type === "message") {
                const newMsg = [...messages, data.data];
                setMessages(newMsg);
            }
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, [roomId, messages])

    return (
        <div className="text-chat">
            <div className="messages">
                <LoadMoreButton loadHandler={() => {
                    if (messages[0]) {
                        messageService.getMessagesBefore(roomId, messages[0].id, 20).then(msg => {
                            msg.push(...messages);
                            setMessages(msg);
                        })
                    }
                }}/>
                {messageService.dtoToProps(messages, props.user.id).map(msg => <Message {...msg} key={msg.id}/>)}
                <div ref={messageRef}/>
            </div>
            <InputField submitHandler={content => submitHandler(content, messageRef, props, roomId)}/>
        </div>
    );
}


const submitHandler = (content: string, messageRef: RefObject<HTMLDivElement>, props: MessagesProps, roomId: string) => {
    if (content.length > 1000) {
        alert("Message too long, must be less than 1000 characters");
        return;
    }
    if (messageRef.current && props.scroll) {
        messageRef.current.scrollIntoView();
    }
    messageService.createMessage(roomId, {
        sentBy: props.user.name,
        sentByID: props.user.id,
        body: content,
        id: "",
        sentOn: 0,
    }).catch(e => {
        //this is probably 'you're sending messages too fast'
        alert(e.message);
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