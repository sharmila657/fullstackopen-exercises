import { useState } from 'react'
import MyButton from './components/Button'
import Header from './components/Header'
import Statistics from './components/Statistics'

const App = () => {
  const title1 = 'give feedback'
  const title2 = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const increment = (state,setState) =>() => {
  //   setState(state + 1)
  // }

  const addGood = (good,setGood) => () => {
    setGood(good + 6);
  }
  const addNeutral = (neutral, setNeutral)=> () => {
    setNeutral(neutral + 2);
  }
  const addBad = (bad, setBad)=> () => {
    setBad(bad + 1);
  }
  let check = good || neutral || bad


  return (
    <div>
      <Header title1 = {title1} />
      <MyButton someFunction= {addGood(good,setGood)} text={"good"} />
      <MyButton someFunction= {addNeutral(neutral,setNeutral)} text={"neutral"} />
      <MyButton someFunction = {addBad(bad,setBad)} text = {"bad"} />
      
      <Header title2={title2} />
      {
          check ? (
            <Statistics good={good} neutral={neutral} bad={bad} />
          ) : <p>'No Feedback Yet!'</p>
        }
    </div>
  )
}

export default App;