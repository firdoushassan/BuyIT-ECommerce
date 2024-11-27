import React from 'react';
import { Card } from 'react-bootstrap';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

const ProductPriceChart = ({ products }) => {
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
      <Card.Title style={{ fontSize: '24px', fontWeight: '700', color: '#F1F0E8' }}>Product Price Chart</Card.Title>
      <ResponsiveContainer width='100%' height={350}>
        <AreaChart
          data={products}
          margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke="#E5E1DA" />
          <XAxis stroke="#E5E1DA" />
          <YAxis stroke="#E5E1DA" />
          <Tooltip wrapperStyle={{ backgroundColor: '#34495E', border: '1px solid #E5E1DA' }} />
          <Legend wrapperStyle={{ color: '#E5E1DA' }} />
          <Area
            type='monotone'
            dataKey='price'
            stroke='#54B4D3'
            fill='#0DCAF0'
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};  
export default ProductPriceChart;
