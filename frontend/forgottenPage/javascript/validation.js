function eve(){document.querySelector('#message').style.color = 'transparent';}

function sendData(location){

    function createData(){

        const formData = new FormData(document.querySelector('form'))
        const email = formData.get('email')

        const user = { 
        email,  
        }  

        return user 

    }

    let userSent = JSON.stringify(createData())
    console.log(userSent)
    let message = '';

    fetch(location, {
        method: "POST",
        body: userSent})
    .then(response=>response.json())
    .then(json=>{
        if(json.link !== undefined){window.location = json.link}
        else if(json.message === `TypeError: Cannot read property 'password' of undefined`){
            message = 'user does not exist'
        }
        else{
            message = json.message
        }
        document.querySelector('#message').style.color = 'red';
        document.querySelector('#message').innerHTML = message;
    })
    .catch((error)=>{"something went wrong\n" + error})
}

document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault() 


        // calling function sendData to send input data to backend server for processing.

        
        sendData('http://localhost:8081/apipost/sendemail')
        


})