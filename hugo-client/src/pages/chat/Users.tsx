import React, {useEffect, useRef, useState} from "react";
import UserServiceMock from "../../services/mock/UserServiceMock";
import UserDTO from "../../services/user/model/UserDTO";
import {BASE_URL} from "../../services/AxiosUtility";

type NameChangeHandler = (nam: string) => void

const userService = new UserServiceMock();

interface UsersProps {
    selfUser: UserDTO,
    nameChangeHandler: NameChangeHandler,
    roomId: string
}

const Users = (props: UsersProps) => {

    const [users, setUsers] = useState<UserDTO[]>([]);

    useEffect(() => {
        userService.getUsers(props.roomId).then(users => {
            setUsers(userService.filterUserDTO(users, props.selfUser.id));
        });
    }, [props.roomId]);

    let eventSource: EventSource;

    useEffect(() => {
        eventSource = new EventSource(BASE_URL + `/rooms/${props.roomId}/update`);

        eventSource.onmessage = (event: MessageEvent<UserDTO[]>) => {
            setUsers(event.data);
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, [])

    return (
        <div className="users">
            <SelfUser name={props.selfUser.name} nameChangeHandler={props.nameChangeHandler}/>
            {users.map(n => <User name={n.name} key={n.id}/>)}
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