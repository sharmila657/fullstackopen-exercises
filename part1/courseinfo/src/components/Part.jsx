const Part = ({val}) => {
    console.log(val)
    return(
        <div> 
         <p> {val.name} {val.exercises} </p>
       </div>
 
    )
}

export default Part;