import React ,{useState,useEffect} from 'react'
import {Link}  from 'react-router-dom';
import './Join.css';
import Black from './Black.mp4';


export default function Join() {
  const[name,setName]=useState("");
  const[room,setRoom]=useState("");
  return (
      <div className="video-wrapper">
        <video playsInline autoPlay muted loop>
          <source src={Black} type="video/webm"></source>
          Your browser does not support the video tag.
        </video>
        <div className='joinOuterContainer'>
        <div className='joinInnerContainer'>
          <h1 className='heading'>Join</h1>
          <div><input placeholder='Name' className='joinInput' type="text" onChange={(event)=>setName(event.target.value)}/></div>
          <div><input placeholder='Room' className='joinInput mt-20' type="text" onChange={(event)=>setRoom(event.target.value)}/></div>
          <Link onClick={(event)=>(!name || !room) ?event.preventDefault() :null} to={`/chat?name=${name}&room=${room}`} >
            <button className="button mt-20" type='submit'>Sign In</button>
          </Link>
        </div>
      </div>
      </div>
    
  )
}
