import React from "react";
import Card from "./Card";
import WithInfinityScroll from "./withInfinityScroll";
import Loader from "./Loader";

const ListCard = ({ limit, containerElement, loading }) => {
  const cards = [...Array(limit).keys()];

  return (
    <div ref={containerElement} className="list-container">
      {cards.map(element => (
        <Card key={element} />
      ))}
      {loading && <Loader />}
    </div>
  );
};

export default () => WithInfinityScroll(ListCard);
