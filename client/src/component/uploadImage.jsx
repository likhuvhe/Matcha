import React from 'react'

export default function UploadImage() {
    return (
        <div>
            <form action="/uploadImage" method="POST" enctype="multipart/form-data">
                <input type="file" name="pic" accept="image/*"></input><br/>
                <input type="submit"></input>
            </form>            
        </div>
    )
}
