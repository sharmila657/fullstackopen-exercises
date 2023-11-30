import { useState } from 'react'
import MyButton from './components/Button'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementgood = () => {
    setGood(good + 6)
  }

  const incrementneutral = () => {
    setNeutral(neutral + 2)
  }

  const incrementbad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      
      <MyButton someFunction={incrementgood} text={"good"} />
      <MyButton someFunction={incrementneutral} text={"neutral"} />
      <MyButton someFunction = {incrementbad} text = {"bad"} />
      
      <h1>statistics</h1>

      good {good} <br/>
      neutral {neutral} <br />
      bad {bad} 
      
    </div>
  )
}

export default App