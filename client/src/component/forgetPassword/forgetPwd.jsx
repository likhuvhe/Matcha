import React from 'react'
import useForm from 'react-hook-form';

export default function ForgetPwd(props) {
    const {register, handleSubmit} = useForm()

    const  onSubmit = async(data) => {
        const response = await fetch('/forgetPwd', {
            method: 'POST',
            redirect: 'manual',    
            headers: {
             'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)});
            let res = await response.json()
        console.log(res.message)
        if (res.result === true){
            document.getElementById("invalid").innerHTML = `<span></span>` 
            document.getElementById("valid").innerHTML = `Email has been sent with instractions to reset your password` +`<br/>`
            document.getElementById("valid").style.color = '#00ff00'
            document.getElementById("myForm").reset();
        }
        else{
            document.getElementById("valid").innerHTML = `<span></span>` 
            document.getElementById("invalid").innerHTML = `Error:` + res.message +`<br/>`
            document.getElementById("invalid").style.color = '#F44336'
            document.getElementById("myForm").reset(); 
        }
        
}
    return (
        <div>
            <form action="" id="myForm" onSubmit = {handleSubmit(onSubmit)}>
            <span id="invalid"></span>
            <span id="valid"></span>
                <input type="email" name="email" placeholder="Enter email Address" ref={register}></input><br/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
