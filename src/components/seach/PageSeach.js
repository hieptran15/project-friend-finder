import React from 'react'
import index from './index.css'
import Header from '../header/Header'
import { useSelector } from 'react-redux'
function PageSeach() {
    const getSearch=useSelector(state =>state.login.search)
    console.log(getSearch)
    return (
        <>
        <Header/>
            <div className="editto">
                <h1>kết quả tìm kiếm:</h1>
                    <ul className="editulseach">
                    {getSearch.map((value,key)=>{
                      return <li key={key}>{value.firstName} {value.lastName}</li>
                })}
                    </ul>
            </div>
        </>
    )
}

export default PageSeach
