import {roomService} from "../../services/Services";
import React, {useEffect, useRef, useState} from "react";
import RoomDTO from "../../services/room/model/RoomDTO";
import {BASE_URL} from "../../services/AxiosUtility";
import UserDTO from "../../services/user/model/UserDTO";

interface RoomsProps {
    current: string
    roomChangeHandler: (id: string) => void
}

const Rooms = (props: RoomsProps) => {

    const [rooms, setRooms] = useState<RoomDTO[]>([]);

    useEffect(() => {
        roomService.getAll().then(rooms => setRooms(rooms));
    }, []);

    useEffect(() => {
        let eventSource = new EventSource(BASE_URL + `/rooms/update`);

        eventSource.onmessage = (event: MessageEvent<string>) => {
            const data: RoomDTO[] = JSON.parse(event.data);
            console.log(event.data);
            console.log(data);
            setRooms(data);
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, [])

    return (
        <div className="rooms">
            {rooms.map(room =>
                (room.id === props.current) ?
                    <CurrentRoom {...room} roomChangeHandler={() => {
                    }} key={room.id}/> :
                    <Room {...room} roomChangeHandler={props.roomChangeHandler} key={room.id}/>)}
            <NewRoomButton roomChangeHandler={props.roomChangeHandler}/>
        </div>
    )
}


interface RoomProps {
    id: string,
    name: string,
    roomChangeHandler: (id: string) => void
}

const Room = (props: RoomProps) =>
    <div className="room" onClick={() => props.roomChangeHandler(props.id)}>
        {props.name}
    </div>


const CurrentRoom = (props: RoomProps) =>
    <div>
        <div className="room current" onClick={() => {
        }}>
            {props.name}
        </div>
    </div>


interface NewRoomButtonProps {
    roomChangeHandler: (id: string) => void
}

const NewRoomButton = (props: NewRoomButtonProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");

    const inputRef = useRef<HTMLInputElement>(null)

    const editing =
        <input onKeyPress={event => {
            if (event.key === "Enter") {
                setIsEditing(false);
                roomService.create(content).then(room => {
                    props.roomChangeHandler(room.id);
                });
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
        Create a new Room!
    </div>;

    const inner = isEditing ? editing : showing;

    return (
        <div className="new-room" onClick={_ => {
            setIsEditing(true);
        }}>
            {inner}
        </div>
    );
}

export {Room, Rooms};
export type {RoomsProps, RoomProps};
