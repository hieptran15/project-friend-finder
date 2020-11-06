import React from 'react'
import index from './index.css'
function Chat() {
    return (
        <>
          <div className="editchatbody collapse">
              <div className="editclose"><a><i class="fa fa-times"></i></a></div>
            <div className="chat-body ">
                <ul className="chat-message">
                    <li className="left">
                        <img src="images/users/user-2.jpg" alt className="profile-photo-sm pull-left" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Linda Lohan</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p>Hi honey, how are you doing???? Long time no see. Where have you been?</p>
                        </div>
                    </li>
                    <li className="right">
                        <img src="images/users/user-1.jpg" alt className="profile-photo-sm pull-right" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p>I have been on vacation</p>
                        </div>
                    </li>
                    <li className="right">
                        <img src="images/users/user-1.jpg" alt className="profile-photo-sm pull-right" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p>it was a great time for me. we had a lot of fun <i className="em em-blush" /></p>
                        </div>
                    </li>
                    <li className="left">
                        <img src="images/users/user-2.jpg" alt className="profile-photo-sm pull-left" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Linda Lohan</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p>that's cool I wish I were you <i className="em em-expressionless" /></p>
                        </div>
                    </li>
                    <li className="right">
                        <img src="images/users/user-1.jpg" alt className="profile-photo-sm pull-right" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                            </div>
                            <p><i className="em em-hand" /></p>
                        </div>
                    </li>
                    <li className="left">
                        <img src="images/users/user-2.jpg" alt className="profile-photo-sm pull-left" />
                        <div className="chat-item">
                            <div className="chat-item-header">
                                <h5>Linda Lohan</h5>
                                <small className="text-muted">a min ago</small>
                            </div>
                            <p>Hi there, how are you</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="send-message">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type your message" />
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Send</button>
                    </span>
                </div>
            </div>
            <div className="clearfix"></div>
            </div>
        </>
    )
}

export default Chat
