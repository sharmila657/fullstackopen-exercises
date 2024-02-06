import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'
const store = createStore(reducer)

const App = () => {
    const clickButton = (event) => {
      const dispatchType = event.target.name.toUpperCase();
    store.dispatch({
      type: dispatchType
    })
  }

  return (
    <div>
      <button onClick={(event) => clickButton(event)} name="good">
        good
      </button>
      <button onClick={(event) => clickButton(event)} name="ok">
        ok
      </button>
      <button onClick={(event) => clickButton(event)} name="bad">
        bad
      </button>
      <button onClick={(event) => clickButton(event)} name="zero">
        reset stats
      </button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
