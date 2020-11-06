import React, { useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Whotofollow from '../home/Whotofollow'
import  jwt_decode from "jwt-decode"
import { Link, useLocation } from 'react-router-dom'
import BoxChat from './BoxChat'
import io from 'socket.io-client'
import Statics from '../home/Statics'
import { useSelector } from 'react-redux'
function PageChat() {
    const [data, setdata] = useState([])
    const token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId

    const id_room=useSelector(state =>state.login.roomId)
    
    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userIdroom");

    // console.log(id_room)
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
                    setdata(spp)
                    // console.log(spp)
                },
            )
    }, [])

 useEffect(()=>{
    fetch(`http://192.168.0.144:3002/api/v1/message/history/${userID}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        }),
    })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
            },
        )
 },[userID])
 
    return (
        <>
          <Header/>
            <div id="page-contents">
                <div className="container">
                    <div className="row">
                    {/* Newsfeed Common Side Bar Left
                    ================================================= */}
                   <Statics/>
                    <div className="col-md-7">
                        {/* Post Create Box
                    ================================================= */}
                            <BoxChat />

                    </div>
                    {/* Newsfeed Common Side Bar Right
                    ================================================= */}
                        <Whotofollow/>
                    </div>
                </div>
                </div>
        </>
    )
}

export default PageChat
