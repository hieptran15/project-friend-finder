import React, { useState, useEffect } from 'react'
import { Modal, Button} from "antd"
import  jwt_decode from "jwt-decode"
import { useLocation } from 'react-router-dom'
function StoreInfo() {

    const [modal2, setmodal2] = useState({
        visible2: false,
    })
    const [modal3, setmodal3] = useState({
        visible3: false,
    })
    const [timel, settimel] = useState([]);
    const [story,setstory]=useState('');
    const [info, setinfo] = useState({
        email:'',
        phone:'',
        birthday:'',
        address:'',
        relationship:null,
        gender:null
      });

//get.............................................................//
        let token = JSON.parse(localStorage.getItem('aulogin'));

        var decoded = jwt_decode(token);
       let userId=decoded.userId

       const query = new URLSearchParams(useLocation().search);
       const userID = query.get("userId");

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
                },
            )
    }, [userID])
//ichange button......................................................................//
const styless=()=>{
    if(userId === userID){
        return( <Button style={divStyle} type="" onClick={() => showModal2()}>edit store</Button>)
    }else{
        return(<Button style={divStyle1} type="" onClick={() => showModal2()}>edit store</Button>)
    }
}
const styless2=()=>{
    if(userId === userID){
        return( <Button style={divStyle} type="" onClick={() => showModal3()}>edit information</Button>)
    }else{
        return(<Button style={divStyle1} type="" onClick={() => showModal3()}>edit information</Button>)
    }
}
    const divStyle  = {
        display:"block"
    };
    const divStyle1  = {
        display:"none"
    };

//update store.............................................................//
    const onchangeStory=(e)=>{
        let value1=e.target.value
       setstory(value1)
    }
    const saveStory=(e)=>{
        setmodal2({ visible: false, });
        e.preventDefault()
        console.log(story)
       fetch(`https://aht-social.herokuapp.com/api/v1/user/update-story/${userId}`,{
           method:'PUT',
           headers:new Headers({
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
            }),
            body:JSON.stringify({ "story":story})
       }).then(res =>res.json())
        .then((result)=>{
                // const spp=result.data;
               if(result.state === true){
                     alert("update thành công!")
                    settimel({ 
                        ...timel,
                        story:story
                       } )
                 }else{
                     console.log('lỗi')
                 }
             console.log(result)
        })
    }

//check info.....................................//
    const relation=()=>{
        if(timel.relationship == 0){
            return 'single'
        }else if(timel.relationship == 1){
            return 'married'
        }else{
            return 'complex'
        }
    }
    const genderr=()=>{
        if(timel.gender == 0){
            return 'male'
        }else{
            return 'female'
        }
    }
//update information............................................//
    const onchanginfo=(e)=>{
            setinfo({...info, [e.target.name]: e.target.value})
    }
    const clickupinfo=(e)=>{
        setmodal3({ visible3: false, });
        console.log(info)
        e.preventDefault()
        if(userId && token)
        fetch(`https://aht-social.herokuapp.com/api/v1/user/update/${userId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
            body:JSON.stringify({ "email": info.email,
                                  "phone": info.phone,
                                  "birthday": info.birthday,
                                  "address": info.address,
                                  "relationship": info.relationship,
                                  "gender": info.gender,
                                })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.state === true){
                          alert("update thành công!")
                          settimel({ 
                            ...timel,
                           email:info.email,
                           phone:info.phone,
                           birthday:info.birthday,
                           address:info.address,
                           relationship:info.relationship,
                           gender:info.gender,
                           } )
                      }else{
                          alert('lỗi kiểm tra lại...!')
                      }
                },
            )

    }


//..............................//
    const showModal2 = () => {
        setmodal2({ visible2: true, });
    };

    const handleOk2 = e => {
        console.log(e);
        setmodal2({ visible2: false, });
    };

    const handleCancel2 = e => {
        console.log(e);
        setmodal2({ visible2: false, });
    };
//...........................//
    const showModal3 = () => {
        setmodal3({ visible3: true, });
    };

    const handleOk3 = e => {
        console.log(e);
        setmodal3({ visible3: false, });
    };

    const handleCancel3 = e => {
        console.log(e);
        setmodal3({ visible3: false, });
    };
//...............................//
    return (
        <>
            <div className="infostore">
                <div className="iconstore">
                    <i class="fa fa-globe"></i> <span>INTRODUCE </span>
                </div>
                <div className="storeuser">
                    <p>{timel.story}</p>
                   {styless()}
                    <Modal footer={null} visible={modal2.visible2} onOk={() => handleOk2()} onCancel={() => handleCancel2()}>
                        <div className="inutr">
                            <input  defaultValue={timel.story} onChange={(e) => onchangeStory(e)} className="form-control input-group-lg" type="text" name="story"  />
                            <button className=" btn btn-primary storw" onClick={(e)=>saveStory(e)}>Save</button>
                        </div>
                    </Modal>
                </div>
                <div className="infouser">
                    <ul>
                        <li><b><i class="fa fa-envelope"></i>:</b> {timel.email}</li>
                        <li><b>phone:</b> {timel.phone}</li>
                        <li><b>birthday:</b> {timel.birthday}</li>
                        <li><b>address:</b> {timel.address}</li>
                        <li><b>relationship:</b> {relation()}</li>
                        <li><b>gender:</b> {genderr()}</li>
                    </ul>
                    {styless2()}
                    <Modal footer={null} visible={modal3.visible3} onOk={() => handleOk3()} onCancel={() => handleCancel3()}>
                        <div className="inutr">
                            <form name="registration_form" id="registration_form" className="form-inline">
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <input  Value={timel.email} onChange={onchanginfo} className="form-control input-group-lg" type="text" name="email" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <input Value={timel.phone} onChange={ onchanginfo} className="form-control input-group-lg" type="text" name="phone" title="phone" placeholder="phone" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <input Value={timel.birthday} onChange={onchanginfo} className="form-control input-group-lg" type="date" name="birthday" title="birthday" placeholder="birthday" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <input Value={timel.address} onChange={ onchanginfo} className="form-control input-group-lg" type="text" name="address" title="address" placeholder="address" />
                                    </div>
                                </div>
                                <div className="form-group ">
                                 <p><b>relationship</b></p>
                                    <label className="radio-inline">
                                        <input type="radio" value={0}
                                        name='relationship'
                                         onChange={ onchanginfo}
                                          />single
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" value={1}

                                        name='relationship'
                                        onChange={onchanginfo}
                                         />married
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" value={2}

                                         name='relationship'
                                         onChange={onchanginfo}
                                        />complex
                                    </label>
                                </div>
                                <br/>
                                <div className="form-group gender">
                                   <p><b>gender</b></p> 
                                    <select name='gender' value={timel.gender}  onChange={onchanginfo}>
                                        <option value={0}>male</option>
                                        <option value={1}>female</option>
                                        <option value={2}>BD</option>
                                    </select>
                                 </div>

                            </form>
                            <button className=" btn btn-primary storw" onClick={(e)=>clickupinfo(e)}>Save</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default StoreInfo
