import React, { useState } from 'react';
import "./WFO.module.css"

function CalendarTable() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleMonthChange = (event) => {
    const newMonth = new Date(event.target.value);
    setSelectedMonth(newMonth);
  };

  return (
    <>
      <div className=' max-w-full overflow-hidden'>
        <div className='border-2 rounded-md bg-gray-50 py-4 m-8 flex justify-center items-center gap-4'>
          {/* This shows the heading i.e, Forecast Month  */}
          <label htmlFor="monthSelector" className='text-xl'>Forecast Month:</label>

          {/* This displays the calendar */}
          <input className='border-2 rounded-md border-black px-2 py-1' type="month" id="monthSelector" value={selectedMonth.toISOString().slice(0, 7)} onChange={handleMonthChange} />
        </div>

        {/* It is table that displays the information */}
        <div className='flex justify-center w-full px-8'>
          <div className='overflow-x-auto w-full'>
            <table className='min-w-max'>
              <thead>
                <tr>
                  <th rowSpan="2" className='px-6'>Name</th>
                  {Array.from({ length: 30 }, (_, i) => (
                    <th key={i + 1}>{i + 1}</th>
                  ))}
                  <th rowSpan={2}>TH</th>
                  <th rowSpan={2}>TO</th>
                  <th rowSpan={2}>TL</th>
                </tr>
                <tr>
                  {Array.from({ length: 30 }, (_, i) => (
                    <th key={i + 1}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][(i + new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1).getDay()) % 7]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr scope="col">
                  <td className='px-6'>Pernika(1234)</td>
                  {Array.from({ length: 30 }, (_, i) => (
                    <td key={i + 1}><i className="fa-solid fa-circle-h"></i></td>
                  ))}
                  <td>22</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarTable;
