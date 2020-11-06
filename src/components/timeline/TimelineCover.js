import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {ProgressBar} from 'react-bootstrap'
import { Modal, Button } from "antd"
import 'antd/dist/antd.css';

function TimelineCover() {
    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userId");

    // console.log(userID)
    const [timel, settimel] = useState([]);
    const [modal, setmodal] = useState({
        visible: false,
    })
    const [modal1, setmodal1] = useState({
        visible1: false,
    })
    const [image, setImage]=useState('')
    const [imageCover, setImageCover]=useState('')
    let token = JSON.parse(localStorage.getItem('aulogin'))
 //getuser......................................
    useEffect(() => {
        console.log('did mount');
        fetch(`https://aht-social.herokuapp.com/api/v1/user/get-user?user_id=${userID}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    settimel(result.data);
                    // console.log(result)
                },
            )
    }, [])
    //update avatar..........................
    const handleOnChange=(e)=>{
        setImage(e.target.files[0])
    }
    const updateavatar=()=>{
        setmodal({visible: false, });
       const data = new FormData()
            data.append('single_image',image)
       const optoin={
        headers: {
                    'Accept': "application/json",
                    'content-type' : 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            }
            if(image){
                 axios.post(`https://aht-social.herokuapp.com/api/v1/user/upload-image-avatar/${userID}`,data,optoin)
                    .then(res => {
                        if(res.status === 200){
                            settimel({
                                ...timel,
                                avatar:res.data.location
                            })
                            setImage('')
                        alert('update avatar success!')
                        }
                    });
            }else{
                alert('please choose your image!')
            }
       
    }
    //update coverimage.................
    const handleOnChange1=(e)=>{
        setImageCover(e.target.files[0])
    }
    const updateCoverImgae=()=>{
        setmodal1({visible: false, });
       
       const data1 = new FormData()
            data1.append('single_image',imageCover)
       const optoin={
        headers: {
                    'Accept': "application/json",
                    'content-type' : 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            }
            if(imageCover){
                 axios.post(`https://aht-social.herokuapp.com/api/v1/user/upload-image-coverImage/${userID}`,data1,optoin)
                    .then(res => {
                        
                        if(res.status === 200){
                            settimel({
                                ...timel,
                                coverImage:res.data.location
                            })
                            setImage('')
                        alert('update coverimage success!')
                        }
                    });
            }else{
                alert('please choose your image!')
            }
       
    }
    const divStyle = {
        backgroundImage: "url(" + `data:image/jpeg;base64,` + timel.coverImage + ")",
      };
     //modal..............................
     const showModal = () => {
        setmodal({visible: true, });
    };
    const handleOk = e => {
        setmodal({visible: false, });
    };

    const handleCancel = e => {
        setmodal({visible: false, });
    };
    //.........
    const showModal1 = () => {
        setmodal1({visible1: true, });
    };

    const handleOk1 = e => {
        setmodal1({visible1: false, });
    };

    const handleCancel1 = e => {

        setmodal1({visible1: false, });
    };
    return userID ? (
        <>
            <div className="timeline-cover" style={divStyle} > 
                        <div className="nen"></div>
                        <div className="editcoverimage">
                                <Button type="" onClick={() => showModal1()}>
                                    <i class="fa fa-camera">edit</i> 
                                </Button>
                                <Modal  visible={modal1.visible1} onOk={() => handleOk1()}onCancel={() => handleCancel1()}>
                                                <input type="file" onChange={handleOnChange1}/> 
                                                <button onClick={updateCoverImgae} className="mt-3">upload</button>
                                </Modal>
                        </div>
                        <a className="viewanh"><i class="fa fa-eye"></i></a>
                        {/*Timeline Menu for Large Screens*/}
                        <div className="timeline-nav-bar hidden-sm hidden-xs">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="profile-info">
                                       <a><img src={`data:image/jpeg;base64,${timel.avatar}`}  className="img-responsive profile-photo" />
                                            <div className="nenb"></div>
                                        <div className="eidtavata"> 
                                            <Button type="" onClick={() => showModal()}>
                                            <i class="fa fa-camera">edit</i> 
                                            </Button>
                                            <Modal  visible={modal.visible} onOk={() => handleOk()}onCancel={() => handleCancel()}>
                                                <input type="file" onChange={handleOnChange}/> 
                                                <button onClick={updateavatar} className="mt-3">upload</button>
                                            </Modal>
                                        </div>
                                       </a> 
                                     
                                        <h3>{timel.firstName} {timel.lastName}</h3>
                                        <p className="text-muted">Creative Director</p>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-inline profile-menu">
                                        <li><Link to="timeline" className="active">Timeline</Link></li>
                                        <li><Link to="/timeline-about">About</Link></li>
                                        <li><Link to="/timeline-album">Album</Link></li>
                                        <li><a href="timeline-friends.html">Friends</a></li>
                                    </ul>
                                    <ul className="follow-me list-inline">
                                        <li>1,299 people following her</li>
                                        <li><button className="btn-primary">Add Friend</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>{/*Timeline Menu for Large Screens End*/}
                        {/*Timeline Menu for Small Screens*/}
                        <div className="navbar-mobile hidden-lg hidden-md">
                            <div className="profile-info">
                                <img src="images/users/user-1.jpg" className="img-responsive profile-photo" />
                                <h4>Sarah Cruiz</h4>
                                <p className="text-muted">Creative Director</p>
                            </div>
                            <div className="mobile-menu">
                                <ul className="list-inline">
                                    <li><a href="timline.html" className="active">Timeline</a></li>
                                    <li><a href="timeline-about.html">About</a></li>
                                    <li><a href="timeline-album.html">Album</a></li>
                                    <li><a href="timeline-friends.html">Friends</a></li>
                                </ul>
                                <button className="btn-primary">Add Friend</button>
                            </div>
                        </div>{/*Timeline Menu for Small Screens End*/}
                    </div>
        </>
    ): <Redirect to={"/"}/>
}

export default TimelineCover
