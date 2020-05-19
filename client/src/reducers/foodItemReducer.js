import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING} from '../actions/types'

const initialState = {
    foodItems:[],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_ITEMS:
            return{
                ...state,
                foodItems: action.payload,
                loading: false
            }
        case DELETE_ITEM:
            return{
                ...state,
                foodItems: state.foodItems.filter(item =>item._id !== action.payload)
            }
        case ADD_ITEM:
            return{
                ...state,
                foodItems: [action.payload, ...state.foodItems]
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading: true
            }
            default:
                return state;
    }
}