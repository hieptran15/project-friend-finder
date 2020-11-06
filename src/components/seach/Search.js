import React, { useState } from 'react'
import Header from '../header/Header';
import { Button, Modal } from "antd";
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getSearch } from '../../resoleredux/action';

function Search() {
    const [data, setData] = useState([])
    const [value, setvalue] = useState('');
    const [modal, setmodal] = useState({
        visible: false,
    })
    let token = JSON.parse(localStorage.getItem('aulogin'))
    const isChange = (e) => {
        e.preventDefault();
        let value1 = e.target.value
        setvalue(value1)
    }
    const findSearch = (e) => {
        e.preventDefault();

        console.log(value)
        if(value){
             fetch(`https://social-aht.herokuapp.com/api/v1/user/search?q=${value}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        }).then(res => res.json())
            .then((result) => {
                const sult = result.data
                // console.log(result.state)
               
                    setData(sult)
                    setmodal({ visible: true, });

            })
        }else{
            return alert('điền từ cần tìm...')
        }
       
    }
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
    return (
        <>
            <form onSubmit={findSearch}  className="navbar-form navbar-right hidden-sm">
                <div className="form-group" >
                    <a className="nutSeach dropdown-toggle" onClick={(e) => findSearch(e)}><i className="icon ion-android-search " /></a>
                    <Modal footer={null} visible={modal.visible} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                        <h1>kết quả tìm kiếm cho: <span>{value}</span> </h1>
                       
                            {data.map((value, index) => {
                                return (
                                    <div key={index} className="follow-user">
                                        <img src={value.avatar} className="profile-photo-sm pull-left" />
                                        <div>
                                            <h5><Link to={`/timeline?userId=${value._id}`}>{value.firstName}{value.lastName}</Link></h5>
                                            {/* < a className="text-green">unfollow</a>
                                            <br />
                                            <a className="text-green">follow</a> */}
                                        </div> 
                                        <br/>
                                    </div>
                                   
                                )
                            })}
                        
                    </Modal>
                    <input type="text" onChange={(e) => isChange(e)} value={value} className="form-control" placeholder="Search friends, photos, videos" />
                </div>
            </form>
        </>
    )
}

export default Search
