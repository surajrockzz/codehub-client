
import React from 'react'

function Logout(props){
    window.localStorage.removeItem("JWT");
    window.location='/login'
    return <div> successfully user logged out</div>
}

export default Logout