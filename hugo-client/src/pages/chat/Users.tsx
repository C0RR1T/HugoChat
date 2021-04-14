import React, {useRef, useState} from "react";

type NameChangeHandler = (nam: string) => void
type SSEHandler = (event: MessageEvent) => void

interface UsersProps {
    selfName: string,
    users: string[],
    nameChangeHandler: NameChangeHandler,
    sseHandler: SSEHandler
}

const Users = (props: UsersProps) => {

    const [listening, setListening] = useState(false);
    let eventSource: EventSource;

    /*useEffect(() => {
        if (!listening) {
            eventSource = new EventSource(BASE_URL + "/update");

            eventSource.onmessage = (event) => {
                props.sseHandler(event);
            }

            eventSource.onerror = () => {
                eventSource.close();
            }

            setListening(true);
        }

        return () => eventSource.close();
    }, [])*/


    return (
        <div className="users">
            <SelfUser name={props.selfName} nameChangeHandler={props.nameChangeHandler}/>
            {props.users.map((n, i) => <User name={n} key={i}/>)}
        </div>
    )
}


interface UserProps {
    name: string,
}


const User = (props: UserProps) =>
    <div className="user">
        <div className="name">{props.name}</div>
    </div>

interface SelfUserProps {
    name: string,
    nameChangeHandler: NameChangeHandler
}

const SelfUser = (props: SelfUserProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");

    const inputRef = useRef<HTMLInputElement>(null)

    const editing =
        <input onKeyPress={event => {
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
        <div className="user self" onClick={_ => {
            setIsEditing(true);
            setContent(props.name);
        }}>
            {inner}
        </div>
    );
}

export default Users;
export type {UserProps};