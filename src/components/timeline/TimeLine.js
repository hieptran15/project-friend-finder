import React, { useState, useEffect } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Link, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Modal, Button} from "antd"
import 'antd/dist/antd.css';
import {getIdProfile } from '../../resoleredux/action';
import StoreInfo from './StoreInfo';
import jwt_decode from "jwt-decode"
import Loadingavatar from './Loadingavatar'
import Follow from './Follow';
import Whotofollow from '../home/Whotofollow';
import io from 'socket.io-client'

function TimeLine() {
    let token = JSON.parse(localStorage.getItem('aulogin'))

    var decoded = jwt_decode(token);
    let userId = decoded.userId

    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userId");

    //    console.log(proFile)

    const [timel, settimel] = useState([]);
    // console.log(timel)
    const [modal, setmodal] = useState({
        visible: false,
    })
    const [modal1, setmodal1] = useState({
        visible1: false,
    })
    const [modal3, setmodal3] = useState({
        visible1: false,
    })

    const [image, setImage] = useState('')
    const [imageCover, setImageCover] = useState('')
    const [loading, setLoading] = useState(false)

    const dispatch=useDispatch()

//getuser......................................
    useEffect(() => {
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
                    const spp = result.data
                    // console.log(ress[0])
                    dispatch(getIdProfile(spp))
                    console.log(spp)
                },
            )
    }, [userID])


//update avatar..........................//
    const handleOnChange = (e) => {
        setImage(e.target.files[0])
    }
    const updateavatar = () => {



        const getdata = new FormData()
        getdata.append('single_image_training', image)
        if (image) {
            setLoading(true)
            axios.post('https://brand.spify.io/r3st/api/v1/upload-single-image', getdata)
                .then(res => {
                    const getlocation = res.data.location
                    if (res.data.status === true) {
                        const data = { location: res.data.location }
                        const optoin = {
                            headers: {
                                'Content-Type': "application/json",
                                'Authorization': `Bearer ${token}`
                            },
                        }
                        axios.put(`https://social-aht.herokuapp.com/api/v1/user/update-avatar/${userID}`, data, optoin)
                            .then(res => {
                                console.log(res)
                                if (res.status === 200) {
                                    setLoading(false)
                                    setmodal({ visible: false, });
                                    settimel({
                                        ...timel,
                                        avatar: getlocation
                                    })
                                }
                            });
                    } else {
                        alert('eror...please choose your image!')

                    }
                });
        } else {
            alert('please choose your image!')
        }

        // if (saveImage) {
        //     axios.put(`https://social-aht.herokuapp.com/api/v1/user/update-avatar/${userID}`, data2, optoin)
        //         .then(res => {
        //             console.log(res)
        //         });
        // } else {
        //     alert('eror...please choose your image!')
        // }
        // const data = new FormData()
        // data.append('single_image', image)
        // const optoin = {
        //     headers: {
        //         'Accept': "application/json",
        //         'content-type': 'multipart/form-data',
        //         'Authorization': `Bearer ${token}`
        //     },
        // }
        // if (image) {
        //     axios.post(`https://social-aht.herokuapp.com/api/v1/user/upload-image-avatar/${userID}`, data, optoin)
        //         .then(res => {
        //             if (res.status === 200) {
        //                 settimel({
        //                     ...timel,
        //                     avatar: res.data.location
        //                 })
        //                 alert('update avatar success!')
        //             }
        //         });
        // } else {
        //     alert('please choose your image!')
        // }

    }
//update coverimage......................//
    const handleOnChange1 = (e) => {
        setImageCover(e.target.files[0])
    }
    const updateCoverImgae = () => {


        const getdata = new FormData()
        getdata.append('single_image_training', imageCover)
        if (imageCover) {
            setLoading(true)
            axios.post('https://brand.spify.io/r3st/api/v1/upload-single-image', getdata)
                .then(res => {
                    const getlocation = res.data.location
                    if (res.data.status === true) {
                        const data = { location: res.data.location }
                        const optoin = {
                            headers: {
                                'Content-Type': "application/json",
                                'Authorization': `Bearer ${token}`
                            },
                        }
                        axios.put(`https://social-aht.herokuapp.com/api/v1/user/update-cover-image/${userID}`, data, optoin)
                            .then(res => {
                                console.log(res)
                                if (res.status === 200) {
                                    setLoading(false)
                                    setmodal1({ visible: false, });
                                    settimel({
                                        ...timel,
                                        coverImage: getlocation
                                    })
                                }
                            });
                    } else {
                        alert('eror...please choose your image!')
                    }
                });
        } else {
            alert('please choose your image!')
        }

        // const data1 = new FormData()
        // data1.append('single_image', imageCover)
        // const optoin = {
        //     headers: {
        //         'Accept': "application/json",
        //         'content-type': 'multipart/form-data',
        //         'Authorization': `Bearer ${token}`
        //     },
        // }
        // if (imageCover) {
        //     axios.post(`https://social-aht.herokuapp.com/api/v1/user/upload-image-coverImage/${userID}`, data1, optoin)
        //         .then(res => {

        //             if (res.status === 200) {
        //                 settimel({
        //                     ...timel,
        //                     coverImage: res.data.location
        //                 })
        //                 setImage('')
        //                 alert('update coverimage success!')
        //             }
        //         });
        // } else {
        //     alert('please choose your image!')
        // }

    }
    const divStyle = {
        backgroundImage: "url(" + timel.coverImage + ")",
    };
//modal..............................
    const showModal = () => {
        setmodal({ visible: true, });
    };

    const handleOk = e => {
        console.log(e);
        setmodal({ visible: false, });
    };

    const handleCancel = e => {
        console.log(e);
        setmodal({ visible: false, });
    };
    //.................................//
    const showModal1 = () => {
        setmodal1({ visible1: true, });
    };

    const handleOk1 = e => {
        console.log(e);
        setmodal1({ visible1: false, });
    };

    const handleCancel1 = e => {
        console.log(e);
        setmodal1({ visible1: false, });
    };
      //.................................//
      const showModal3 = () => {
        setmodal3({ visible3: true, });
    };

    const handleOk3 = e => {
        console.log(e);
        setmodal3({ visible3: false, });
    };

    const handleCancel3 = e => {
        console.log(e);
        setmodal3({ visible1: false, });
    };
//loading........................../
    const isloading = () => {
        if (loading === false) {
            console.log()
        } else {
            return (<Loadingavatar />)
        }

    }
//ischange edit image.....................................//
    const changeEditavtar = () => {
        if (userId === userID) {
            return (<div style={divStyleImage} className="eidtavata">
                <Button type="" onClick={() => showModal()}>
                    <i class="fa fa-camera">edit</i>
                </Button>
                <Modal footer={null} visible={modal.visible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                    <h1>edit avatar</h1>
                    <input type="file" onChange={handleOnChange} />
                    <div className="toloadbo">
                        <button onClick={updateavatar} className=" btn btn-primary editring">upload {isloading()} </button>
                    </div>
                </Modal>
            </div>)
        } else {
            return (
                <div style={divStyleImage2} className="eidtavata">
                    <Button type="" onClick={() => showModal()}>
                        <i class="fa fa-camera">edit</i>
                    </Button>
                    <Modal footer={null} visible={modal.visible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                        <h1>edit avatar</h1>
                        <input type="file" onChange={handleOnChange} />
                        <div className="toloadbo">
                            <button onClick={updateavatar} className=" btn btn-primary editring">upload {isloading()} </button>
                        </div>
                    </Modal>
                </div>
            )
        }
    }
    const changeEditCoverImg = () => {
        if (userId === userID) {
            return (<div style={divStyleImage} className="editcoverimage">
                <Button type="" onClick={() => showModal1()}>
                    <i class="fa fa-camera">edit</i>
                </Button>
                <Modal footer={null} visible={modal1.visible1} onOk={() => handleOk1()} onCancel={() => handleCancel1()}>
                    <h1>edit coverimage</h1>
                    <input type="file" onChange={handleOnChange1} />
                    <button onClick={updateCoverImgae} className=" btn btn-primary editring">upload {isloading()}</button>
                </Modal>
            </div>)
        } else {
            return (
                <div style={divStyleImage2} className="editcoverimage">
                    <Button type="" onClick={() => showModal1()}>
                        <i class="fa fa-camera">edit</i>
                    </Button>
                    <Modal footer={null} visible={modal1.visible1} onOk={() => handleOk1()} onCancel={() => handleCancel1()}>
                        <h1>edit coverimage</h1>
                        <input type="file" onChange={handleOnChange1} />
                        <button onClick={updateCoverImgae} className=" btn btn-primary editring">upload {isloading()}</button>
                    </Modal>
                </div>
            )
        }
    }
    const divStyleImage = {
        display: "block"
    };
    const divStyleImage2 = {
        display: "none"
    };
//..................................//
    return userId ? (
        <>
            <Header />
            <div className="container">
                <div className="timeline">
                    <div className="timeline-cover" style={divStyle} >
                        <div className="nen"></div>
                            {changeEditCoverImg()}
                        {/* <a className="viewanh"><i class="fa fa-eye"></i></a> */}
                        {/*Timeline Menu for Large Screens*/}
                        <div className="timeline-nav-bar hidden-sm hidden-xs">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="profile-info">
                                        <a onClick={() => showModal3()}><img src={timel.avatar} className="img-responsive profile-photo" />
                                            <div className="nenb"></div>
                                        </a> 
                                         {changeEditavtar()}
                                        <Modal footer={null} visible={modal3.visible3} onOk={() => handleOk3()} onCancel={() => handleCancel3()}>
                                            <div className="viewAvatar">
                                                <img src={timel.avatar}/>
                                            </div>
                                        </Modal>
                                        <h3>{timel.firstName} {timel.lastName}</h3>
                                        <p className="text-muted">Creative Director</p>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-inline profile-menu">
                                        <li><Link to="/timeline" className="active">Timeline</Link></li>
                                        <li><Link to="/timeline-album">Album</Link></li>
                                        <li><a href="#">Friends</a></li>
                                        <li><Link to="/pageChat"><i class="fa fa-comments chatsocket"></i>Message</Link></li>
                                    </ul>
                                    <Follow timeline={timel} />
                                </div>
                            </div>
                        </div>{/*Timeline Menu for Large Screens End*/}
                        {/*Timeline Menu for Small Screens*/}
                        <div className="navbar-mobile hidden-lg hidden-md">
                            <div className="profile-info">
                                <img src={timel.avatar} className="img-responsive profile-photo" />
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
                    <div id="page-contents">
                        <div className="row">
                            <div className="col-md-3" >
                                <StoreInfo timeline={timel} />
                            </div>
                            <div className="col-md-7">
                                {/* Post Create Box
  ================================================= */}
                                <div className="create-post">
                                    <div className="row">
                                        <div className="col-md-7 col-sm-7">
                                            <div className="form-group">
                                                <img src={timel.avatar} className="profile-photo-md" />
                                                <textarea name="texts" id="exampleTextarea" cols={30} rows={1} className="form-control" placeholder="Write what you wish" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5">
                                            <div className="tools">
                                                <ul className="publishing-tools list-inline">
                                                    <li><a href="#"><i className="ion-compose" /></a></li>
                                                    <li><a href="#"><i className="ion-images" /></a></li>
                                                    <li><a href="#"><i className="ion-ios-videocam" /></a></li>
                                                    <li><a href="#"><i className="ion-map" /></a></li>
                                                </ul>
                                                <button className="btn btn-primary pull-right">Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/* Post Create Box End*/}
                                {/* Post Content
  ================================================= */}
                                <div className="post-content">
                                    {/*Post Date*/}

                                    <img src="images/post-images/12.jpg" alt="post-image" className="img-responsive post-image" />
                                    <div className="post-container">
                                        <img src="images/users/user-1.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Sarah Cruiz</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Published a photo about 15 mins ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 13</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-11.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Diana </a><i className="em em-laughing" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-4.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Post Content
  ================================================= */}
                                <div className="post-content">
                                    {/*Post Date*/}
                                    <div className="post-date hidden-xs hidden-sm">
                                        <h5></h5>
                                        <p className="text-grey">10/22/2016</p>
                                    </div>{/*Post Date End*/}
                                    <img src="images/post-images/13.jpg" alt="post-image" className="img-responsive post-image" />
                                    <div className="post-container">
                                        <img src="images/users/user-1.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Sarah Cruiz</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Yesterday</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 49</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-11.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Diana </a><i className="em em-laughing" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-4.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Post Content
  ================================================= */}
                                <div className="post-content">
                                    {/*Post Date*/}
                                    <div className="post-date hidden-xs hidden-sm">
                                        <h5></h5>
                                        <p className="text-grey">10/21/2016</p>
                                    </div>{/*Post Date End*/}
                                    <div className="post-container">
                                        <img src="images/users/user-1.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Sarah Cruiz</a> <span className="following">following</span></h5>
                                                <p className="text-muted">2 days ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 49</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. <i className="em em-anguished" /> <i className="em em-anguished" /> <i className="em em-anguished" /></p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-11.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Diana </a><i className="em em-laughing" /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-4.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <Whotofollow/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer
================================================= */}
            <Footer />


        </>
    ) : <Redirect to={"/"} />
}

export default TimeLine
