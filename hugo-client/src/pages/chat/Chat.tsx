import React, {useEffect, useState} from 'react';
import Messages from "./Messages";
import Users from "./Users";
import {Rooms} from "./Room";
import UserDTO from "../../services/user/model/UserDTO";
import {userService} from "../../services/Services";
import {BrowserRouter, useParams} from "react-router-dom";
import {Route, Redirect} from "react-router-dom";

const DEFAULT_NAME = "Hugo Boss";

const Chat = () => {

    const [user, setUser] = useState<UserDTO>({
        name: DEFAULT_NAME,
        id: ""
    });

    const {roomId} = useParams() as any;

    const [sendRefresh, setSendRefresh] = useState(false);

    useEffect(() => {
        if (sendRefresh) {
            userService.keepActive(roomId, user.id)
        }
        setSendRefresh(false);
    }, [sendRefresh, roomId, user.id]);

    useEffect(() => {
        userService.createUser(DEFAULT_NAME).then(user => {
            setUser(user);
        });

        setInterval(() => setSendRefresh(true), 5000);
    }, [])


    return (
        <div className="parent">
                <Rooms/>
                <Messages scroll={true}
                          user={user}
                />
                <Users
                    user={user}
                    nameChangeHandler={name => {
                        if (name.length < 255) {
                            userService.changeName({
                                id: user.id,
                                name: name
                            }).then(user => setUser(user));
                        } else {
                            alert(`Name too long: '${name.length}'. Must be less than 255 characters`)
                        }
                    }}
                />
        </div>
    );

}

export default Chat;