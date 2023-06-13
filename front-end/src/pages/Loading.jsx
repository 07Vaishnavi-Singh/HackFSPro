import React ,{useState ,useEffect} from "react";
import Login from "./Login";
import RoomCreation from "./RoomCreation";


function Loading() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkUserCookie = () => {
        const userCookie = localStorage.getItem('user');
        const isAuthenticated = !userCookie;
        setIsLoggedIn(isAuthenticated);
      };
  
      checkUserCookie();
    }, []);


    return <div>
        {isLoggedIn ? (
        <Login />
      ) : (
        <RoomCreation />
      )}
    </div>
   
    }

export default Loading;