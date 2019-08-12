import React, { Fragment } from "react";
import { Line } from "react-chartjs-2";

const toHumanTime = unixStamp => {
  const isMidnight = hour => {
    return hour <= 0 ? 12 : hour;
  };
  const newTime = new Date(unixStamp * 1000);
  const AM_PM = newTime.getUTCHours() >= 12 ? "PM" : "AM";
  const hours =
    newTime.getUTCHours() > 12
      ? newTime.getUTCHours() - 12
      : newTime.getUTCHours();

  return `${isMidnight(hours)}${AM_PM}`;
};

const toCelsius = f => {
  let converted = Math.floor(((f - 32) * 5) / 9);
  return converted;
};

const getSelectedRanges = data => {
  const timeRanges = [0, 4, 8, 12, 16];
  const filtered = data.filter((each, index) => {
    if (timeRanges.indexOf(index) != -1) {
      return each;
    }
  });
  return filtered;
};

const tempData = values => {
  const temperatureData = values
    .map(each => {
      return {
        temp: each.apparentTemperature,
        time: toHumanTime(each.time)
      };
    })
    .concat([{ type: "line" }]);
  return temperatureData;
};

const windData = values => {
  const windMeasureData = values
    .map(each => {
      return {
        bearing: each.windBearing,
        gust: each.windGust,
        speed: each.windSpeed,
        time: toHumanTime(each.time)
      };
    })
    .concat([{ type: "line" }]);
  return windMeasureData;
};

const returnSpecific = (val, legend) => {
  const data = val
    .filter(each => {
      return each.hasOwnProperty("time");
    })
    .map(each => {
      return each[legend];
    });
  return data;
};

const chartStruct = dataSet => {
  let type = dataSet
    .filter(each => {
      return each.hasOwnProperty("type");
    })
    .map(result => {
      return result.type;
    })
    .toString();
  switch (type) {
    case "line":
      return {
        labels: returnSpecific(dataSet, "time"),
        datasets: [
          {
            label: "Celsius",
            data: returnSpecific(dataSet, "temp").map(each => {
              return toCelsius(each);
            }),
            borderColor: ["#35AFC2"],
            backgroundColor: ["rgba(53,175,194,0.20)"],
            pointBackgroundColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
            fontColor: ["#ffff"]
          },
          {
            label: "Fahrenheit",
            data: returnSpecific(dataSet, "temp"),
            borderColor: ["goldenrod"],
            backgroundColor: ["rgba(217,200,13,0.12)"],
            pointBackgroundColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
            fontColor: ["#ffff"]
          }
        ]
      };
    case "radar":
      console.log("dadada");
      break;
    default:
      console.log("something went wrong...");
  }
};

const chartOptions = title => {
  return {
    title: {
      display: true,
      text: title,
      fontColor: "#ffff",
      fontSize: 20
    },
    legend: {
      labels: {
        fontColor: "#ffff"
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: { color: "rgba(255,255,255,0.40)" },
          ticks: { fontColor: "#fff" }
        }
      ],
      yAxes: [
        {
          gridLines: { color: "rgba(255,255,255,0.40)" },
          ticks: { beginAtZero: true, fontColor: "#fff" }
        }
      ]
    }
  };
};

const Charts = props => {
  const tempDataSet = tempData(getSelectedRanges(props.data));
  const windDataSet = windData(getSelectedRanges(props.data));
  
  console.log(windDataSet);

  return (
    <div className="chart-group">
      <Line
        data={chartStruct(tempDataSet)}
        options={chartOptions("Temperature")}
      />
    </div>
  );
};

export default Charts;
