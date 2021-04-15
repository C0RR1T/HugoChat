import {roomService} from "../../services/Services";
import React, {useEffect, useRef, useState} from "react";
import RoomDTO from "../../services/room/model/RoomDTO";
import {BASE_URL} from "../../services/AxiosUtility";
import {Link, useParams} from "react-router-dom";

const Rooms = () => {

    const [rooms, setRooms] = useState<RoomDTO[]>([]);
    const [showRooms, setShowRooms] = useState<RoomDTO[]>([]);
    const [query, setQuery] = useState("");

    const {roomId} = useParams() as any;

    useEffect(() => {
        if (query === "") {
            setShowRooms(rooms);
            return;
        }

        if (query.match(/\/.*\//)) {
            const queryNoSlash = query.replaceAll(/^\/|\/$/g, "");
            try {
                const regexp = new RegExp(queryNoSlash);
                setShowRooms(rooms.filter(room => room.name.match(regexp)));
            } catch (_) {
            }
        } else {
            setShowRooms(rooms.filter(room => room.name.indexOf(query) !== -1));
        }

    }, [query, rooms]);

    useEffect(() => {
        roomService.getAll().then(rooms => setRooms(rooms));
    }, []);

    useEffect(() => {
        let eventSource = new EventSource(BASE_URL + `/rooms/update`);

        eventSource.onmessage = (event: MessageEvent<string>) => {
            const data: RoomDTO[] = JSON.parse(event.data);
            setRooms(data);
        }

        eventSource.onerror = () => {
            eventSource.close();
        }
        return () => eventSource.close();
    }, []);

    return (
        <div className="rooms">
            <RoomSearch changeHandler={query => {
                setQuery(query);
            }}/>
            {showRooms.map(room =>
                (room.id === roomId) ?
                    <CurrentRoom {...room} key={room.id}/> :
                    <Room {...room} key={room.id}/>)}
            <NewRoomButton/>
        </div>
    )
}


interface RoomProps {
    id: string,
    name: string,
}

const Room = (props: RoomProps) =>
    <Link to={`/${props.id}`} className="room">
        {props.name}
    </Link>


const CurrentRoom = (props: RoomProps) =>
    <div>
        <div className="room current" onClick={() => {
        }}>
            {props.name}
        </div>
    </div>


interface RoomSearchProps {
    changeHandler: (query: string) => void
}

const RoomSearch = (props: RoomSearchProps) => {
    const [value, setValue] = useState("");

    return (
        <div className="room-search">
            <input className="room-search-input" value={value} onChange={e => {
                setValue(e.target.value);
                props.changeHandler(e.target.value);
            }}/>
        </div>
    )
}


const NewRoomButton = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const [isUnlisted, setIsUnlisted] = useState(false);

    const editing =
        <form onSubmit={e => {
            e.preventDefault();
            if (content === "") {
                return;
            }
            setIsEditing(false);
            setContent("");
            roomService.create(content, isUnlisted).then(room => {
                window.location.pathname = `/${room.id}`;
            });
        }} onReset={e => {
            setIsEditing(false);
        }}>
            <h4 className="title">Create new Room</h4>
            <label htmlFor="new-room-name">name</label>
            <input id="new-room-name"
                   onChange={event => setContent(event.target.value)}
                   type="text"
                   value={content}
                   autoFocus={true}
            />
            <label htmlFor="new-room-isUnlisted">unlisted</label>
            <input id="new-room-isUnlisted" type="checkbox" checked={isUnlisted} onChange={e => {
                setIsUnlisted(e.target.checked)
            }}/>
            <br/>
            <input type="reset" className="button" value="cancel"/>
            <input type="submit" className="button" value="create"/>
        </form>

    const showing =
        <div className="name">
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
export type {RoomProps};
