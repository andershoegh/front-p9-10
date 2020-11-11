import React from 'react'
import './App.scss'
import { Burgers }  from './Utils/ProductItems'
import ItemCard from './Components/ItemCard'

const App = () => {
  const burger = Burgers[0];

    return (
        <div className="App">
            <ItemCard name={burger.name} imgSrc={burger.imgSrc}/>
        </div>
    )
}

export default App
