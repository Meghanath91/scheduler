import React from "react";
import classnames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
const formatSpots = function(spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining";
  } else if (spots > 1) {
    return `${spots} spots remaining`;
  }
};
