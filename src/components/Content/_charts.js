import React, { Fragment } from 'react'
import { Line, Radar } from 'react-chartjs-2'




const toHumanTime = (time) => {
  const newTime = new Date(time * 1000);
  // const AM_PM = newTime.getHours() > 12 ? "PM" : "AM";
  // const hours = newTime.getHours() > 12 ? newTime.getHours() - 12 : newTime.getHours();
  // const minutes = newTime.getMinutes() < 10 ? String(newTime.getMinutes()) + "0" : String(newTime.getMinutes());
  // const seconds = newTime.getSeconds() < 10 ? String(newTime.getSeconds()) + "0" : String(newTime.getSeconds());
  // console.log(`The time is ${String(hours)}:${minutes}:${seconds} ${AM_PM}`);
  console.log(`The time is ${String(newTime.getHours() - 1)}`);
}


const getSelectedTime = (data) => {
  const timeRanges = [0, 4, 8, 12, 16];
  const filtered = data.filter((each, index) => {
    if (timeRanges.indexOf(index) != -1) {
      return each;
    }
  })
  return filtered;
}

const lineData = (values) => {
  const temperatureData = values.map((each) => {
    return {
      temp: each.apparentTemperature,
      time: toHumanTime(each.time)
    }
  })
}

const radarData = (values) => {

}


const returnSpecific = (val, legend) => {
  const data = val.filter((each) => {
    return each.hasOwnProperty('time')
  }).map((each) => {
    return each[legend];
  })
  return data;
}


const chartStruct = dataSet => {
  let type = dataSet.filter((each) => {
    return each.hasOwnProperty('type');
  }).map((result) => {
    return result.type
  }).toString();

  switch (type) {
    case "line":
      return {
        labels: returnSpecific(dataSet, 'time'),
        datasets: [{
          label: "4-hour Temperature Status",
          data: returnSpecific(dataSet, 'temp'),
          backgroundColor: ['rgba(255,255,255,0.90)'],
        }]
      }
    case "radar":
      console.log('dadada')
      break;
    default:
      console.log('something went wrong...')
  }
}

const Charts = (props) => {
  const lineDataSet = lineData(getSelectedTime(props.data));
  return (<div className="chart-group">
    <h2>the tfuckng charts!</h2>
    {/* <Line daa={chartStruct(lineDataSet)} /> */}
  </div>)
}


export default Charts;
