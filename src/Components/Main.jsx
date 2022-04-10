import React from "react";
import { useNavigate } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import OfflineImg from "../Components/OfflineImg.jpg"

const Main = () => {

    const navigate = useNavigate()

    const userLogout = () => {
        navigate("/")
    }

  return (
    <div className="container-fluid">
     <Online>
     <h1 className="text-center text-primary bg-warning py-4">Welcome Back, User</h1>
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              className="welcome img-fluid"
              src="https://skitguys.com/media/images/video/Abstract_Nature_Welcome_01_CNM-HD.jpg"
              alt=""
            />
          </div>
 
        </div>
        <div className="text-center">
            <button className="btn btn-danger my-5" onClick={userLogout}>Logout</button>
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

export default Main;
