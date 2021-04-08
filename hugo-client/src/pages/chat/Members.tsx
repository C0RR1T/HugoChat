import React, {useRef, useState} from "react";

type NameChangeHandler = (nam: string) => void

interface MembersProps {
    selfName: string,
    members: string[],
    nameChangeHandler: NameChangeHandler
}

const Members = (props: MembersProps) => {
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