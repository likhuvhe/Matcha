import React from 'react'
import useForm from 'react-hook-form'

export default function UploadImage() {
    const {register, handleSubmit} = useForm()
    // const [uploadImage, setUploadImage] =  React.useState(true);
const  onSubmit = async() => {  
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"][multiple]');
   
    
    // formData.append('username', 'abc123');
    if (fileField.files.length > 5){
        document.getElementById("valid").innerHTML = `<span></span>` 
        document.getElementById("invalid").innerHTML = 'Error: maximum number 0f images you can upload is 5' +`<br/>`
        document.getElementById("invalid").style.color = '#F44336'
        document.getElementById("myForm").reset();
        return
    }
    for (let i = 0; i< fileField.files.length; i++){
        formData.append('pic', fileField.files[i]);
    }
    
    const response = await fetch('/uploadImage', {
    method: 'POST',
    
    body:formData
    })
    let res = await response.json()
    console.log(res.result)
    
   if (res.result === false){
    document.getElementById("valid").innerHTML = `<span></span>` 
    document.getElementById("invalid").innerHTML = `Error:` + res.message +`<br/>`
    document.getElementById("invalid").style.color = '#F44336'
    document.getElementById("myForm").reset();
   }else{
    document.getElementById("invalid").innerHTML = `<span></span>` 
    document.getElementById("valid").innerHTML =  res.message +`<br/>`
    document.getElementById("valid").style.color = '#00ff00'
    document.getElementById("myForm").reset();
   }
    
}  
    return (
        <div>
            <span id="invalid"></span>
            <span id="valid"></span>
            <form action="/uploadImage" onSubmit={handleSubmit(onSubmit)} id="myForm">
                <input type="file" name="pic" accept="image/*" ref={register} multiple></input><br/>
                <input type="submit"></input>
                <p>NOTE: Only image of type jpeg, jpg, png, and gif are accepted</p>
            </form>            
        </div>
    )
}
