import { createStore, combineReducers } from 'redux';
import otpReducer from './reducer/otpReducer';

const rootReducer = combineReducers({
    otp: otpReducer,
});

const store = createStore(rootReducer);

export default store;
