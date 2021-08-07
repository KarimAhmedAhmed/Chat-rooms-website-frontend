import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./RegisterScreen.css";

const RegisterScreen = ({history}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
        
    }, [history])

    const registerHandler = async (e) =>{
        e.preventDefault();
        var bodyFormdata = new FormData();
        bodyFormdata.append('username',username);
        bodyFormdata.append('email',email) ;
        bodyFormdata.append('password',password);
        console.log(bodyFormdata);
        const config = {
            headers:{
                "content-type" : "multipart/form-data"

            }
        }
        if(password !== confirmpassword) {
            setPassword("");
            setConfirmpassword("");
            setTimeout(() =>{
                setError("");
            }, 5000);
            return setError("Password does not match");
        }

        try {
            const {data} = await axios.post("/account/register", bodyFormdata, config);
            console.log(data);
            if(data.status === 0){
                setError(data.message);
                setTimeout(() => {
                    setError("");
                }, 5000);
            }else{
                localStorage.setItem("authToken", data.data.token);

            history.push("/")
            }
            
        } catch (error) {
            console.log(error);
            setError(`${error}`);
            setTimeout(() => {
                setError("");
            }, 5000);
        }



    }
    return (
        <div className=" register-screen">
            <form onSubmit={registerHandler} className="register-screen__form">
                <h3 className="register-screen__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" required id="name" placeholder="Enter username" value={username}
                        onChange={(e) => setUsername(e.target.value)} />


                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" required id="email" placeholder="Enter email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />


                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" required id="password" placeholder="Enter password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />


                </div>

                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm password:</label>
                    <input type="password" required id="confirmpassword" placeholder="Confirm password" value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)} />


                </div>

                <button type = "submit" className="btn btn-primary">Register</button>

                <span className="register-screen__subtext">Already have an account? <Link to="/login">Login</Link></span>



            </form>

        </div>
    )
}


export default RegisterScreen;