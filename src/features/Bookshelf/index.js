import React from "react";
import { connect } from "react-redux";
import { Block, Row } from "Components/Layout";
import { H1 } from "Components/Typography";
import BookCard from "Features/BookCard";
const Bookshelf = ({library}) => {
  return (
    <Block id="bookshelf">
      <H1>Bookshelf</H1>
      <Row className="carousel indent-left--1">
        {library?.map((book) => (
          <BookCard book={book} />
        ))}
        { !library?.length && 
          <Block className="text--center">No books added yet.</Block>
        || null }
      </Row>
    </Block>
  );
};
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Bookshelf);

