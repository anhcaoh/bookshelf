import localBooks from "Src/apiClient/books.json";
import { SET_RESULTS, SET_LIBRARY, ADD_TO_LIBRARY, RESET } from "./constants";

const initialState = {
    "results": localBooks, //as Search results
    "library": [] //as Bookshelf
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RESULTS : {
            return { ...state, results: action.results };
        }
        case SET_LIBRARY : {
            return { ...state, library: action.library };
        }
        case ADD_TO_LIBRARY : {
            return {
                ...state, library: [...state.library, action.book]
            };
        }
        case RESET : {
            return initialState;
        }
        default: return state;
    }
}
export default rootReducer;