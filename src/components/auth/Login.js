import React, {useState } from 'react'
import Register from './Register'
import { Redirect } from 'react-router-dom';
import { PostData } from '../services/PostData';
import { Link } from 'react-router-dom';
import { Modal} from "antd"
import 'antd/dist/antd.css';
import axios from 'axios'
import Loadingavatar from '../timeline/Loadingavatar';
import  jwt_decode from "jwt-decode"
import io from 'socket.io-client'

function Login() {

  const [value, setvalue] = useState({
    username: '',
    password: '',
    rederect: false
  });
  const [modal, setmodal] = useState({
    visible: false,
  })
  const [forgot, setforgot]=useState('')
  const [loading,setLoading]=useState(false)

  
//login.............................//
  const onchanglogin = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value })
  }
  const postlogin = () => {
    // console.log(value)
    localStorage.setItem('user', JSON.stringify(value.username));
    if(value.username && value.password){
      setLoading(true)
       PostData(value).then((result) => {
      let tada = result
      // console.log(tada)
      if (tada.token || tada.status===true) {
        localStorage.setItem('aulogin', JSON.stringify(tada.token));
        setvalue({ rederect: true })
        setLoading(false)

      } else {
        console.log('login error')
        alert("tài khoản hoặc mật khẩu không đúng!")
        setLoading(false)
      }
    })
    }else{
        alert("tài khoản hoặc mật khẩu không đúng!")
    }
  }
  if (value.rederect) {
    return <Redirect to={'/newsfeed'} />;
  }

//forget password.........................//
   const handleOnChange=(e)=>{
    setforgot(e)
    }
    const handclickmail=()=>{
      console.log(forgot)
     
      axios.post("https://social-aht.herokuapp.com/api/v1/user/forgetPassword", {
      "email": forgot,
    }).then(result => {
      let tada = result
      console.log(tada)
      if(forgot){
        if (tada.data.status === 200) {
          setmodal({visible: false, });
          alert("thành công...kiểm tra hòm thư của bạn!")
          }else{
            alert("lỗi....kiểm tra lại mail của bạn!")
          }
      }else{
        alert("vui lòng nhập email của bạn!")
      }
    }).catch(e => {
      console.log('error')
    });
    }
//gohome................................//
      const token = JSON.parse(localStorage.getItem('aulogin'))
    const gohome=()=>{
        if(!token){
          alert("please,login or regitster before go home!!!")
        }else{
          console.log('ok')
        }
    }
//modal,..............................//
   const showModal = () => {
    setmodal({visible: true, });
    };

    const handleOk = e => {
        console.log(e);
        setmodal({visible: false, });
    };

    const handleCancel = e => {
        console.log(e);
        setmodal({visible: false, });
    };
//loading.....................//
    const isloading=()=>{
      if(loading === false){
          console.log('')
      }else{
          return(<Loadingavatar/>)
      }
  }
//............................//
  return (
    <>
      <div id="lp-register">
        <br />
        <Link to="/newsfeed" onClick={()=>gohome()} className="dropdown-toggle tranghome" >HOME <i className="fa fa-hand-o-right" aria-hidden="true"></i> </Link>
        <div className="container wrapper">
          <div className="row">
            <div className="col-sm-5">
              <div className="intro-texts">
                <h1 className="text-white">Make Cool Friends !!!</h1>
                <p>Friend Finder is a social network template that can be used to connect people. The template offers Landing pages, News Feed, Image/Video Feed, Chat Box, Timeline and lot more. <br /> <br />Why are you waiting for? Buy it now.</p>
                <button className="btn btn-primary">Learn More</button>
              </div>
            </div>
            <div className="col-sm-6 col-sm-offset-1">
              <div className="reg-form-container">
                <div className="reg-options">
                  <ul className="nav nav-tabs">
                    <li className="active"><a href="#register" data-toggle="tab">Register</a></li>
                    <li><a href="#login" data-toggle="tab">Login</a></li>
                  </ul>
                </div>
                <div className="tab-content">
                  <Register />
                  <div className="tab-pane" id="login">
                    <h3>Login</h3>
                    <p className="text-muted">Log into your account</p>
                    <form name="Login_form" id="Login_form">
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="my-email" className="sr-only">Email</label>
                          <input id="my-email" className="form-control input-group-lg"
                            type="text" name="username" placeholder="user name"
                            onChange={(e) => onchanglogin(e)}
                            defaultValue={value.userName}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group col-xs-12">
                          <label htmlFor="my-password" className="sr-only">Password</label>
                          <input id="my-password" className="form-control input-group-lg"
                            type="password" name="password" title="Enter password" placeholder="Password"
                            onChange={(e) => onchanglogin(e)}
                            defaultValue={value.password}
                          />
                        </div>
                      </div>
                    </form>
                           <p><a  onClick={() => showModal()}> Forgot Password?</a></p>
                                <Modal footer={null} visible={modal.visible} onOk={() => handleOk()}onCancel={() => handleCancel()}>
                                      <h1>Forgot password?</h1>
                                     <input className="editfor" defaultValue={forgot} type="email" onChange={(e)=>handleOnChange(e.target.value)} placeholder="email đã đăng kí ..."/> 
                                     <button onClick={()=>handclickmail()} className="mt-3 btn btn-success">send</button>
                                </Modal>
                        <button className="btn btn-primary logineit" onClick={() => postlogin()}>Login Now {isloading()}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-sm-offset-6">
              <ul className="list-inline social-icons">
                <li><a ><i className="icon ion-social-facebook" /></a></li>
                <li><a ><i className="icon ion-social-twitter" /></a></li>
                <li><a ><i className="icon ion-social-googleplus" /></a></li>
                <li><a ><i className="icon ion-social-pinterest" /></a></li>
                <li><a ><i className="icon ion-social-linkedin" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Login
