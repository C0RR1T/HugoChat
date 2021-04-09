import React, {useEffect, useRef, useState} from "react";
import {MessageProps} from "./Messages";

type NameChangeHandler = (nam: string) => void
type NewMembersHandler = (event: MessageEvent) => void

interface MembersProps {
    selfName: string,
    members: string[],
    nameChangeHandler: NameChangeHandler,
    newMembersHandler: NewMembersHandler
}

const Members = (props: MembersProps) => {

    const [listening, setListening] = useState(false);
    let eventSource: EventSource;

    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource("http://localhost:8080/users");

            eventSource.onopen = (_) => {
                console.log("connection opened");
            };

            eventSource.onmessage = (event) => {
                console.log("result: " + event.data);
                props.newMembersHandler(event);
            };

            eventSource.onerror = (event) => {
                console.log("error");
                eventSource.close();
            }
        }

        return () => {
            eventSource.close();
            console.log("closed");
        }
    }, []);

    setListening(true);

    return (
        <div className="members">
            <SelfMember name={props.selfName} nameChangeHandler={props.nameChangeHandler}/>
            {props.members.map((n, i) => <Member name={n} key={i}/>)}
        </div>
    )
}


interface MemberProps {
    name: string,
}


const Member = (props: MemberProps) =>
    <div className="member">
        <div className="name">{props.name}</div>
    </div>

interface SelfMemberProps {
    name: string,
    nameChangeHandler: NameChangeHandler
}

const SelfMember = (props: SelfMemberProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");

    const inputRef = useRef<HTMLInputElement>(null)

    const editing =
        <input onKeyPress={event => {
            console.log(event.key);
            if (event.key === "Enter") {
                setIsEditing(false);
                props.nameChangeHandler(content);
            }
        }}
               ref={inputRef}
               onChange={event => setContent(event.target.value)}
               type="text"
               value={content}
               onBlur={_ => setIsEditing(false)}
               autoFocus={true}
        />;

    const showing = <div className="name">
        {props.name}
    </div>;

    const inner = isEditing ? editing : showing;

    return (
        <div className="member self" onClick={_ => {
            setIsEditing(true);
            setContent(props.name);
        }}>
            {inner}
        </div>
    );
}


export default Members;
export type {MemberProps};
