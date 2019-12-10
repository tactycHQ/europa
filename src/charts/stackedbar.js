import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Input A', Debt: 4000, Equity: 2400, amt: 2400,
  },
  {
    name: 'Input B', Debt: 3000, Equity: 1398, amt: 2210,
  },
  {
    name: 'Input C', Debt: 2000, Equity: 9800, amt: 2290,
  },
  {
    name: 'Input D', Debt: 2780, Equity: 3908, amt: 2000,
  },
  {
    name: 'Input E', Debt: 1890, Equity: 4800, amt: 2181,
  },
  {
    name: 'Input F', Debt: 2390, Equity: 3800, amt: 2500,
  },
  {
    name: 'Input G', Debt: 3490, Equity: 4300, amt: 2100,
  },
]

export default function StackedBar (props) {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';
    return (
      <BarChart
        width={480}
        height={300}
        data={data}
        margin={{
          top: 30, right: 40, left: 30, bottom: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Equity" stackId="a" fill="#26a69a" />
        <Bar dataKey="Debt" stackId="a" fill="#4dd0e1" />
      </BarChart>
    )
}
