import React from 'react'
import Header from '../header/Header'
import { Link } from 'react-router-dom'

function TimelAlbum() {
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
                                        <h3>Sarah Cruiz</h3>
                                        <p className="text-muted">Creative Director</p>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-inline profile-menu">
                                        <li><Link to="/timeline">Timeline</Link></li>
                                        
                                        <li><Link to="/timeline-album" className="active">Album</Link></li>
                                        <li><a href="#">Friends</a></li>
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
                                    <li><a href="timeline-about.html">About</a></li>
                                    <li><a href="timeline-album.html" className="active">Album</a></li>
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
                                {/* Photo Album
  ================================================= */}
                                <ul className="album-photos">
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-1">
                                            <img src="images/album/1.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-1" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/1.jpg" alt="photo" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-2">
                                            <img src="images/album/2.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-2" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/2.jpg" alt="photo" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-3">
                                            <img src="images/album/3.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-3" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/3.jpg" alt="photo" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-4">
                                            <img src="images/album/4.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-4" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/4.jpg" alt="photo" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-5">
                                            <img src="images/album/5.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-5" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/5.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-6">
                                            <img src="images/album/6.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-6" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/6.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-7">
                                            <img src="images/album/7.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-7" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/7.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-8">
                                            <img src="images/album/8.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-8" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/8.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="img-wrapper" data-toggle="modal" data-target=".photo-9">
                                            <img src="images/album/9.jpg" alt="photo" />
                                        </div>
                                        <div className="modal fade photo-9" tabIndex={-1} role="dialog" aria-hidden="true">
                                            <div className="modal-dialog modal-lg">
                                                <div className="modal-content">
                                                    <img src="images/album/9.jpg" alt />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
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

export default TimelAlbum
