import React, {useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { Offline, Online } from "react-detect-offline";
import OfflineImg from "../Components/OfflineImg.jpg"
import { useNavigate } from "react-router-dom";

const dataForms = () => {
    const data = localStorage.getItem("users");
    if(data){
        return JSON.parse(data)
    }else {
        return [];
    }
}



const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [state,setState] =useState(dataForms())
  const [email,setEmail] =useState("")
  const [password,setPassword]=useState("")

  useEffect (() => {
      localStorage.setItem("users", JSON.stringify(state))
  }, [state])

  const onSubmit = () => {
    let user = {
        email,
        password,
    };
    setState([...state, user])
    reset()
    navigate("/")
  };

  const navigate = useNavigate()


  return (
    <div>
     <Online>
     <div className="container d-flex justify-content-center align-items-center flex-column my-5 py-5 text-center">
        <div className="form-body">
        <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-primary">Registration Form</h1>
        <div>
          <label className='lab'>First name :</label>
          <input
            type="text" 
            {...register("firstname", { required: "first name is required" })}
            onKeyUp={() => {
                trigger("firstname")
            }}
          />
          {errors.firstname && (
            <small className="text-danger">{errors.firstname.message}</small>
          )}
        </div>
        <div>
          <label className='lab'>Last Name :</label>
          <input
            type="text" 
            {...register("lastname", { required: "last name is required" })}
            onKeyUp={() => {
                trigger("lastname")
            }}
          />
          {errors.lastname && (
            <small className="text-danger">{errors.lastname.message}</small>
          )}
        </div>
        <div>
          <label className='lab'>Email : </label>
          <input
            type="email" 
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
                message: "Invalid email address",
              },
            })}
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={() => {
                trigger("email")
            }}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
        <div>
          <label className='lab'>Mobile :</label>
          <input
            type="number"
            {...register("mobile", { required: "Mobile number is required" })}
            onKeyUp={() => {
                trigger("mobile")
            }}
          />
          {errors.mobile && (
            <small className="text-danger">{errors.mobile.message}</small>
          )}
        </div>
        <div>
          <label className='lab'>Password :</label>
          <input type="password" {...register("password", {required: "Password is required", pattern: {
              value: 
              "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$",
              message: "password is incorrect"
          }})} onChange={(e) => setPassword(e.target.value)}
          onKeyUp={() => {
                trigger("password")
            }}
          />
          {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
          )}
        </div>
        <div>
          <label className='lab'>Confirm Password :</label>
          <input type="password" {...register("passwordconfirm", {required: "Password is required", pattern: {
              validate: (value) => value === password || "The Password Dosenot match"
          }})}
          onKeyUp={() => {
                trigger("passwordconfirm")
            }}
          />
          {errors.passwordconfirm && (
              <small className="text-danger">{errors.passwordconfirm.message}</small>
          )}
        </div>
        <div>
            <button type="submit" className="btn btn-primary" >Submit</button>
        </div>
      </form>
        </div>
     </div>
     </Online>
     <Offline>
          <div className="text-center">
              <img className='img' src={OfflineImg} alt="" />
          </div>
      </Offline>
    </div>
  );
};

export default Register;
