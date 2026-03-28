import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function PriceChart({ data, labels }: { data: number[], labels: string[] }) {
  if (!data || data.length === 0) return null;

  // Take last 20 points for better visibility
  const chartData = data.slice(-20);
  const chartLabels = labels.slice(-20).map(l => l.split('-')[2]); // Just the day

  return (
    <LineChart
      data={{
        labels: chartLabels,
        datasets: [{ data: chartData }]
      }}
      width={Dimensions.get('window').width - 40}
      height={220}
      chartConfig={{
        backgroundColor: '#1e1e1e',
        backgroundGradientFrom: '#1e1e1e',
        backgroundGradientTo: '#1e1e1e',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForDots: { r: '4', strokeWidth: '2', stroke: '#ffa726' }
      }}
      bezier
      style={{ marginVertical: 8, borderRadius: 16 }}
    />
  );
}
