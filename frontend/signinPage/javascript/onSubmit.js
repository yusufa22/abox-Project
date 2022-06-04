//importing dependencies
function eve(){document.querySelector('#message').style.color = 'transparent';}

function sendData(location){

    function createData(){

        const formData = new FormData(document.querySelector('form'))
        const name = formData.get('name')
        const email = formData.get('email').toLowerCase()
        const password = formData.get('password').toLowerCase() 

        const user = {
        name, 
        email,  
        password
        }  

        return user 

    }

    let userSent = JSON.stringify(createData())
    let message = '';

    let myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache'); 
    fetch(location, {
        method: "POST",
        body: userSent,
        headers: myHeaders,
        cache: 'no-store'
    })
    .then(response=>response.json())
    .then(json=>{
        console.log(userSent) 
        if(json.link !== undefined){window.location = json.link}

        else if(json.message === `TypeError: Cannot read property 'password' of undefined`){
            document.querySelector('#email').value = ''
            message = 'user with that email does not exist'
        }

        else if(json.message === `password is incorrect`){
            document.querySelector('#password').value = ''
            message = json.message
        }

        else{
            message = 'something went wrong'
        }
        document.querySelector('#message').style.color = 'red';
        document.querySelector('#message').innerHTML = message;
    })
    .catch((error)=>{"something went wrong\n" + error})
}


// calling a function to create, log to browser console and send the input data to backend servers.


function z(){
    event.preventDefault() 


        // calling function sendData to send input data to backend server for processing.

        
<<<<<<< HEAD
        sendData('https://abox-project.xyz/apipost/signin')
        


}
=======
        sendData('http://192.168.1.65:8081/apipost/signin')
        


}
>>>>>>> a5ab2df (added message to homepage)
