import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import  jwt_decode from "jwt-decode"
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client'
import axios from 'axios';
import { getRoomId, getIduser } from '../../resoleredux/action';
function Statics() {

    const token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId

    const  [data,setData]=useState('')
    const  [myOnline,setMyOnline]=useState('')
    const [online,setOnline]=useState([])
    // console.log(online)

    const dispatch=useDispatch()

    const ENDPOINT='192.168.0.144:3002'
    useEffect(()=>{
            let socket;
             socket = io(ENDPOINT)
            socket.emit('online', {user_id:userId})
            // console.log(socket);
            socket.on('list-user',(data)=>{
                    // console.log(data)
                    setOnline(data)
            })
    },[])

    const res=[...online].filter(item => item._id !== userId)
    useEffect(() => {
        fetch(`https://aht-social.herokuapp.com/api/v1/user/get-user?user_id=${userId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp=result.data;
                    // dispatch(getIduser(spp))
                    setData(spp)
                    // console.log(spp)
                },
            )
    }, [])

    const onlineRoom=(value)=>{
        dispatch(getIduser(value))
        fetch('http://192.168.0.144:3002/api/v1/room/set-room', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({"userIds": [`${value._id}`, `${userId}`]})
        })
            .then(res => res.json())
            .then(
                (result) => {
                //    console.log(result.room_id)
                   dispatch(getRoomId(result.room_id))
                   if(result.room_id){
                        const ENDPOINT='192.168.0.144:3002'
                        let socket;
                        socket = io(ENDPOINT)
                        socket.emit('setRoom', {id_room:result.room_id})
                        // console.log(socket);
                    }else{
                        alert('loi')
                    }
                },
            )
    }
    return (
        <>
            <div className="col-md-3 static">
                <div className="profile-card">
                    <img src={data.avatar} alt="user" className="profile-photo" />
                    <h5><Link to={`/timeline?userId=${userId}`} className="text-white">{data.firstName}{data.lastName}</Link></h5>
                    <a href="#" className="text-white"><i className="ion ion-android-person-add" /> 1,299 followers</a>
                </div>
                {/*profile card ends*/}
                <ul className="nav-news-feed">
                    <li><i className="icon ion-ios-paper" /><div><Link to="/newsfeed">My Newsfeed</Link></div></li>
                    {/* <li><i className="icon ion-ios-people" /><div><a href="newsfeed-people-nearby.html">People Nearby</a></div></li> */}
                    <li><i className="icon ion-ios-people-outline" /><div><a href="#">Friends</a></div></li>
                    <li><i className="icon ion-images" /><div><a href="#">Images</a></div></li>
                    <li><i className="icon ion-ios-videocam" /><div><a href="#">Videos</a></div></li>
                </ul>{/*news-feed links ends*/}
                <div id="chat-block">
                    <div className="title">Chat online</div>
                    <ul className="online-users list-inline">
                        {res.map((value,key)=>{
                            return(
                                <li key={key}><Link to={`/pageChat?userIdroom=${value._id}`} onClick={()=>onlineRoom(value)} title={value.lastName}><img src={value.avatar} alt="user" className="img-responsive profile-photo" /><span className="online-dot" /></Link></li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Statics
