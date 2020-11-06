import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import  jwt_decode from "jwt-decode"
import { useSelector } from 'react-redux';
import Search from '../seach/Search';
import PageSeach from '../seach/PageSeach';
import index from '../seach/index.css'
import io from 'socket.io-client'
function Header() {
    const [value, setvalue] = useState({
        riderect: false,
    });
    const  [data,setData]=useState('')
    
    useEffect(() => {
        

        const token = JSON.parse(localStorage.getItem('aulogin'))
        var decoded = jwt_decode(token);
        let userId=decoded.userId
        if(token)
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

    const logout = () => {
        const ENDPOINT='http://e25bfec37055.ngrok.io/'
        const token = JSON.parse(localStorage.getItem('aulogin'))
        let socket;
        var decoded = jwt_decode(token);
        let userId=decoded.userId
        
        //offline 
        socket = io(ENDPOINT)
        socket.emit('logout', {user_id:userId})
        console.log(socket);
        socket.on('list-user',(data)=>{
                console.log(data)
        })
        //.......
        if(token)
            localStorage.setItem('aulogin', '')
            localStorage.clear()
        setvalue({ riderect: true })
        if (value.riderect) {
            return <Redirect to={'/'} />
        }
    }

if (value.riderect) {
        return <Redirect to={'/'} />
    }

    return (
        <>
            <header id="header">
                <nav className="navbar navbar-default navbar-fixed-top menu">
                    <div className="container">

                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <a className="navbar-brand" href="#"><img src="images/logo.png" alt="logo" /></a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right main-menu">
                                <li className="dropdown">
                                    <Link to={`/timeline?userId=${data._id}`} className="dropdown-toggle editdrop"><img src={data.avatar} alt="user" className="profile-photo editanh" />{data.firstName} {data.lastName}</Link>
                                </li>
                                <li className="dropdown">
                                    <Link to="/newsfeed" className="dropdown-toggle" >Home </Link>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle pages pagedit" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="editchatr" ><i class="fa fa-comments"></i></span></a>
                                    <ul className="dropdown-menu page-list pagedit">
                                            <li className="active">
                                                <a  data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-2.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Linda Lohan</h6>
                                                            <p className="text-muted">Hi there, how are you</p>
                                                            <small className="text-muted">a min ago</small>
                                                            <div className="chat-alert">1</div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li >
                                                <a  data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-10.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Julia Cox</h6>
                                                            <p className="text-muted">see you soon</p>
                                                            <small className="text-muted">an hour ago</small>
                                                            <div className="seen"><i className="icon ion-checkmark-round" /></div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a  data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-10.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Julia Cox</h6>
                                                            <p className="text-muted">see you soon</p>
                                                            <small className="text-muted">an hour ago</small>
                                                            <div className="seen"><i className="icon ion-checkmark-round" /></div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-10.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Julia Cox</h6>
                                                            <p className="text-muted">see you soon</p>
                                                            <small className="text-muted">an hour ago</small>
                                                            <div className="seen"><i className="icon ion-checkmark-round" /></div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a  data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-10.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Julia Cox</h6>
                                                            <p className="text-muted">see you soon</p>
                                                            <small className="text-muted">an hour ago</small>
                                                            <div className="seen"><i className="icon ion-checkmark-round" /></div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="" data-toggle="tab">
                                                    <div className="contact">
                                                        <img src="images/users/user-10.jpg" alt className="profile-photo-sm pull-left" />
                                                        <div className="msg-preview">
                                                            <h6>Julia Cox</h6>
                                                            <p className="text-muted">see you soon</p>
                                                            <small className="text-muted">an hour ago</small>
                                                            <div className="seen"><i className="icon ion-checkmark-round" /></div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="editIconDown">Setting <i class="fa fa-sort-down"></i></span></a>
                                    <ul className="dropdown-menu login">
                                        {/* <li><Link to="/timeline-about">Timeline About</Link></li>
                                        <li><Link to="/timeline-album">Timeline Album</Link></li>
                                        <li><a href="timeline-friends.html">Timeline Friends</a></li>
                                        <li><a href="edit-profile-basic.html">Edit: Basic Info</a></li>
                                        <li><a href="edit-profile-work-edu.html">Edit: Work</a></li>
                                        <li><a href="edit-profile-interests.html">Edit: Interests</a></li>
                                        <li><a href="edit-profile-settings.html">Account Settings</a></li> */}
                                        <li><Link to="/changepassword">Change Password</Link></li>
                                        <li ><Link to="/" className="dropdown-toggle">Login</Link>  </li>
                                         <li > <a onClick={() => logout()} className="dropdown-toggle" >Logout </a></li>
                                    </ul>
                                </li>
                            </ul>

                           <Search/>
                        </div>
                    </div>
                </nav>
            </header>

        </>
    )
}

export default Header
