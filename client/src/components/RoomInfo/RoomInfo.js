import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './RoomInfo.css';

function TextContainer({ users,room }){
    // console.log(users);
    return (
        <div className="textContainer">
            <div>
            <h1>Room No. {room}</h1>
            </div>
            {
            users
                ? (
                <div>
                    <h1>People currently chatting:</h1>
                    <div className="activeContainer">
                    <h2>
                        {users.map(({name}) => (
                        <div key={name} className="activeItem">
                            {name}
                            <img alt="Online Icon" src={onlineIcon}/>
                        </div>
                        ))}
                    </h2>
                    </div>
                </div>
                )
                : null
            }
        </div>
    );
}

export default TextContainer;