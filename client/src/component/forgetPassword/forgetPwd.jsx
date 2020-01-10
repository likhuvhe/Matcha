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
    return (
        <div>
            <form action="" onSubmit = {handleSubmit(onSubmit)}>
                <input type="email" name="email" placeholder="Enter email Address" ref={register}></input><br/>
                <button type="submit">submit</button>
            </form>
        </div>
    )
}
