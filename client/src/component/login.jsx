import React from 'react'
import useForm from 'react-hook-form'

export default function Login(props) {
    const {register, handleSubmit} = useForm()

    const  onSubmit = async(data) => {
        const response = await fetch('/login', {
            method: 'POST',
            redirect: 'manual',    
            headers: {
             'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)});
            let res = await response.json()
           document.getElementById("invalid").innerHTML = `Error:` + res.message +`<br/>`
           document.getElementById("invalid").style.color = '#F44336'
        console.log(res.message)
        if (res.result === true){
                props.history.push('/userProfile')
        }
        else{
            props.history.push('/login')
        }
}
    return (
        <div>
            <br/>
            <span id="invalid"></span>
            <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="username" placeholder="username" ref={register}></input><br/>
            <input type="password" name="pwd" id="pwd" placeholder="password" required ref={register}></input><br/>
            <button type="submit">LOG IN</button>
            </form>
            <p><a href="/forgetPassword/forgetPwd">Forgot password</a></p>
        </div>
    )
}
// import React, { Component } from 'react'

// class Login extends React.Component{

//     constructor(props){
//         super(props);

//         this.state = {  jfghfghfgf}
//     }

//     //state compone

//     render() {
//         return (
//             html form 
//         )
//     }
// }

// export default Login;
