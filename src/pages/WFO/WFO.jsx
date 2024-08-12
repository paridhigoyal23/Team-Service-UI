import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import "./WFO.module.css";

function CalendarTable() {
  const { userRole, userEmail } = useAuth();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(30);
  const [userNameAndId, setUserNameAndId] = useState('');
  const [wfoPreferences, setWfoPreferences] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/users?email=${userEmail}`)
      .then(response => {
        const user = response.data[0];
        if (user) {
          setUserNameAndId(`${user.Name}(${user.EmpId})`);
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [userEmail]);

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

  const handleCheckboxChange = (event) => {
    setWfoPreferences({
      ...wfoPreferences,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <div className='max-w-full overflow-hidden'>
        <div className='border-2 rounded-md bg-gray-50 py-4 m-8 flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              {/* Forecast Month */}
              <label htmlFor="monthSelector" className='text-lg'>Forecast Month:</label>

              {/* Calendar Input */}
              <input
                type="month"
                id="monthSelector"
                name="monthSelector"
                className='border-spacing-4 border-2 p-1 border-gray-400 rounded-md'
                onChange={handleMonthChange}
                value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
              />
            </div>

            {/* WFO Preferences */}
            <div className='flex gap-2 items-center'>
              <label className='text-lg'>WFO Preferences:</label>
              {["Mon", "Tue", "Wed", "Thu", "Fri"].map(day => (
                <label key={day} className='flex items-center gap-1'>
                  <input
                    type="checkbox"
                    name={day}
                    checked={wfoPreferences[day]}
                    onChange={handleCheckboxChange}
                  />
                  {day}
                </label>
              ))}
              {/* Apply Button */}
              <button className='ml-2 px-3 py-1 bg-gray-300 text-black border-2 border-gray-500 rounded-md'>Apply</button>
            </div>
          </div>
        </div>

        {/* Display the number of days in the selected month */}
        <div className='flex justify-center w-full px-8'>
          <div className='overflow-x-auto w-full'>
            {userRole === 'admin' || userRole === 'manager' ? (
              <div className='flex justify-center items-center text-xl font-bold'>
                No data available
              </div>
            ) : (
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
                    <td className='px-6'>{userNameAndId}</td>
                    {Array.from({ length: daysInSelectedMonth }, (_, i) => (
                      <td key={i + 1}><i className="fa-solid fa-circle-h"></i></td>
                    ))}
                    <td>22</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Show the number of days in the selected month
        <div className="flex justify-center mt-4">
          <p className='text-lg'>Number of Days in Selected Month: {daysInSelectedMonth}</p>
        </div> */}
      </div>
    </>
  );
}

export default CalendarTable;

