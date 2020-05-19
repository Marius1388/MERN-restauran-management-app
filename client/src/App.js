import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar'
import MenuList from './components/MenuList'
import FooditemModal from './components/FoodItemModal'
import {Container} from 'reactstrap' 


import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store = {store}>
      <div>
          <AppNavbar></AppNavbar>
          <h1 style={{textAlign:'center'}}>These are the items from your menu: </h1> 
          <Container>
              <FooditemModal/>
              <MenuList></MenuList>
          </Container>
      </div>
    </Provider>
        
    )
}

export default App;
