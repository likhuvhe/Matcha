
const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const password = document.getElementById('pwd')
const confirmpassword = document.getElementById('pwd1')
const userName = document.getElementById('userName')

const regForm = document.getElementById('firstName')

const green = '#4CAF50'
const red = '#F44336'

function ValidateFirstName(){
    if (checkIfEmpty(firstName)) return
    let regExp = /^[a-zA-Z]{1,50}$/
    if (regExp.test(firstName)){
        setValid(firstName)
        return true;
    }
    else{
        setInvalid(firstName, "Invalid First Name")
        return false
    }
}

function checkIfEmpty(field){
    if(isEmpty(field.value.trim())){
        setInvalid(field, `${field.name} must not be empty`)
        return true
    }
    else{
        setValid(field)
        return false
    }
}

function isEmpty(value){
    if(value ==='') return true
    return false
}

function setInvalid(field, message){
    field.className = 'invalid'
    field.nextElementSibling.innerHTML = message
    field.nextElementSibling.style.color = red
}

function setValid(field){
    field.claaName = 'valid'
    field.nextElementSibling.innerHTML = ''
    field.nextElementSibling.style.color = green
}

export default ValidateFirstName


