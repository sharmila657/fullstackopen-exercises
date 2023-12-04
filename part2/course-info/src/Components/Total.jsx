const Total = ({ parts }) => {
    
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

    return <p>Total exercises: {totalExercises}</p>;
  }
export default Total;
  