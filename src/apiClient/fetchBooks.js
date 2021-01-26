import { get } from "Src/apiClient";
const fetchBooks = ({searchType, term, page, limit, callback }) => {
    get( `/api/search?${searchType}=${term}&page=${page}&limit=${limit}` )
    .then(data => {
        if ( data?.docs && callback) callback(data);
    });
};
export default fetchBooks;
