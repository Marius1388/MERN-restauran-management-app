import { combineReducers} from 'redux';
import foodItemReducer from './foodItemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
    foodItem: foodItemReducer,
    error: errorReducer,
    auth: authReducer
})