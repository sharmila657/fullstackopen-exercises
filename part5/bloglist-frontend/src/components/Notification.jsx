const Notification = ({ type, message }) => {
    if (message === null) {
      return null;
    }
    return (<div
      className={type === "errmessage" ? "errmessage" : "notification"} > {message}
    </div>)
}
  
export default Notification; 