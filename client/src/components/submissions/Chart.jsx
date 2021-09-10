import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Chart({ responses }) {
  const [usingPie, setUsingPie] = useState(true);
  const data = [];

  responses.forEach((r) => {
    if (Array.isArray(r)) {
      r.forEach((o) => {
        const index = _.findIndex(data, { name: JSON.stringify(o) });
        if (index === -1) {
          data.push({ name: JSON.stringify(o), value: 1 });
        } else {
          data[index] = { name: JSON.stringify(o), value: data[index].value + 1 };
        }
      });
    } else {
      const index = _.findIndex(data, { name: JSON.stringify(r) });
      if (index === -1) {
        data.push({ name: JSON.stringify(r), value: 1 });
      } else {
        data[index] = { name: JSON.stringify(r), value: data[index].value + 1 };
      }
    }
  });

  console.log(data);

  return (
    <div style={{ height: "500px" }}>
      <Button onClick={() => setUsingPie(!usingPie)}>toggle</Button>
      {usingPie && (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart width={400} height={400}>
            <Pie dataKey="value" data={data} innerRadius={40} outerRadius={80} fill="#82ca9d" />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
      {!usingPie && (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

Chart.propTypes = {
  responses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
