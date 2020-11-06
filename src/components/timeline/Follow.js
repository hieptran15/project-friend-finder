import React, { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useLocation } from 'react-router-dom'
function Follow(props) {
    const [isfollow,setIsFlollow]=useState(true)
    const [isfollowers,setisfollowers]=useState(null)

    const { timeline } = props
    let token = JSON.parse(localStorage.getItem('aulogin'))

    var decoded = jwt_decode(token);
    let userId = decoded.userId

    const query = new URLSearchParams(useLocation().search);
    const userID = query.get("userId");

        // console.log(isfollowers)
        useEffect(() => {
            fetch(`https://social-aht.herokuapp.com/api/v1/user/get-user?user_id=${userID}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }),
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        // settimel(result.data);
                        const spp = result.data
                        const folow=result.data.followers
                             const ress=folow.filter(item => item == userId)
                        // console.log(ress[0])
                        setisfollowers(ress[0])
                    },
                )
        }, [userID])
// follow........................................//
    const follow = (id) => {

        fetch(`https://social-aht.herokuapp.com/api/v1/user/follow-user/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp = result;
                    console.log(spp)
                    if (result.state == true) {
                        // alert('following')
                        setIsFlollow(false)
                    }
                },
            )
    }
//unfollow..................................//
    const unFollow = (id) => {
        fetch(`https://social-aht.herokuapp.com/api/v1/user/unfollow-user/${id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`
            }),
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const spp = result;
                    console.log(spp)
                    if (result.state == true) {
                        // alert('unfollow')
                        setIsFlollow(true)
                        setisfollowers('')
                    }
                },
            )
    }
const ischangfolow=()=>{
    if(userId === userID){
        return (<li><button style={divStyle1} onClick={() => follow(timeline._id)} className="btn-primary">follow</button></li>)
    }else if(userId === userID){
        return(<li><button style={divStyle1} onClick={() => unFollow(timeline._id)} className="btn-primary">unfollow</button></li>)
    }else{
        return(changeFollow())
    }
}
    const changeFollow=()=>{
        if( isfollowers == userId){
            return ( <li><button onClick={() => unFollow(timeline._id)} className="btn-primary">unfollow</button></li>)
        }
        else if(isfollow == false){
            return ( <li><button onClick={() => unFollow(timeline._id)} className="btn-primary">unfollow</button></li>)
        }else if(isfollow == true){
            return(<li><button onClick={() => follow(timeline._id)} className="btn-primary">follow</button></li>) 
        } else{
            return(<li><button onClick={() => follow(timeline._id)} className="btn-primary">follow</button></li>) 
        }
    }

    const divStyle1 = { display:"none" };

    return (
        <>
            <ul className="follow-me list-inline">
                <li>1,299 people following her</li>
                {ischangfolow()}
            </ul>
        </>
    )
}

export default Follow
