import React, { useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import axios from 'axios'
import { Link, Redirect, useLocation } from 'react-router-dom';
import  jwt_decode from "jwt-decode"
import Loadingavatar from '../timeline/Loadingavatar';
function ChangePassword() {
    // const query = new URLSearchParams(useLocation().search);
    // const userID = query.get("userId");
    // console.log(userID)
    // let userID=JSON.parse(localStorage.getItem('userId'));
    // console.log(userID)
    let token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId
    // console.log(token)
    const [value, setvalue] = useState({
        oldPassword:'',
        newPassword:'',
        riderect: false,
        // rederect: false
      });
      const [loading,setLoading]=useState(false)
      const onchanglogin = (e) => {
         
        setvalue({ ...value, [e.target.name]: e.target.value })
      }
      const uppass = (e) => {
        e.preventDefault()
        console.log(value) 
        if(userId && token && value.oldPassword && value.newPassword){
          setLoading(true)
          fetch(`https://social-aht.herokuapp.com/api/v1/user/change-password/${userId}`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
            body:JSON.stringify({ "oldPassword": value.oldPassword,"newPassword": value.newPassword,})
        })
            .then(res => res.json())
            .then(
                (result) => {
                     // const spp=result.data;
                    if(result.state === true){
                          setLoading(false)
                          alert("thay đổi mật khẩu thành công!,..duy trì đăng nhập or login lại.!")
                          setvalue({riderect: true})
                      }else{
                          alert("lỗi....kiểm tra lại!")
                      }
                  // console.log(result)
                },
            )
        }else{
                    alert("error...điền đúng mật khẩu trước khi thay đổi!")
                  }
        
      }
      if (value.riderect) {
        return <Redirect to={'newsfeed'} />
    }

    const isloading=()=>{
      if(loading === false){
          console.log('okokok')
      }else{
          return(<Loadingavatar/>)
      }
  }
    return (
        <>
        <Header/>
            <div className="container">
  {/* Timeline
================================================= */}
  <div className="timeline">
    <div id="page-contents">
      <div className="row">
        <div className="col-md-3">
          {/*Edit Profile Menu*/}
        </div>
        <div className="col-md-7">
          {/* Change Password
  ================================================= */}
          <div className="edit-profile-container">
            <div className="block-title">
              <h4 className="grey"><i className="icon ion-ios-locked-outline" />Change Password</h4>
              <div className="line" />
              <p> dolores et quas molestias excepturi sint occaecati cupiditate</p>
              <div className="line" />
            </div>
            <div className="edit-block">
              <form name="update-pass" id="education" className="form-inline">
                <div className="row">
                  <div className="form-group col-xs-6 m-auto">
                    <label htmlFor="my-password">Old password</label>
                    <input   className="form-control input-group-lg"
                     type="password"
                     onChange={(e) => onchanglogin(e)}
                     Value={value.oldPassword}
                     name="oldPassword"
                      title="Enter password" placeholder="Old password" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-xs-6">
                    <label>New password</label>
                    <input className="form-control input-group-lg" type="password"
                     title="Enter password" 
                     onChange={(e) => onchanglogin(e)}
                     Value={value.newPassword}
                     name="newPassword"
                     placeholder="New password" />
                  </div>
                </div>
                <button onClick={(e) => uppass(e)} className="btn btn-primary uppass">update {isloading()}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <Footer/>

        </>
    )
}

export default ChangePassword
