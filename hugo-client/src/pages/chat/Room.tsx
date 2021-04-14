import {roomService} from "../../services/Services";
import {v4} from "uuid";

interface RoomsProps {
    rooms: RoomProps[]
    current: string
}

const Rooms = (props: RoomsProps) => {

    return (
        <div className="rooms">
            {props.rooms.map(room =>
                (room.id === props.current) ?
                <CurrentRoom {...room} key={room.id}/> :
                <Room {...room} key={room.id}/>)}
            <NewRoomButton/>
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


const NewRoomButton = () => {
    return (
        <div className="new-room" onClick={() => roomService.create(v4())}>
            Create new room!
        </div>
    )
}

export {Room, Rooms};
export type {RoomsProps, RoomProps};
