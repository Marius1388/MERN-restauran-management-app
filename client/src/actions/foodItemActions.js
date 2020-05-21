import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from './types';
import {tokenConfig} from './authActions';
import {returnErrors} from './errorActions';

export const getFoodItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios.get('/api/foodItems').then( res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            }))
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status)))
};
export const addFoodItem = foodItem => (dispatch, getState) => {
    axios.post('/api/foodItems',foodItem, tokenConfig(getState))
        .then(res => 
            dispatch({
                type:ADD_ITEM,
                payload: res.data
            }))
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status)))

}

export const deleteFoodItem = id => (dispatch, getState) => {
   axios.delete(`/api/foodItems/${id}`, tokenConfig(getState)).then( res =>
   dispatch({
       type: DELETE_ITEM,
       payload: id
   })
   )
   .catch(err =>
    dispatch(returnErrors(err.response.data, err.response.status)))

}


export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}