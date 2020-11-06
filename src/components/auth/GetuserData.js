import React,{useState,useEffect} from 'react'
import Header from '../header/Header'

function GetuserData() {
 const [data,setdata]=useState([])
 let token=JSON.parse(localStorage.getItem('aulogin'))
//  console.log(token)
 useEffect(() => {
    // console.log('did mount');
    fetch("https://aht-social.herokuapp.com/api/v1/user/get-all-user", {
      method: 'GET',
      headers: new Headers({
        'Content-Type' : "application/json",
        'Authorization' : `Bearer ${token}`
      }),
    })
    .then(res => res.json())
    .then(
      (result) => {
        setdata(result.data);
        console.log(result)
      },
    )
}, [])
// console.log(data)
    return (
        <div className='mt-5'>
            <Header/>
            <h1>Tài khoản người dùng</h1>
            <br/>
            {data.map((value,index)=>{
               return <li key={index}><b>username</b> :{value.username}--- <b>ngày sinh</b> :{value.birthday}---<b>id:</b>:{value._id},<button>get</button></li> 
                     
            })}
            
        </div>
    )
}

export default GetuserData
