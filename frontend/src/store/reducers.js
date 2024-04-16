import {
    FETCH_EDUCATION_SUCCESS,
    FETCH_EXPERIENCES_SUCCESS,
    FETCH_PERSONAL_INFO_SUCCESS,
} from './actions';

const initialState = {
    personalInfo: null,
    experiences: [],
    education: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PERSONAL_INFO_SUCCESS:
            return {
                ...state,
                personalInfo: action.payload,
            };
        case FETCH_EXPERIENCES_SUCCESS:
            return {
                ...state,
                experiences: action.payload,
            };
        case FETCH_EDUCATION_SUCCESS:
            return {
                ...state,
                education: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
