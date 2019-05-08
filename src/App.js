import React from 'react';
import './App.css';
import Machine from './components/Machine/Machine';
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

function App(props) {
  const  reduxStore = configureStore(props.result);
  return (
    <ReduxProvider store={reduxStore}>
      <div className="App">
        <header className="App-header">
          Chocolate vending machine
        </header>
        <Machine></Machine>
      </div>
    </ReduxProvider>
  );
}

export default App;
