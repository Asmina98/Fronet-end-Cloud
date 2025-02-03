import React ,{useState} from "react";
import axios, { Axios } from "axios";

const registerUrl = "https://nk31ys9nm4.execute-api.us-east-1.amazonaws.com/prod/register";
const Register = () => {
    const [email,setEmail] = useState('');
    const [userName,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submitHandler = (event) => {
        console.log("Submit");
        event.preventDefault();
        console.log('submit button is pressed!')
        if (!userName.trim() || !email.trim() || !password.trim()){
            setMessage('All fields are required');
            return;
        }
         
        const requestConfig = {
            headers: {
                'x-api-key' : "yoD8pwVkAZ8y6vcrU7y1B2Nb829AGg8g9DKixZqB"
            }
        }
        const requestBody = {
            email : email,
            userName : userName,
            password :password,
            
        }
     axios.post(registerUrl, requestBody,requestConfig).then(response => {
        setMessage('Registration Successful');
     }).catch(error=>{
        if(error.response.status ===403){
            setMessage(error.response.data.message);
        }else {
           setMessage('sorry the backend server is down!! please try again later');
        }
     })
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h5>Register</h5>
                
                email: <input type="text" value={email} onChange={event => setEmail(event.target.value)}/><br/>
                userName: <input type="text" value={userName} onChange={event => setUsername(event.target.value)}/><br/>
                password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/><br/>
                <input type="submit" value="Register"/>
                </form>
                {message && <p className="message">{message}</p>}
        </div>
    )
}

export default Register;