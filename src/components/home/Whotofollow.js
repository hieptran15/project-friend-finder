import React, { useState, useEffect } from 'react'
import  jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string';

Whotofollow.propTypes={
    pagination:PropTypes.object.isRequired,
    handlePageChange:PropTypes.func,
}
Whotofollow.defaultProps={
    handlePageChange:null,
}
function Whotofollow() {
    let token = JSON.parse(localStorage.getItem('aulogin'))
    var decoded = jwt_decode(token);
    let userId=decoded.userId
    // console.log(userId)
    const [isfollow,setIsFlollow]=useState(null)
    const [getuser,setgetuser]=useState(null)
    const [data, setdata] = useState([])
    const[getId,setGetId]=useState(null)
    const [pagination,setPagination]=useState({
        page:1,
        limit:10,
        totalRow:11
    })
    const [filter,setFilter]=useState({
        page:1,
    })
    useEffect(() => {
        const queryParams=queryString.stringify(filter)
        fetch(`https://aht-social.herokuapp.com/api/v1/user/get-all-user?${queryParams}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp=result.data.docs;
                    const count=result.data.page
                    setdata(spp)
                    setPagination({...pagination,page:count})
                    // console.log(result)
                },
            )
    }, [filter])
    // console.log(getuser)
// follow........................................//
    const follow=(value)=>{

        // const kpp=value.followers
        // const ress=kpp.filter(item => item == userId)
        // console.log(ress[0])
        // setgetuser(ress[0])

        const id=value._id
        setGetId(id)
        fetch(`https://aht-social.herokuapp.com/api/v1/user/follow-user/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp=result;
                    console.log(spp)
                    if(result.state == true){
                       alert('following')
                        setIsFlollow(true)
                    }
                },
            )
    }

//unfollow..................................
    const unFollow=(value)=>{
        const id=value._id
        fetch(`https://aht-social.herokuapp.com/api/v1/user/unfollow-user/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp=result;
                    console.log(spp)
                    if(result.state == true){
                        alert('unfollow')
                        setIsFlollow(false)
                    }
                },
            )
    }
    const handlePageChange=(e)=>{
            console.log(e)
            setFilter({
                ...filter,
                page:e,
            })
    }
    const toTalPage=Math.ceil(pagination.totalRow/pagination.limit)
    return (
        <div className="col-md-2 static">
            <div className="suggestions" id="sticky-sidebar">
                <h4 className="grey">Who to Follow</h4>
                {data.map((value, index) => {
                    return ( 
                         <div key={index} className="follow-user">
                            <img src={value.avatar} className="profile-photo-sm pull-left" />
                            <div>
                                <h5><Link to={`/timeline?userId=${value._id}`}>{value.firstName}{value.lastName}</Link></h5>
                                <a onClick={()=>unFollow(value)} className="text-green"></a>
                               <br/>
                                <a onClick={()=>follow(value)} className="text-green"></a>
                            </div>
                        </div>
                    )
                 })}
                <button className="nextPage" disabled={pagination.page <= 1} onClick={()=>handlePageChange(pagination.page - 1)}><i class="fa fa-caret-left"></i></button>
                <button  disabled={pagination.page >= 10} onClick={()=>handlePageChange(pagination.page + 1)}><i class="fa fa-caret-right"></i></button>
            </div>
        </div>
    )
}

export default Whotofollow
