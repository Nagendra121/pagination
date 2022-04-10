import React, {useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import OfflineImg from "../Components/OfflineImg.jpg"

const dataForms = () => {
    const data = localStorage.getItem("users");
    if(data){
        return JSON.parse(data)
    }else {
        return [];
    }
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const navigate = useNavigate()

  const [mail,setMail]= useState("")
  const [password,setPassword]= useState("")
  const [users,setUsers]= useState(dataForms)
  console.log(users)

  useEffect (() => {

  },[])

  const filtered_arr = [];
  const onSubmit = () => {
     users.map((ele,i) => {
         if(ele.email == mail){
             filtered_arr.push(ele)
         }
     })
     filtered_arr.map(ele => {
        if (password == ele.password){
            navigate("/main")
        }else{
            alert("password is incorrect")
        }
     })
  };

  const onNewuser = () => {
      navigate("/register")
  }



  return (
    <div className="container d-flex justify-content-center align-items-center flex-column my-5 py-5 text-center">
      <Online>
      <div className="form-group form-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-primary my-5 ">Login Page</h1>
          <div className="p-2">
            <label>Email : </label>
            <br/>
            <input
              type="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                  message: "Invalid email address",
                },
              })} onChange={(e) => setMail(e.target.value)}
              onKeyUp={() => {
                trigger("email");
              }}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
           
          </div>
          <div className="p-2">
            <label>Password :</label>
            <br/>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    "^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*])(?=.{8,})",
                  message: "password is incorrect",
                },
              })} onChange={(e) => setPassword(e.target.value)}
              onKeyUp={() => {
                trigger("password");
              }}
            />
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <button type="submit" className="btn btn-primary m-3">Login</button>

          <br/>
          <button className="btn btn-secondary m-3"  onClick={onNewuser}> Register</button>
        </form>
      </div>
      </Online>
      <Offline>
          <div className="text-center">
              <img  className='img' src={OfflineImg} alt="" />
          </div>
      </Offline>
    </div>
  );
};

export default Login;
