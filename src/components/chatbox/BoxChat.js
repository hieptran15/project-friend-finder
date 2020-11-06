import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import  jwt_decode from "jwt-decode"
import io from 'socket.io-client'
function BoxChat() {
    const user_room=useSelector(state =>state.login.list)
    const id_room=useSelector(state =>state.login.roomId)
    // console.log(user_room)
    const  [data,setData]=useState('')
    const[contents,setContents]=useState('')
    const[getData,setGetData]=useState('')
    const token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId
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
    const chatLest=()=>{
        if(user_room){
            return(
                <li className="active">
                    <a href="#contact-1" data-toggle="tab">
                        <div className="contact">
                        <img src={user_room.avatar} alt className="profile-photo-sm pull-left" />
                        <div className="msg-preview">
                            <h6>{user_room.firstName}{user_room.lastName}</h6>
                            <p className="text-muted">Hi there, how are you</p>
                            <small className="text-muted">a min ago</small>
                            <div className="chat-alert">1</div>
                        </div>
                        </div>
                    </a>
                </li>
 
            )
        }else{
            return(
                <li className="active">
                <a href="#contact-1" data-toggle="tab">
                    <div className="contact">
                    <img src alt className="profile-photo-sm pull-left" />
                    <div className="msg-preview">
                        <h6></h6>
                        <p className="text-muted">Hi there, how are you</p>
                        <small className="text-muted">a min ago</small>
                        <div className="chat-alert">1</div>
                    </div>
                    </div>
                </a>
            </li>
            )
        }
    }
    const getContent=(e)=>{
        setContents(e)
    }
    const resSendContent=()=>{
        console.log(contents)
        fetch('http://192.168.0.144:3002/api/v1/message/set-message', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
            body: JSON.stringify({
                                "user_id": `${userId}`,
                                "room_id": `${id_room}`,
                                "content": `${contents}`,
                                "type": "0",
                                                })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    setGetData(result.data)
                     const spp=result.data
                    if(spp){
                        // const ENDPOINT='192.168.0.144:3002'
                        // let socket;
                        // socket = io(ENDPOINT)
                        // socket.emit('client-send-message', {data:spp})
                        // console.log(socket)
                        // socket.on('server-send-message',(data)=>{
                        //     console.log(data)
                        // })
                    }
                },
            )
    }
    return (
        <>
            {/* Chat Room
                    ================================================= */}
                        <div className="chat-room editchatroom">
                            <div className='titleChat'>
                                <h3>chat box</h3>
                            </div>
                            <div className="borderchat"></div>
                        <div className="row">
                            <div className="col-md-5">
                            {/* Contact List in Left*/}
                            <ul className="nav nav-tabs contact-list scrollbar-wrapper scrollbar-outer">

                                       {chatLest()}

                            </ul>{/*Contact List in Left End*/}
                            </div>
                            <div className="col-md-7">
                            {/*Chat Messages in Right*/}
                            <div className="tab-content scrollbar-wrapper wrapper scrollbar-outer">
                                <div className="tab-pane active" id="contact-1">
                                <div className="chat-body">
                                    <ul className="chat-message">
                                    <li className="left">
                                        <img src={user_room?user_room.avatar:''} alt className="profile-photo-sm pull-left" />
                                        <div className="chat-item">
                                        <div className="chat-item-header">
                                            <h5>{user_room?user_room.lastName:'name'}</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p>Hi honey, how are you doing???? Long time no see. Where have you been?</p>
                                        </div>
                                    </li>
                                    <li className="right">
                                        <img src={data.avatar} alt className="profile-photo-sm pull-right" />
                                        <div className="chat-item">
                                        <div className="chat-item-header">
                                            <h5>{data.firstName}{data.lastName}</h5>
                                            <small className="text-muted">3 days ago</small>
                                        </div>
                                        <p>I have been on vacation</p>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                                </div>

                            </div>{/*Chat Messages in Right End*/}
                            <div className="send-message">
                                <div className="input-group">
                                <input type="text" onChange={(e)=>getContent(e.target.value)} className="form-control" placeholder="Type your message" />
                                <span className="input-group-btn">
                                    <button onClick={()=>resSendContent()} className="btn btn-default" type="button">Send</button>
                                </span>
                                </div>
                            </div>
                            </div>
                            <div className="clearfix" />
                        </div>
                        </div>
        </>
    )
}

export default BoxChat
