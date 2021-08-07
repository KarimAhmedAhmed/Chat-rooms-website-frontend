import React, { useState, useEffect } from 'react';

import './Rooms.css';
import axios from 'axios';


const Rooms = ({history}) => {
    
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        
        async function fetchdata() {
            const { data } = await axios.get("/chat/rooms");
            setChats(data.data);
            console.log(data);





        }

        if (chats.length === 0) {
            fetchdata();
        }




    }, [chats]);



    const Card = (props) => {
        // console.log(props);
        return (
            // {chats.map((username, message) => (

            // ))}


            <div onClick={ (e) =>{e.preventDefault(); privatechat(props.chat.name)}   } key={props.index} className="card">
                {/* avatar is removed for now  */}
                {/* <img src="img_avatar.png" alt="Avatar" /> */}
                <div className="container">
                    <h4><b>{props.chat.name}</b></h4>
                    <p>{props.chat.message}</p>
                </div>
            </div>

        )



    }

    const privatechat = (user) =>{
        
        // e.preventDefault() ;
        history.push(`/chat?room=${user}`)
        console.log('clicked');

    }
    
    return (
    
        <div className="chatslist">
            <div className="chatslistinner">
                <h2>Rooms</h2>
                {/* <div>
                    <input className="searchinput" type="search" lable="search messnger" placeholder="Search chats" />
                </div> */}
                {/* /card/ */}
                {chats.map((chat, index) => (
                    <Card key={index} chat = {chat} index = {index} />

                ))}
                
                {/* // */}

            </div>
        </div>
    );
}

export default Rooms;
