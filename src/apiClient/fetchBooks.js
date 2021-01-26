import { get } from "Src/apiClient";
const isProd = process.env.NODE_ENV === "production";
const baseUrl = isProd ? "https://openlibrary.org/search.json" : "/api/search";
const fetchBooks = ({searchType, term, page, limit, callback }) => {
    get( `${baseUrl}?${searchType}=${term}&page=${page}&limit=${limit}` )
    .then(data => {
        if ( data?.docs && callback) callback(data);
    }).catch(error => console.error(error)).then(callback);
};
export default fetchBooks;
