import React, {useEffect, useRef, useState} from "react";
import UserDTO from "../../services/user/model/UserDTO";
import {BASE_URL} from "../../services/AxiosUtility";
import {userService} from "../../services/Services";


interface UsersProps {
    user: UserDTO,
    nameChangeHandler: NameChangeHandler,
    roomId: string
}

const Users = (props: UsersProps) => {

    const [users, setUsers] = useState<UserDTO[]>([]);

    useEffect(() => {
        userService.getUsers(props.roomId).then(users => {
            setUsers(userService.filterUserDTO(users, props.user.id));
        });
    }, [props.roomId, props.user.id]);


    useEffect(() => {
        let eventSource = new EventSource(BASE_URL + `/rooms/${props.roomId}/update`);

        eventSource.onmessage = (event: MessageEvent<UserDTO[]>) => {
            console.log(event);
            if (event.type === "users") {
            }
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, [props.roomId])

    return (
        <div className="users">
            <SelfUser user={props.user} nameChangeHandler={props.nameChangeHandler}/>
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

type NameChangeHandler = (nam: string) => void

interface SelfUserProps {
    user: UserDTO,
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
        {props.user.name}
    </div>;

    const inner = isEditing ? editing : showing;

    return (
        <div className="user self" onClick={_ => {
            setIsEditing(true);
            setContent(props.user.name);
        }}>
            {inner}
        </div>
    );
}

export default Users;
export type {UserProps};
