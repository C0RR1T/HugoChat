interface RoomsProps {
    rooms: RoomProps[]
    current: string
}

const Rooms = (props: RoomsProps) => {

    return (
        <div className="rooms">
            {props.rooms.map(room =>
                (room.id === props.current) ?
                <CurrentRoom {...room} id={room.id}/> :
                <Room {...room} id={room.id}/>)}
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

export {Room, Rooms};
export type {RoomsProps, RoomProps};
