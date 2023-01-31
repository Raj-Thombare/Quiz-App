import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import Navbar from "../../components/Navbar/Navbar";

import classes from "./Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  const { email = "" } = user;
  console.log(email);
  return (
    <>
      <Navbar />
      <div className={classes["profile-content"]}>
        <div className={classes.profile}>
          <h1>Profile</h1>
          <div className={classes.main}>
            <p>Username: {user && email.slice(0, email.indexOf("@"))}</p>
            <p>Email: {user && email}</p>
            <Button variant="contained" color="primary" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
