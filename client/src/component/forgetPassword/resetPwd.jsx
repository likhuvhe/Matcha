import React from 'react'
import useForm from 'react-hook-form';



export default function ResetPwd(props) {
    const {register, handleSubmit} = useForm()

    const  onSubmit = async(data) => {
        let url_string = window.location.href;
        let url = new URL(url_string);
        var token = url.searchParams.get("vkey");
        data.token = token
        console.log(data)
        const response = await fetch('/resetPwd', {
            method: 'POST',
            redirect: 'manual',    
            headers: {
             'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(data)});
            let res = await response.json()
           document.getElementById("invalid").innerHTML = `Error:` + res +`<br/>`
           document.getElementById("invalid").style.color = '#F44336'
         console.log(res)
        if (res.result === true){
                props.history.push('/login')
        }
        
}
    return (
        <div>
            <span id="invalid"></span>
            <form action="" onSubmit = {handleSubmit(onSubmit)}>
                <input type="password" name="password" placeholder="password" ref={register}></input><br/>
                <input type="password" name="confirmPass" id="pwd" placeholder="confirm password" ref={register}></input><br/>
                <button type="submit">submit</button>
            </form>            
        </div>
    )
}
