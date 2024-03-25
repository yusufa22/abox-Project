function eve(){document.querySelector('#message').style.color = 'transparent';}

function sendData(location){

    function createData(){

        const formData = new FormData(document.querySelector('form'))
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password') 

        const user = {
        name, 
        email,  
        password
        }  

        return user 

    }

    let userSent = JSON.stringify(createData())
    let message = '' 

    fetch(location, {
        method: "POST",
        body: userSent})
    .then(response=>response.json())
    .then(json=>{
        if(json.link !== undefined){window.location = json.link}
        else if(json.message === `error: duplicate key value violates unique constraint "users_email_key"`){
            document.querySelector('#email').value = ''
            message = 'email is already taken'
        }
        else{
            message = 'something went wrong'
        }
        document.querySelector('#message').style.color = 'red';
        document.querySelector('#message').innerHTML = message;
    })
    .catch((error)=>{"something went wrong\n" + error})
}


function popUp(){
    document.getElementById('popup').style.color = 'white'; 
} 


const form = document.querySelector('form'); 
const validation1 = document.querySelector('#password1');
const validation2 = document.querySelector('#password2'); 

function e(){


    form.addEventListener('submit', (event)=>{
        event.preventDefault()
        if(validation1.value !== validation2.value || validation1.value.length < 5 || validation2.value.length < 5){
         if(validation2.value !== validation1.value){

            document.getElementById('six').style.color = 'black';
            document.getElementById('password1').value = '';
            document.getElementById('password2').value = ''; 
            document.getElementById('popup').style.color = 'red';


        }
         else{
        
            document.getElementById('popup').style.color = 'white';
            document.getElementById('six').style.color = 'red';
            document.getElementById('password1').value = '';
            document.getElementById('password2').value = '';
        
        }}
        else{

            
            document.getElementById('popup').style.color = 'white';
            document.getElementById('six').style.color = 'black'

            sendData('http://192.168.1.65:8081/apipost/registration')
            
            }
    })


}



popUp()


e()

