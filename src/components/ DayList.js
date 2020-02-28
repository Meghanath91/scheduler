//Daylist compo <== child of Application compo
import React from "react";
import DayListItem from "components/DayListItem";


function DayList(props) {
  const listOfDays = props.days
    ? props.days.map(day => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay}
            data-testid="day"
          />
        );
      }): [];
    
  return <ul>{listOfDays}</ul>;
}
export default DayList;
