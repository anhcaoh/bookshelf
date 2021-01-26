import { call, put, takeLatest } from "redux-saga/effects";
import { fetchBooks as _fetchBooks } from "Src/apiClient";

function* fetchBooks(action) {
  try {
    const user = yield call(_fetchBooks, action.payload);
    yield put({ type: "FETCH_BOOKS_SUCCEEDED", user: user });
  } catch (event) {
    yield put({ type: "FETCH_BOOKS_FAILED", message: event.message });
  }
}

function* onFetchBooks() {
  yield takeLatest("FETCH_BOOKS_REQUESTED", fetchBooks);
}

export default onFetchBooks;