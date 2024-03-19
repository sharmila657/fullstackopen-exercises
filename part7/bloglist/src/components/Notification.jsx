import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification=()=>{
  const notification = useSelector((state)=>state.notifications)
 
if (notification === null) {
  return null;
}
return(
<div>
<Alert severity="success">{notification}</Alert>
</div>)
}

export default Notification;