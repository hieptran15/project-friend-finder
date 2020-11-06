import React, { useState, useEffect } from 'react'
import { Link, Redirect,} from 'react-router-dom';
import Header from '../header/Header';
import Whotofollow from './Whotofollow';
import Footer from '../footer/Footer';
import { useDispatch } from 'react-redux';
import { getIduser,} from '../../resoleredux/action';
import Chat from '../chatbox/Chat';
import  jwt_decode from "jwt-decode"
import BoxChat from '../chatbox/BoxChat';
import Statics from './Statics';
import io from 'socket.io-client'

function Newsfeed() {
    const dispatch=useDispatch()
    // console.log(statete)

    const [data, setdata] = useState([])
    const [toall,settoall]=useState([])
    
    // const iduser=JSON.parse(localStorage.getItem('userId'))
    const token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId
    // console.log(userId)
   
    useEffect(() => {

        // kết nối đến server

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
                    dispatch(getIduser(spp))
                    setdata(spp)
                    // console.log(spp)
                },
            )
            //........................
    }, [])

    //................
    return  (
        <>
            <div className=""> 
                <Header />
                <Chat/>
                {/* <PageSeach/> */}
                <div id="page-contents">
                    <div className="container">
                        <div className="row">
                            <Statics data={data}/>
                            <div className="col-md-7">
                                <div className="create-post">
                                    <div className="row">
                                        <div className="col-md-7 col-sm-7">
                                            <div className="form-group">
                                                <img src={data.avatar} className="profile-photo-md" />
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
                                </div>
                                <div className="post-content">
                                    <img src="images/post-images/1.jpg" alt="post-image" className="img-responsive post-image" />
                                    <div className="post-container">
                                        <img src="images/users/user-5.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Alexis Clark</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Published a photo about 3 mins ago</p>
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
                                <div className="post-content">
                                    <div className="video-wrapper">
                                        <video className="post-video" controls> <source src="videos/8.mp4" type="video/mp4" /> </video>
                                    </div>
                                    <div className="post-container">
                                        <img src="images/users/user-3.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Sophia Lee</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Updated her status about 33 mins ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 75</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 8</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-14.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Olivia </a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <i className="em em-anguished" /> Ut enim ad minim veniam, quis nostrud </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Sarah</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-2.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Linda</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <div className="post-container">
                                        <img src="images/users/user-2.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Linda Lohan</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Published a photo about 1 hour ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 23</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 4</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p><i className="em em-thumbsup" /> <i className="em em-thumbsup" /> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-12.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Cris </a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam <i className="em em-muscle" /></p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <img src="images/post-images/2.jpg" alt="post-image" className="img-responsive post-image" />
                                    <div className="post-container">
                                        <img src="images/users/user-4.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">John Doe</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Published a photo about 2 hour ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 39</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 2</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt</p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-13.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Brian </a>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-8.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Richard</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <div className="google-maps">
                                        <div id="map" className="map" />
                                    </div>
                                    <div className="post-container">
                                        <img src="images/users/user-3.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Sophia Lee</a> <span className="following">following</span></h5>
                                                <p className="text-muted"><i className="icon ion-ios-location" /> Went to Niagara Falls today</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 17</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Sarah </a>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <i className="em em-blush" /> <i className="em em-blush" /> </p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-content">
                                    <img src="images/post-images/11.jpg" className="img-responsive post-image" />
                                    <div className="post-container">
                                        <img src="images/users/user-9.jpg" alt="user" className="profile-photo-md pull-left" />
                                        <div className="post-detail">
                                            <div className="user-info">
                                                <h5><a href="timeline.html" className="profile-link">Anna Young</a> <span className="following">following</span></h5>
                                                <p className="text-muted">Published a photo about 4 hour ago</p>
                                            </div>
                                            <div className="reaction">
                                                <a className="btn text-green"><i className="icon ion-thumbsup" /> 2</a>
                                                <a className="btn text-red"><i className="fa fa-thumbs-down" /> 0</a>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-text">
                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                                            </div>
                                            <div className="line-divider" />
                                            <div className="post-comment">
                                                <img src="images/users/user-10.jpg" className="profile-photo-sm" />
                                                <p><a href="timeline.html" className="profile-link">Julia </a>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                                            </div>
                                            <div className="post-comment">
                                                <img src="images/users/user-1.jpg" className="profile-photo-sm" />
                                                <input type="text" className="form-control" placeholder="Post a comment" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                   
                                    <Whotofollow toallfolow={toall}/>
                                     {/* <BoxChat/> */}
                        </div>
                    </div>
                </div>
             
            </div> 
             <Footer/>
        </>
    )
}

export default Newsfeed
