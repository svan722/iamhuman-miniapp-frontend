const initialState = 
{
    value: '',
};

const otpReducer = (state = initialState, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case 'SET_OTP':
            return { ...state, ...action.payload };
        default:
            return state.value;
    }
};

export default otpReducer;
