import React from 'react';
import useForm from 'react-hook-form';

export default function Register(props) {
    const {register, handleSubmit} = useForm()
    let b = '';
    const  onSubmit = async(data) => {
        const response = await fetch('/register', {
            method: 'POST',
            redirect: 'manual',    
            headers: {
             'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)});
            let a = await response.json()
            b = a.anan
            document.getElementById("a").innerHTML = b+`<br/>`
            console.log(a)
            // props.history.push('/login')
        
}
    return(
        <div className="reg-form">
        <center>
        <h1>Sign Up for Matcha</h1>
        <form action="" onSubmit = {handleSubmit(onSubmit)}>
         <input type="email" name="email" placeholder="Email Address" ref={register}></input><br/>
         <input type="text" name="username" placeholder="username" ref={register}></input><br/>
         <span id="a"></span>
         <input type="text" name="firstname" placeholder="First Name" ref={register}></input><br/>
         <input type="text" name="lastname" placeholder="Lastname" ref={register}></input><br/>
         <input type="password" name="pwd" id="pwd" placeholder="password" ref={register}></input><br/>
         <input type="password" name="pwd1" id="pwd1" placeholder="Confirm password" ref={register} ></input><br/>
         <button type="submit">Register</button>
       </form>
        </center>
     </div>
    );
}