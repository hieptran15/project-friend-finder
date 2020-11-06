import React,{ useState, useEffect } from 'react'
import Header from '../header/Header'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
function Timeabout() {
    const [timel, settimel] = useState([]);
    const statete=useSelector(state => state.login.list)
    let token = JSON.parse(localStorage.getItem('aulogin'))
    let userid = statete
    // console.log(timel)
    useEffect(() => {
        console.log('did mount');
        fetch(`https://aht-social.herokuapp.com/api/v1/user/get-user?user_id=${userid}`, {
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
    return (
        <>
        <Header/>
            <div className="container">
                {/* Timeline
================================================= */}
                <div className="timeline">
                    <div className="timeline-cover">
                        {/*Timeline Menu for Large Screens*/}
                        <div className="timeline-nav-bar hidden-sm hidden-xs">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="profile-info">
                                        <img src="images/users/user-1.jpg" alt className="img-responsive profile-photo" />
                                        <h3>{timel.firstName} {timel.lastName}</h3>
                                        <p className="text-muted">Creative Director</p>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-inline profile-menu">
                                        <li><Link to="/timeline">Timeline</Link></li>
                                        <li><Link to="/timeline-about" className="active">About</Link></li>
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
                                <img src="images/users/user-1.jpg" alt className="img-responsive profile-photo" />
                                <h4>Sarah Cruiz</h4>
                                <p className="text-muted">Creative Director</p>
                            </div>
                            <div className="mobile-menu">
                                <ul className="list-inline">
                                    <li><a href="timline.html">Timeline</a></li>
                                    <li><a href="timeline-about.html" className="active">About</a></li>
                                    <li><a href="timeline-album.html">Album</a></li>
                                    <li><a href="timeline-friends.html">Friends</a></li>
                                </ul>
                                <button className="btn-primary">Add Friend</button>
                            </div>
                        </div>{/*Timeline Menu for Small Screens End*/}
                    </div>
                    <div id="page-contents">
                        <div className="row">
                            <div className="col-md-3" />
                            <div className="col-md-7">
                                {/* About
  ================================================= */}
                                <div className="about-profile">
                                    <div className="about-content-block">
                                        <h4 className="grey"><i className="ion-ios-information-outline icon-in-title" />Personal Information</h4>
                                            <p>ngay sinh: {timel.birthday}</p>
                                    </div>
                                    <div className="about-content-block">
                                        <h4 className="grey"><i className="ion-ios-briefcase-outline icon-in-title" />Work Experiences</h4>
                                        <div className="organization">
                                            <img src="images/envato.png" alt className="pull-left img-org" />
                                            <div className="work-info">
                                                <h5>Envato</h5>
                                                <p>Seller - <span className="text-grey">1 February 2013 to present</span></p>
                                            </div>
                                        </div>
                                        <div className="organization">
                                            <img src="images/envato.png" alt className="pull-left img-org" />
                                            <div className="work-info">
                                                <h5>Envato</h5>
                                                <p>Seller - <span className="text-grey">1 February 2013 to present</span></p>
                                            </div>
                                        </div>
                                        <div className="organization">
                                            <img src="images/envato.png" alt className="pull-left img-org" />
                                            <div className="work-info">
                                                <h5>Envato</h5>
                                                <p>Seller - <span className="text-grey">1 February 2013 to present</span></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="about-content-block">
                                        <h4 className="grey"><i className="ion-ios-location-outline icon-in-title" />Location</h4>
                                        <p>228 Park Eve, New York</p>
                                        <div className="google-maps">
                                            <div id="map" className="map" />
                                        </div>
                                    </div>
                                    <div className="about-content-block">
                                        <h4 className="grey"><i className="ion-ios-heart-outline icon-in-title" />Interests</h4>
                                        <ul className="interests list-inline">
                                            <li><span className="int-icons" title="Bycycle riding"><i className="icon ion-android-bicycle" /></span></li>
                                            <li><span className="int-icons" title="Photography"><i className="icon ion-ios-camera" /></span></li>
                                            <li><span className="int-icons" title="Shopping"><i className="icon ion-android-cart" /></span></li>
                                            <li><span className="int-icons" title="Traveling"><i className="icon ion-android-plane" /></span></li>
                                            <li><span className="int-icons" title="Eating"><i className="icon ion-android-restaurant" /></span></li>
                                        </ul>
                                    </div>
                                    <div className="about-content-block">
                                        <h4 className="grey"><i className="ion-ios-chatbubble-outline icon-in-title" />Language</h4>
                                        <ul>
                                            <li><a href="#">Russian</a></li>
                                            <li><a href="#">English</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 static">
                                <div id="sticky-sidebar">
                                    <h4 className="grey">Sarah's activity</h4>
                                    <div className="feed-item">
                                        <div className="live-activity">
                                            <p><a href="#" className="profile-link">Sarah</a> Commended on a Photo</p>
                                            <p className="text-muted">5 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="feed-item">
                                        <div className="live-activity">
                                            <p><a href="#" className="profile-link">Sarah</a> Has posted a photo</p>
                                            <p className="text-muted">an hour ago</p>
                                        </div>
                                    </div>
                                    <div className="feed-item">
                                        <div className="live-activity">
                                            <p><a href="#" className="profile-link">Sarah</a> Liked her friend's post</p>
                                            <p className="text-muted">4 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="feed-item">
                                        <div className="live-activity">
                                            <p><a href="#" className="profile-link">Sarah</a> has shared an album</p>
                                            <p className="text-muted">a day ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Timeabout
