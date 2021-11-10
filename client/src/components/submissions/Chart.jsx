import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  Cell,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// const COLORS = ["#8884d8", "#82ca9d", "#23b5bf", "#1281ca", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS = [
  "#38358C",
  "#8B89D9",
  "#191C59",
  "#92B6EF",
  "#404759",
  "#758EBF",
  "#5B3FBF",
  "#9677D9",
  "#D9BFD4",
  "#425B8C",
  "#0B1426",
];

const Chart = ({ responses, isRanking }) => {
  const [chartType, setChartType] = useState(0);
  const data = [];

  if (isRanking) {
    responses.forEach((r) => {
      r.forEach((option, index) => {
        const i = _.findIndex(data, { name: option });
        if (i === -1) {
          data.push({ name: option, frequency: index + 1 });
        } else {
          data[i] = { name: option, frequency: data[i].frequency + index + 1 };
        }
      });
    });

    const min = responses.length / _.minBy(data, "frequency").frequency;

    data.forEach((d) => {
      // eslint-disable-next-line no-param-reassign
      d.frequency = responses.length / d.frequency / min;
    });
  } else {
    responses.forEach((r) => {
      if (Array.isArray(r)) {
        r.forEach((o) => {
          const index = _.findIndex(data, { name: JSON.stringify(o) });
          if (index === -1) {
            data.push({ name: JSON.stringify(o), frequency: 1 });
          } else {
            data[index] = { name: JSON.stringify(o), frequency: data[index].frequency + 1 };
          }
        });
      } else {
        const index = _.findIndex(data, { name: JSON.stringify(r) });
        if (index === -1) {
          data.push({ name: JSON.stringify(r), frequency: 1 });
        } else {
          data[index] = { name: JSON.stringify(r), frequency: data[index].frequency + 1 };
        }
      }
    });
  }

  return (
    <div className="sb__chart">
      <div style={{ height: "500px" }}>
        {chartType === 0 && (
          <ResponsiveContainer>
            <PieChart>
              <Pie dataKey="frequency" data={data} innerRadius={40} outerRadius={80}>
                {data.map((entry) => (
                  <Cell key={entry} fill={COLORS[Math.floor(Math.random() * COLORS.length)]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
        {chartType === 1 && (
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="frequency">
                {data.map((entry) => (
                  <Cell key={entry} fill={COLORS[Math.floor(Math.random() * COLORS.length)]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
        {data.length > 2 && chartType === 2 && (
          <ResponsiveContainer>
            <RadarChart outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis />
              <Radar dataKey="frequency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="text-end">
        <Button className="shadow-none sb__btn-switch" onClick={() => setChartType(0)}>
          <div className="sb__pie-icon" />
        </Button>
        <Button className="shadow-none sb__btn-switch" onClick={() => setChartType(1)}>
          <div className="sb__bar-icon" />
        </Button>
        {data.length > 2 && (
          <Button className="shadow-none sb__btn-switch" onClick={() => setChartType(2)}>
            <div className="sb__hex-icon" />
          </Button>
        )}
      </div>
    </div>
  );
};

Chart.propTypes = {
  responses: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.arrayOf(PropTypes.string)])
  ).isRequired,
  isRanking: PropTypes.bool.isRequired,
};

export default Chart;
