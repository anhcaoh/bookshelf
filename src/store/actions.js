import { FETCH_BOOKS_REQUESTED, SET_RESULTS, SET_LIBRARY, ADD_TO_LIBRARY, RESET } from "./constants";
const fetchBooks = (payload) => {
    return {
        type: FETCH_BOOKS_REQUESTED,
        payload: payload
    };
};
const setResults = ( results ) => {
    return {
        type: SET_RESULTS,
        results: results
    };
};
const addToLibrary = ( book ) => {
    return { 
        type: ADD_TO_LIBRARY, 
        book: book 
    };
};
const setLibrary = ( library ) => {
    return { 
        type: SET_LIBRARY, 
        library: library 
    };
};
const reset = () => {
    return { 
        type: RESET
    };
};
export { fetchBooks, setResults, setLibrary, addToLibrary, reset };