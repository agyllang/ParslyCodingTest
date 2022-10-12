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
  const { cx, cy, value } = props;
  // console.log("value", value);
  if (value > 22 && value < 30) {
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
  } else if (value < 22) {
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
  const { data } = props;

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
          <ReferenceLine y={28} label="Max" stroke="red" />
          <ReferenceLine y={22} label="Min" stroke="blue" />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="temp"
            stroke="#000"
            dot={<CustomizedDot />}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartGraph;
