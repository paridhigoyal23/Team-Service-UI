import React from 'react'
import BarGraph from '../../Elements/BarGraph/BarGraph'
import Cards from '../../Elements/Cards/Cards'
import PieChart from '../../Elements/PieChart/PieChart'

const Dashboard = () => {
  return (
    <div>

    <Cards />
    <div className='flex w-full justify-center px-32 gap-32'>
      <div className='my-14 w-1/2'>
        <BarGraph />  
      </div>  
      <div className='my-14 w-1/2'>
        <PieChart />
      </div>
    </div>
    </div>
  )
}

export default Dashboard