import React, { Fragment } from 'react'
import { Line, Radar } from 'react-chartjs-2'




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
      time: each.time
    }
  })
  return temperatureData.concat([{ type: "line" }]);
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
          data: returnSpecific(dataSet, 'apparentTemperature')
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
  const data = chartStruct(lineDataSet);
  console.log(data);
  return (<div className="chart-group">
    <h2>the fuckng charts!</h2>
  </div>)
}


export default Charts;



///please i want to test on internet ,, how it looks like ,,,, please.. i eat de fishh
