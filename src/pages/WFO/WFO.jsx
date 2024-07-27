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
      <div className='border-2 rounded-md bg-gray-50 py-4 m-8 flex justify-center items-center gap-4'>
        {/* This shows the heading i.e, Forecast Month  */}
        <label htmlFor="monthSelector" className='text-xl'>Forecast Month:</label>

        {/* This displays the calender */}
        <input className='border-2 rounded-md border-black px-2 py-1' type="month" id="monthSelector" value={selectedMonth.toISOString().slice(0, 7)} onChange={handleMonthChange} />
          </div>

      {/* It is table that displays the information */}
      <div className='flex justify-center w-screen'>
        <table>
            <thead>
                <tr>
                    <th rowspan="2" className='px-6'>Name</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>19</th>
                    <th>20</th>
                    <th>21</th>
                    <th>22</th>
                    <th>23</th>
                    <th>24</th>
                    <th>25</th>
                    <th>26</th>
                    <th>27</th>
                    <th>28</th>
                    <th>29</th>
                    <th>30</th>
                    <th rowSpan={2}>TH</th>
                    <th rowSpan={2}>TO</th>
                    <th rowSpan={2}>TL</th>
                </tr>

                <tr>
                    <th> Mon </th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th> Mon </th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th> Mon </th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th> Mon </th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                </tr>
            </thead>
            <tbody>
                <tr scope="col">
                    <td className='px-6'>Pernika(1234)</td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i className="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-regular fa-face-smile text-gray-800"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td><i class="fa-solid fa-circle-h"></i></td>
                    <td>22</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
            </tbody>
        </table>
      </div>
    </>
  );
}

export default CalendarTable;
