import axios from 'axios';

export const FETCH_PERSONAL_INFO_SUCCESS = 'FETCH_PERSONAL_INFO_SUCCESS';
export const FETCH_EXPERIENCES_SUCCESS = 'FETCH_EXPERIENCES_SUCCESS';
export const FETCH_EDUCATION_SUCCESS = 'FETCH_EDUCATION_SUCCESS';

export const fetchPersonalInfoSuccess = (personalInfo) => ({
    type: FETCH_PERSONAL_INFO_SUCCESS,
    payload: personalInfo,
});

export const fetchExperiencesSuccess = (experiences) => ({
    type: FETCH_EXPERIENCES_SUCCESS,
    payload: experiences,
});

export const fetchEducationSuccess = (education) => ({
    type: FETCH_EDUCATION_SUCCESS,
    payload: education,
});

export const fetchPersonalInfoFromAPI =  async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/personal-info');
            dispatch(fetchPersonalInfoSuccess(response.data));
        } catch (error) {
            console.error('Error fetching personal info:', error);
        }
    };


export const fetchExperiencesFromAPI =   async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/experiences');
            dispatch(fetchExperiencesSuccess(response.data));
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };


export const fetchEducationFromAPI = async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:8000/api/education');
            dispatch(fetchEducationSuccess(response.data));
        } catch (error) {
            console.error('Error fetching education:', error);
        }
    };

