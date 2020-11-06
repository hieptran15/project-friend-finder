import React,{ useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux';
function Profile() {
    const [timel, settimel] = useState([]);
    let token = JSON.parse(localStorage.getItem('aulogin'));
    const statete = useSelector(state => state.login.list)
    console.log(statete)
    let iduser = statete
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
                    console.log(result)
                },
            )
    }, [])
    return (
        <>
            
        </>
    )
}

export default Profile
