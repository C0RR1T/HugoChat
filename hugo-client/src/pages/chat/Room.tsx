interface RoomsProps {
    rooms: RoomProps[]
}

const Rooms = (props: RoomsProps) => {

    return (
        <div className="rooms">
            {props.rooms.map(room => <Room {...room}/>)}
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

export {Room, Rooms};
export type {RoomsProps, RoomProps};
