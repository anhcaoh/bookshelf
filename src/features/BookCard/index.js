import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setResults, setLibrary } from "Store/actions";
import { Card } from "Components/Layout";
import { Label } from "Components/Typography";
import Button from "Components/Button";
import "./bookcard.scss";
const cover_url = process.env.APP_OPEN_LIBRARY_COVER_URL;
const BookCard = ({ book, results, library, setLibrary:_setLibrary }) => {
  const { cover_i, key, title, author_name, author_key } = book || {};
  const _keyNo = key.split("/")[2];
  let addedResultsKeys = [];
  library.forEach(addedBook => {
    results?.docs.forEach((doc) => {
      if ( doc.key === addedBook.key ) {
        addedResultsKeys.push(doc.key); 
      }
    });
  });
  const isAddedResultsIndex = addedResultsKeys.indexOf(key);
  const isAddedLibraryIndex = library.indexOf(book);
  const handleCheckout = (event) => {
    event?.preventDefault();
    if ( isAddedLibraryIndex === -1 ) {
      let _library = [...library];
      _library.push(book);
      _setLibrary(_library);
    }
  };
  const handleReturn = (event) => {
    event?.preventDefault();
    if (isAddedResultsIndex !== -1 || 
        isAddedLibraryIndex !== -1) {
      let _library = [...library];
      _library.splice(isAddedLibraryIndex, 1);
      _setLibrary(_library);
    }
  };
  const CallToAction = () => {
    return ( (isAddedResultsIndex !== -1 || 
              isAddedLibraryIndex !== -1 ) ? 
        (<Button id={`remove-${_keyNo}-from-library`}
        className={"clear"} 
        onClick={handleReturn}>
        Remove
      </Button>) :
      (<Button id={`add-${_keyNo}-to-library`} 
        className={"primary"} 
        onClick={handleCheckout}>
        Add
      </Button>)
    );
  };
  useEffect(() => {
    const bookTitleElems = document.querySelectorAll(".book-title");
    const bookAuthorElems = document.querySelectorAll(".book-author");
    bookTitleElems?.forEach(elem => {
      if( elem.offsetHeight > 72 ){
        elem.classList += " text--small";
      }
    });
    bookAuthorElems?.forEach(elem => {
      if( elem.offsetHeight > 48 ){
        elem.classList += " text--small";
      }
    });
  });
  return (
    <Card className="glass bookcard">
      <a href={`https://openlibrary.org/${key}`} 
      target="_blank">
      <img className="bookcover"
      title={title} width="180" height="270"
      src={cover_url + (cover_i || "10033172") + "-M.jpg"} /></a>
      <Label className="book-title">{title}</Label>
      <Label className="book-author">
      By {author_name?.map((author, index) => {
      return (<a id={author} target="_blank"
      href={"https://openlibrary.org/authors/" + author_key[0] + "/Books"}>
        {author}{((author_name.length > 1) && index < author_name.length - 1) ? ", " : ""}
      </a>);
      })}</Label>
      <CallToAction />
    </Card>
  );
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = { setResults, setLibrary };
export default connect(mapStateToProps, mapDispatchToProps)(BookCard);  