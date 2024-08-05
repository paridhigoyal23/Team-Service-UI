import React from 'react';
import BarGraph from '../../Elements/BarGraph/BarGraph';
import Cards from '../../Elements/Cards/Cards';
import PieChart from '../../Elements/PieChart/PieChart';

const Dashboard = () => {
  return (
    <div className="overflow-x-hidden"> {/* Ensure no horizontal overflow */}
      <div>
        <Cards />
      </div>
      <div className="flex justify-around">
        <div>
          <BarGraph />
        </div>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
