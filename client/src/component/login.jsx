import React from 'react'

const login = () => {
    return (
        <div>
        <br/>
        <form action="" method="POST">
            <input type="text" name="username" placeholder="username"></input><br/>
            <input type="password" name="pwd" id="pwd" placeholder="password"></input><br/>
            <button type="submit">LOG IN</button>
        </form>
        </div>
    )
}

export default login
