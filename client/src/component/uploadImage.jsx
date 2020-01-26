import React from 'react'
import useForm from 'react-hook-form'

export default function UploadImage() {
    const {register, handleSubmit} = useForm()
const  onSubmit = async(data) => {  
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');

    // formData.append('username', 'abc123');
    formData.append('pic', fileField.files[0]);

    const response = await fetch('/uploadImage', {
    method: 'POST',
    body: formData
    })
    let res = await response.json()
    console.log(res)
}
        
    return (
        <div>
            <form action="/uploadImage" onSubmit={handleSubmit(onSubmit)}>
                <input type="file" name="pic" accept="image/*" ref={register}></input><br/>
                <input type="submit"></input>
            </form>            
        </div>
    )
}
