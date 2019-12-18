import React from 'react'

const header = () => {
    return (
    <div style={{backgroundColor: 'orange'}}>
    <header>
        <ul>
            <a href="/"><h1 style={{marginTop:0, lineHeight: 0, padding: 0}}>Matcha</h1></a>
            <a href="/login" style={{float: 'right', marginRight: '15px'}}>LOG IN</a>
        </ul>
     </header>
    </div>
    )
}

export default header

