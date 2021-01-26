import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "Store";
import SearchBook from "Features/SearchBook";
import Bookshelf from "Features/Bookshelf";
import "Scss/style.scss";
function App() {
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <main>
          <SearchBook className="border--bottom"/>
          <Bookshelf />
          </main>
        </PersistGate>
    </Provider>
  );
}
render(<App />, document.getElementById("root"));
