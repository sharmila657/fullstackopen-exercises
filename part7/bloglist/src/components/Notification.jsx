import { useSelector } from "react-redux";
const Notification=()=>{
  const notification = useSelector((state)=>state.notifications)
 
  const style = {
  border: "solid",
  padding: 10,
  boderWidth: 1,
};
if (notification === null) {
  return null;
}
return <div style={style}>{notification}</div>;
}

export default Notification;