import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types'

export const getFoodItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/foodItems').then( res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
};
export const addFoodItem = foodItem => dispatch => {
    axios.post('/api/foodItems',foodItem)
        .then(res => 
            dispatch({
                type:ADD_ITEM,
                payload: res.data
            }))
}

export const deleteFoodItem = id => dispatch => {
   axios.delete(`/api/foodItems/${id}`).then( res =>
   dispatch({
       type: DELETE_ITEM,
       payload: id
   })
   )
}


export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}