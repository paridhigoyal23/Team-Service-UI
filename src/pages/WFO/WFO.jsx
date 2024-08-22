
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./WFO.module.css";

function CalendarTable() {
  const { userRole, userEmail } = useAuth();
  const [employeePreferences, setEmployeePreferences] = useState([]);
  const location = useLocation();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [daysInSelectedMonth, setDaysInSelectedMonth] = useState(30);
  const [userNameAndId, setUserNameAndId] = useState("");
  const [wfoPreferences, setWfoPreferences] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
  });

  const [cellStates, setCellStates] = useState({});
  const [toCount, setToCount] = useState(0);
  const [thCount, setThCount] = useState(0);
  const [tlCount, setTlCount] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (userRole === "admin" || userRole === "manager") {
      axios
        .get("http://localhost:8000/employeeAttendances")
        .then((response) => {
          setEmployeePreferences(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the employee preferences!",
            error
          );
        });
    }
  }, [userRole]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users?email=${userEmail}`)
      .then((response) => {
        const user = response.data[0];
        if (user) {
          setUserNameAndId(`${user.Name}(${user.EmpId})`);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userEmail]);

  useEffect(() => {
    updateDaysInMonth(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    if (userNameAndId) {
      fetchPreferences();
    }
  }, [userNameAndId, location]);

  const handleMonthChange = (event) => {
    const newMonth = new Date(event.target.value);
    setSelectedMonth(newMonth);
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

  const handleApply = () => {
    const selectedDays = Object.keys(wfoPreferences).filter(
      (day) => wfoPreferences[day]
    );
    const newState = {};

    for (let i = 1; i <= daysInSelectedMonth; i++) {
      const currentDate = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth(),
        i
      );
      const dayName = getDayName(currentDate);
      let state;

      if (selectedDays.includes(dayName)) {
        state = "O"; // Office
      } else if (isWeekend(currentDate)) {
        state = "BH"; // Weekend
      } else {
        state = "H"; // Home
      }

      newState[i] = state;
    }

    setCellStates(newState);
    updateCounts(newState);
  };

  const updateCounts = (state) => {
    let to = 0; 
    let th = 0; 
    let tl = 0; 

    for (let i = 1; i <= daysInSelectedMonth; i++) {
      const dayState = state[i];
      if (dayState === "O") {
        to++;
      } else if (dayState === "H") {
        th++;
      } else if (
        dayState === "L" &&
        !isWeekend(
          new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), i)
        )
      ) {
        tl++;
      }
    }

    setToCount(to);
    setThCount(th);
    setTlCount(tl);
  };

  const handleCellClick = (day) => {
    setCellStates((prev) => {
      const newState = { ...prev };
      if (newState[day] === "O") {
        newState[day] = "H";
      } else if (newState[day] === "H") {
        newState[day] = "L";
      } else if (newState[day] === "L") {
        newState[day] = "O";
      }
      updateCounts(newState);
      return newState;
    });
  };

  const getDayName = (date) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6; 
  };

  const fetchPreferences = () => {
    const monthYear = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;
    axios
      .get(
        `http://localhost:8000/employeeAttendances?name=${encodeURIComponent(
          userNameAndId
        )}&month=${monthYear}`
      )
      .then((response) => {
        const data = response.data[0];
        if (data) {
          const savedStates = data.values.reduce((acc, obj) => {
            const [key, value] = Object.entries(obj)[0];
            const day = new Date(key).getDate();
            acc[day] = value;
            return acc;
          }, {});
          setCellStates(savedStates);
          setToCount(data.TO);
          setThCount(data.TH);
          setTlCount(data.TL);
        }
      })
      .catch((error) => console.error("Error fetching preferences:", error));
  };

  const handleSave = () => {
    const monthYear = `${selectedMonth.getFullYear()}-${String(
      selectedMonth.getMonth() + 1
    ).padStart(2, "0")}`;
    const data = {
      month: monthYear,
      name: userNameAndId,
      values: Object.keys(cellStates).map((day) => ({
        [`${selectedMonth.getFullYear()}-${String(
          selectedMonth.getMonth() + 1
        ).padStart(2, "0")}-${String(day).padStart(2, "0")}`]: cellStates[day],
      })),
      TO: toCount,
      TH: thCount,
      TL: tlCount,
    };

    axios
      .get(
        `http://localhost:8000/employeeAttendances?name=${encodeURIComponent(
          userNameAndId
        )}&month=${monthYear}`
      )
      .then((response) => {
        const existingData = response.data[0];
        if (existingData) {
          axios
            .put(
              `http://localhost:8000/employeeAttendances/${existingData.id}`,
              data
            )
            .then(() => {
              setSnackbarMessage(
                `Attendance updated successfully for ${userNameAndId}`
              );
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              console.log("Preferences updated successfully");
            })
            .catch((error) => {
              setSnackbarMessage("Error updating preferences");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              console.error("Error updating preferences:", error);
            });
        } else {
          axios
            .post("http://localhost:8000/employeeAttendances", data)
            .then(() => {
              setSnackbarMessage(
                `Attendance saved successfully for ${userNameAndId}`
              );
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              console.log("Preferences saved successfully");
            })
            .catch((error) => {
              setSnackbarMessage("Error saving preferences");
              setSnackbarSeverity("error");
              setSnackbarOpen(true);
              console.error("Error saving preferences:", error);
            });
        }
      })
      .catch((error) => {
        setSnackbarMessage("Error fetching existing data");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        console.error("Error fetching existing data:", error);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const getUniqueDates = () => {
    const dates = employeePreferences.flatMap((employee) =>
      employee.values.map((value) => Object.keys(value)[0])
    );
    return [...new Set(dates)].sort();
  };

  const uniqueDates = getUniqueDates();

  return (
    <>
      <div className="max-w-full overflow-hidden">
        <div className="border-2 rounded-md bg-gray-50 py-4 m-8 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {/* Forecast Month */}
              <label htmlFor="monthSelector" className="text-lg">
                Forecast Month:
              </label>

              {/* Calendar Input */}
              <input
                type="month"
                id="monthSelector"
                name="monthSelector"
                className="border-spacing-4 border-2 border-gray-500 rounded-md p-1 text-lg"
                value={selectedMonth.toISOString().slice(0, 7)}
                onChange={handleMonthChange}
              />
            </div>

            {/* Conditionally render WFO preferences */}
            {userRole === "viewer" && (
              <div className="flex items-center gap-4">
                {/* WFO Preferences */}
                <label className="text-lg">WFO preferences:</label>
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <label key={day} className="text-lg">
                    <input
                      type="checkbox"
                      name={day}
                      checked={wfoPreferences[day]}
                      onChange={handleCheckboxChange}
                    />{" "}
                    {day}
                  </label>
                ))}

                <button
                  onClick={handleApply}
                  className="ml-2 px-3 py-1 bg-gray-300 text-black border-2 border-gray-500 rounded-md"
                >
                  Apply
                </button>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="ml-2 px-3 py-1 bg-gray-300 text-black border-2 border-gray-500 rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {/* Display the number of days in the selected month */}
          <div className="flex justify-center w-full px-8">
            <div className="overflow-x-auto w-full">
                          {/* Render WFO Preferences Table for Admin or Manager */}
            {(userRole === 'admin' || userRole === 'manager') && (
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            {uniqueDates.map((date, index) => (
                                <th key={index}>{date}</th>
                            ))}
                            <th>TO</th>
                            <th>TH</th>
                            <th>TL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeePreferences.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee.name}</td>
                                {uniqueDates.map((date, index) => {
                                    const preference = employee.values.find(value => value[date])?.[date] || '';
                                    return (
                                        <td key={index}>
                                            {preference === 'BH' ? '😊' : preference}
                                        </td>
                                    );
                                })}
                                <td>{employee.TO}</td>
                                <td>{employee.TH}</td>
                                <td>{employee.TL}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

              :
              {userRole === "viewer" && (
                <table className="min-w-max">
                  <thead>
                    <tr>
                      <th rowSpan="2" className="px-6">
                        Name
                      </th>
                      {Array.from({ length: daysInSelectedMonth }, (_, i) => (
                        <th key={i + 1}>{i + 1}</th>
                      ))}
                      <th rowSpan={2}>TH ({thCount})</th>
                      <th rowSpan={2}>TO ({toCount})</th>
                      <th rowSpan={2}>TL ({tlCount})</th>
                    </tr>
                    <tr>
                      {Array.from({ length: daysInSelectedMonth }, (_, i) => (
                        <th key={i + 1}>
                          {getDayName(
                            new Date(
                              selectedMonth.getFullYear(),
                              selectedMonth.getMonth(),
                              i + 1
                            )
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6">{userNameAndId}</td>
                      {Array.from({ length: daysInSelectedMonth }, (_, i) => {
                        const day = i + 1;
                        const currentDate = new Date(
                          selectedMonth.getFullYear(),
                          selectedMonth.getMonth(),
                          day
                        );
                        return (
                          <td key={day} onClick={() => handleCellClick(day)}>
                            {isWeekend(currentDate) ? (
                              <button className="weekend">😊</button>
                            ) : cellStates[day] === "O" ? (
                              <button className="O">O</button>
                            ) : cellStates[day] === "H" ? (
                              <button className="H">H</button>
                            ) : (
                              <button className="L">L</button>
                            )}
                          </td>
                        );
                      })}
                      <td>{thCount}</td>
                      <td>{toCount}</td>
                      <td>{tlCount}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        {userRole === "viewer" ? (
          <div
            className="ms-5 text-primary e-4 mt-2 fst-italic"
            style={{ textAlign: "left" }}
          >
            <i
              className="fa-solid fa-circle-info me-2"
              style={{ color: "orange" }}
            ></i>
            <span className="text-primary">
              Click on a cell to change forecast of current and future dates
            </span>
          </div>
        ) : null}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default CalendarTable;


