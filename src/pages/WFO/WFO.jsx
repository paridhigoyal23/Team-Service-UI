import React, { useState } from 'react';
import "./WFO.module.css";

function CalendarTable() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(30); // Initial state with 30 days

  const handleMonthChange = (event) => {
    const newMonth = new Date(event.target.value);
    setSelectedMonth(newMonth);
    updateDaysInMonth(newMonth);
  };

  const updateDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    setDaysInSelectedMonth(days);
  };

  return (
    <>
      <div className='max-w-full overflow-hidden'>
        <div className='border-2 rounded-md bg-gray-50 py-4 m-8 flex justify-center items-center gap-4'>
          {/* This shows the heading i.e, Forecast Month */}
          <label htmlFor="monthSelector" className='text-xl'>Forecast Month:</label>

          {/* This displays the calendar */}
          <input
            type="date"
            id="monthSelector"
            name="monthSelector"
            className='border-spacing-6 border-2 p-1 border-gray-400 rounded-md'
            onChange={handleMonthChange}
            value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedMonth.getDate()).padStart(2, '0')}`}
          />
        </div>

        {/* Display the number of days in the selected month */}
        <div className='flex justify-center w-full px-8'>
          <div className='overflow-x-auto w-full'>
            <table className='min-w-max'>
              <thead>
                <tr>
                  <th rowSpan="2" className='px-6'>Name</th>
                  {Array.from({ length: daysInSelectedMonth }, (_, i) => (
                    <th key={i + 1}>{i + 1}</th>
                  ))}
                  <th rowSpan={2}>TH</th>
                  <th rowSpan={2}>TO</th>
                  <th rowSpan={2}>TL</th>
                </tr>
                <tr>
                  {Array.from({ length: daysInSelectedMonth }, (_, i) => (
                    <th key={i + 1}>
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][(i + new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 0).getDay()) % 7]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr scope="col">
                  <td className='px-6'>Pernika(1234)</td>
                  {Array.from({ length: daysInSelectedMonth }, (_, i) => (
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
        {/* Show the number of days in the selected month */}
        <div className="flex justify-center mt-4">
          <p className='text-lg'>Number of Days in Selected Month: {daysInSelectedMonth}</p>
        </div>
      </div>
    </>
  );
}

export default CalendarTable;