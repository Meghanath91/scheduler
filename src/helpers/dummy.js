const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
    }
  ],
  appointments: {
    "2": { id: 1, time: "12pm", interview: null },
    "1": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  }
};
console.log(state.days[0].name)
const newarr = state.days.filter(item => item.name === "Tuesday")
console.log("keystoiterate",newarr[0].appointments)
let keystoiterate= newarr[0].appointments;

const result =[];
console.log(state.appointments[1],"3pm");
for(let element of keystoiterate){
  result.push(state.appointments[element])
}

console.log(result);
