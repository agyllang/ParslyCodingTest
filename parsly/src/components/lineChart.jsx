import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import React from "react";

const CustomizedDot = (props) => {
  const { cx, cy, value,max,min } = props;
  // console.log("value", value);
  if (value > min && value < max) {
    return (
      <svg
        x={cx - 5}
        y={cy - 5}
        width={30}
        height={30}
        fill="green"
        viewBox="0 0 1024 1024"
      >
        <circle cx="150" cy="150" r="150" />
      </svg>
    );
  } else if (value < min) {
    return (
      <svg
      x={cx - 5}
      y={cy - 5}
      width={30}
      height={30}
      fill="blue"
      viewBox="0 0 1024 1024"
    >
      <circle cx="150" cy="150" r="150" />
    </svg>
    );
  } else {
    return (
      <svg
      x={cx - 5}
      y={cy - 5}
      width={30}
      height={30}
      fill="red"
      viewBox="0 0 1024 1024"
    >
      <circle cx="150" cy="150" r="150" />
    </svg>
    );
  }
};

const LineChartGraph = (props) => {
  const { data,tempMax,tempMin } = props;

  // console.log("data", data);
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={tempMax} label="Max temperature" stroke="red" />
          <ReferenceLine y={tempMin} label="Min temperature" stroke="blue" />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="temp"
            stroke="#000"
            dot={<CustomizedDot max={tempMax} min={tempMin} />}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
