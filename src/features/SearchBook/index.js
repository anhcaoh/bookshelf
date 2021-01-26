import React, { useState } from "react";
import { connect } from "react-redux";
import { Block, Row } from "Components/Layout";
import { H1, Text } from "Components/Typography";
import Form from "Components/Form";
import Input from "Components/Input";
import Button from "Components/Button";
import Dropdown from "Components/Dropdown";
import BookCard from "Features/BookCard";
import { fetchBooks } from "Src/apiClient";
import IconSearch from "Icons/search-24px.svg";
import "./searchBook.scss";
const SearchBook = ({className, results}) => {
  const [books, setBooks] = useState(results);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");
  const [searchType, setSearchType ] = useState("q");
  const searchTypes = [
  {"id": "all", "value":"q", "label":"All", "selected": true}, 
  {"id":"title", "value":"title", "label":"Title"},
  {"id":"author", "value":"author", "label":"Author"}];
  const handleSearch = (event) => {
    event?.preventDefault();
    if(term){
      setLoading(true);
      const callback = (data) => {
        setBooks(data);
        setLoading(false);
      };
      fetchBooks({searchType, term, page, limit, callback});
    }
  };
  const handleOnChange = (event) => {
    event?.preventDefault();
    setTerm(event.target.value);
  };
  const SearchResults = ({results}) => {
    return (<Row className="carousel indent-left--1">
      {results?.docs?.map((doc) => <BookCard book={doc} />)}
      </Row>);
  };
  return (
    <Block id="search-book" 
      className={[className, "padding-bottom--4"].join(" ").trim()}>
      <H1>Search</H1>
      <Form className="vertical-space--2" 
        onSubmit={handleSearch}>
          <Block className="input__group">
            <Dropdown hideSelectOne={true} 
            options={searchTypes} 
            disabled={loading}
            onChangeHandler={(e, obj) => setSearchType(obj.value)}/>
            <Input id="search-term" 
            name="search-term" 
            disabled={loading}
            autoFocus={true}
            value={term} 
            onChangeHandler={handleOnChange}
            placeholder="Search term..."/>
            <Button type="submit" 
            name="search-submit"
            className="white button-search" 
            disabled={loading}>
              <IconSearch />
            </Button>
          </Block>
      </Form>
      {loading ? <Block className="loading text--center">
      <Text className="message">Loading...</Text>
      </Block> : null } 
      <SearchResults results={books}/>
      <Block className="circle glass" />
    </Block>
  );
};
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SearchBook);
  
  