import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const OrderPriceChart = ({ orders }) => {

 return (
  <Card 
    className='mb-4 py-4 px-3 text-center' 
    style={{ 
      backgroundColor: '#2C3E50', 
      border: 'none', 
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', 
      borderRadius: '0', 
      marginTop: '20px', 
      marginBottom: '20px', 
      marginLeft: '10px',
      marginRight: '10px',
    }}
  >
    <Card.Title style={{ fontSize: '24px', fontWeight: '700', color: '#F1F0E8' }}>Order Price Chart</Card.Title>
    <ResponsiveContainer width='100%' height={350}>
      <BarChart
        data={orders}
        margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke="#E5E1DA" />
        <XAxis dataKey="name" stroke="#E5E1DA" />
        <YAxis stroke="#E5E1DA" />
        <Tooltip wrapperStyle={{ backgroundColor: '#34495E', border: '1px solid #E5E1DA' }} />
        <Legend wrapperStyle={{ color: '#E5E1DA' }} />
        <Bar
          type='monotone'
          dataKey='itemsPrice'
          fill='#7AC6E1'
          activeDot={{ r: 8 }}
        />
        <Bar
          type='monotone'
          dataKey='taxPrice'
          fill='#EB6F80'
          activeDot={{ r: 8 }}
        />
        <Bar
          type='monotone'
          dataKey='totalPrice'
          fill='#FFD949'
          activeDot={{ r: 8 }}
        />
      </BarChart>
    </ResponsiveContainer>
  </Card>
);
};

export default OrderPriceChart;
