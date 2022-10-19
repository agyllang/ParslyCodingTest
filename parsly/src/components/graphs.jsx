import {
  BarChart,
  ComposedChart,
  Bar,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea,
  ResponsiveContainer,
  Label,
} from "recharts";
import React from "react";

const Graphs = (props) => {
  const { data, tempMax, tempMin, humidMax, humidMin, wndSpdMax } = props;

  return (
    <div style={{ width: "100%", height: "30vh" }}>
      <ResponsiveContainer>
        <ComposedChart
          syncId="anyId"
          data={data}
          height={200}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <Legend />

          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="temp"
            stroke="#000"
            yAxisId="left"
          />
          <YAxis
            type="number"
            domain={[0, 40]}
            dataKey="temp"
            label={{
              value: "Temperature (°C)",
              angle: -90,
              position: "insideLeft",
            }}
            yAxisId="left"
          />

          <Bar
            dataKey="tempChange"
            yAxisId="left"
            barSize={5}
            fill="rgba(255, 163, 163,0.7)"
          />
          <ReferenceArea
            yAxisId={"left"}
            y2={tempMax}
            y1={tempMin}
            stroke="red"
            strokeOpacity={0.1}
            isFront={false}
            label={
              <Label
                position={"insideTopLeft"}
                value={`Temperature limits °C [${tempMin}-${tempMax}]`}
              ></Label>
            }
          />
          <Tooltip />
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <BarChart
          syncId="anyId"
          data={data}
          height={200}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="datetime" />
          <Legend />
          <Tooltip />
          <ReferenceLine
            y={wndSpdMax}
            label={
              <Label
                position={"insideTopLeft"}
                value={`Max Wind speed (ms): ${wndSpdMax}`}
              ></Label>
            }
            stroke="red"
            strokeDasharray="3 3"
          />

          <Bar dataKey="wind_spd" barSize={20} fill="rgba(202, 130, 192,0.4)" />
          <YAxis
            type="number"
            dataKey="wind_spd"
            label={{
              value: "Wind speed (m/s)",
              angle: -90,
              position: "insideLeft",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          height={200}
          syncId="anyId"
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="rh" /> */}
          <ReferenceLine
            y={humidMax}
            label={
              <Label
                position={"insideTopLeft"}
                value={`Max humidity (%): ${humidMax}`}
              ></Label>
            }
            stroke="red"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={humidMin}
            label={
              <Label
                position={"insideTopLeft"}
                value={`Min humidity (%): ${humidMin}`}
              ></Label>
            }
            stroke="red"
            strokeDasharray="3 3"
          />
          <XAxis dataKey="datetime" />

          <YAxis
            label={{
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Area type="monotone" dataKey="rh" stroke="#49a36b" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;
