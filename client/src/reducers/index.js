import { combineReducers} from 'redux';
import foodItemReducer from './foodItemReducer';

export default combineReducers({
    foodItem: foodItemReducer
})