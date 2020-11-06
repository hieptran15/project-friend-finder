import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loadingavatar from '../timeline/Loadingavatar';
function Register() {
  const [value, setvalue] = useState({
    firstName:'',
    lastName:'',
    email:'',
    username:'',
    password:'',
    birthday:'',
    gender:'',
    rederect: false
  });
  const [loading,setLoading]=useState(false)
  const onchanglogin = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value })
  }
  const singup = () => {
    console.log(value) 
  if(value.username || value.email){
    setLoading(true)
    axios.post("https://social-aht.herokuapp.com/api/v1/user/register", {
      "firstName": value.firstName,
      "lastName": value.lastName,
      "email": value.email,
      "username": value.username,
      "password": value.password,
      "birthday": value.birthday,
      "gender": value.gender
    }).then(result => {
      let tada = result
      console.log(tada)
     
      if (result.status === 200) {
        localStorage.setItem('ausingup', JSON.stringify(tada.data));
          setLoading(false)
          toast.success("Register success ! go to login")
      }else{
        toast.error("lỗi đường truyền... !")
      }
    }).catch(e => {
      console.log('error')
    });
  }else{
    toast.error("điền đủ thông tin trước khi đăng kí !")
    setLoading(false)
  }
   
  }
  //loading.....................
  const isloading=()=>{
    if(loading === false){
        console.log('okokok')
    }else{
        return(<Loadingavatar/>)
    }

}
  return (
    <div className="tab-pane active" id="register">
      <ToastContainer autoClose={2000} />
      <h3>Register Now !!!</h3>
      <p className="text-muted">Be cool and join today. Meet millions</p>
      <form name="registration_form" id="registration_form" className="form-inline">
        <div className="row">
          <div className="form-group col-xs-6">
            <label htmlFor="firstname" className="sr-only">First Name</label>
            <input id="firstname"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.firstName}
              className="form-control input-group-lg" type="text" name="firstName" title="Enter first name" placeholder="First name" />
          </div>
          <div className="form-group col-xs-6">
            <label htmlFor="lastname" className="sr-only">Last Name</label>
            <input id="lastname"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.lastName}
              className="form-control input-group-lg" type="text" name="lastName" title="Enter last name" placeholder="Last name" />
          </div>
          <div className="form-group col-xs-6">
            <label htmlFor="email" className="sr-only">Email</label>
            <input id="email"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.email}
              className="form-control input-group-lg" type="email" name="email" title="Enter email" placeholder="email" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <label htmlFor="email" className="sr-only">username</label>
            <input id="email"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.username}
              className="form-control input-group-lg" type="text" name="username" title="Enter Email" placeholder="user name" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <label htmlFor="password" className="sr-only">Password</label>
            <input id="password"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.password}
              className="form-control input-group-lg" type="password" name="password" title="Enter password" placeholder="Password" />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-xs-12">
            <label htmlFor="day" className="sr-only">Date of Birth</label>
            <input id="day"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.birthday}
              className="form-control input-group-lg" type="date" name="birthday" title="dateBirth" placeholder="Date of Birth" />
          </div>
        </div>
          {/* <div className="form-group col-xs-12">
            <label htmlFor="gender" className="sr-only">Gender</label>
            <input id="gender"
              onChange={(e) => onchanglogin(e)}
              defaultValue={value.gender}
              className="form-control input-group-lg" type="text" name="gender" title="gender" placeholder="gender" />
          </div> */}
          
          <div className="form-group gender">
               <div><b htmlFor="gender" >Gender</b></div>
            <label className="radio-inline">
              <input  onChange={(e) => onchanglogin(e)}
              value={0} type="radio" name="gender" />Male
            </label>
            <label className="radio-inline">
              <input onChange={(e) => onchanglogin(e)}
              value={1} type="radio" name="gender" />Female
            </label>
          </div>

      </form>
      {/* <p><a>
            Already have an account?
      </a></p> */}
      <button onClick={() => singup()} className="btn btn-primary logineit">Register Now {isloading()}</button>
    </div>
  )
}

export default Register
