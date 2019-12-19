import React from 'react';
import useForm from 'react-hook-form';
// import importScripts from 'import-scripts'
 
// importScripts('validateReg.js')

export default function Register(props) {
    const {register, handleSubmit} = useForm()

    const  onSubmit = async(data) => {
        const response = await fetch('/register', {
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
        if (res.fResult === true){
                props.history.push('/login')
        }
        else{
            props.history.push('/register')
        }
        
}

    return(
        <div className="reg-form">
        
        <center>
        <h1>Sign Up for Matcha</h1>
        <form action="" id="regForm" onSubmit = {handleSubmit(onSubmit)}>
         <span id="invalid"></span>
         <input type="email" name="email" id="email"  placeholder="Email Address" ref={register}></input><br/>
         <input type="text" name="username"  id="userName" placeholder="username" ref={register}></input><br/>
         <input type="text" name="firstname" id="firstName" placeholder="First Name" ref={register}></input><br/>
         <input type="text" name="lastname" id="lastName" placeholder="Lastname" ref={register}></input><br/>
         <input type="password" name="pwd" id="pwd" placeholder="password" ref={register}></input><br/>
         <input type="password" name="pwd1" id="pwd1" placeholder="Confirm password" ref={register} ></input><br/>
         <button type="submit">Register</button><br/>
       </form>
        </center>
     </div>
    );
}