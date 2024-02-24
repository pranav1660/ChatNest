import React,{useState,useEffect} from 'react'
import queryString from 'query-string';
import './Chat.css'
import io from 'socket.io-client';
import { useLocation,useNavigate } from 'react-router-dom';
import InfoBar from '../Info Bar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../RoomInfo/RoomInfo';
let socket; 
export default function Chat() {
  const[name,setName]=useState("");
  const[room,setRoom]=useState("");
  const[message,setMessage]=useState('');
  const[messages,setMessages]=useState([]);
  const [users, setUsers] = useState('');

  const location=useLocation();
  const navigate = useNavigate();
  const Endpoint='http://localhost:5000/';


  useEffect(()=>{
    const {name,room}=queryString.parse(location.search);

    socket=io(Endpoint);
    setName(name);
    setRoom(room);
    socket.emit('join',{name,room},(error)=>{
      if(error){
        alert(error);
        navigate(-1);
        socket.disconnect();
        socket.off();
      }
    });

    return ()=>{
      socket.disconnect();
      socket.off();
    }
  },[location.search,Endpoint]);

  useEffect(()=>{
    socket.on('message',(message)=>{
      setMessages(messages => [ ...messages, message ]);//we are pushing new message to array not replacing
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users);
    });
    // console.log(users);
  },[]);
  // console.log(message,messages);
  const sendMessage=(event)=>{
    event.preventDefault(); 
    if(message){
      socket.emit('sendMessage',message,()=> setMessage(''));
    }
  }




  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
      <TextContainer users={users} room={room}/>
    </div>
  )
}
