<template>
        <!--nav bar-->
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
        <li class="nav-item">
            <router-link to="/Welcome" class="nav-link" href="#">Homepage</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/Employees" class="nav-link" href="#">Employees</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/Attendance" class="nav-link" href="#">Attendance Tracking</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/Payroll" class="nav-link" href="#">Payroll</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page" href="#">Log out</router-link>
        </li>
        </ul>
    </div>
    </div>
    <a to="/Welcome" class="navbar-brand" href="#">
    Modern Tech Solutions
    </a>
    </nav>
    <br><br>
    </div>
    <div>
        <h1>Attendance Tracker</h1>
        <!-- Select an Employee -->
        <br><br>
        <div>
            <label for="employee">Select Employee:</label>
            <select id="employee" v-model="selectedEmployeeId">
                <option v-for="employee in attendanceAndLeave" :key="employee.employeeId" :value="employee.employeeId">
                    {{ employee.name }}
                </option>
            </select>
        </div>

        <!-- Employee Calendar -->
        <div class="calendar">
            <table>
                <thead>
                    <tr>
                        <th v-for="day in weekDays" :key="day">{{ day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="week in calendar" :key="week[0]">
                        <td v-for="date in week" :key="date">
                            <div @click="selectDate(date)" :class="{ selected: isSelected(date) }">
                                {{ date?.getDate() || "" }}
                            </div>

                            <!-- Display Attendance Buttons -->
                            <div v-if="isSelected(date)" class="attendance-options">
                                <button
                                    v-if="!getAttendanceStatus(date) || getAttendanceStatus(date) === 'Absent'"
                                    class="btn btn-success"
                                    @click="markAttendance(date, 'Absent')"
                                >
                                    Present
                                </button>

                                <button
                                    v-if="!getAttendanceStatus(date) || getAttendanceStatus(date) === 'Present'"
                                    class="btn btn-danger"
                                    @click="markAttendance(date, 'Present')"
                                >
                                    Absent
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Leave Requests Table -->
        <div>
            <h2>Leave Requests</h2>
            <table id="leaveRequestsTable">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Date</th>
                        <th>Leave Reason</th>
                        <th>Leave Status</th>
                        <th>HR Response</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(request, index) in currentLeaveRequests" :key="index">
                        <td>{{ getSelectedEmployeeName }}</td>
                        <td>{{ request.date }}</td>
                        <td>{{ request.reason }}</td>
                        <td :class="request.status.toLowerCase()">{{ request.status }}</td>
                        <td>
                            <button class="approve" @click="respondToRequest(index, 'Approved')">Approve</button>
                            <button class="reject" @click="respondToRequest(index, 'Rejected')">Deny</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    components:
        Navbar,
    data() {
        return {
            selectedEmployeeId: null,
            selectedDate: null,
            weekDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            attendanceAndLeave: [
            {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-22",
                    "reason": "Sick Leave",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-01",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-15",
                    "reason": "Family Responsibility",
                    "status": "Denied"
                },
                {
                    "date": "2024-12-02",
                    "reason": "Vacation",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-10",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                },
                {
                    "date": "2024-12-05",
                    "reason": "Personal",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-20",
                    "reason": "Bereavement",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-01",
                    "reason": "Childcare",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-18",
                    "reason": "Sick Leave",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-22",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-02",
                    "reason": "Medical Appointment",
                    "status": "Approved"
                }
            ]
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Present"
                },
                {
                    "date": "2024-11-28",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-11-19",
                    "reason": "Childcare",
                    "status": "Denied"
                }
            ]
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "attendance": [
                {
                    "date": "2024-11-25",
                    "status": "Present"
                },
                {
                    "date": "2024-11-26",
                    "status": "Present"
                },
                {
                    "date": "2024-11-27",
                    "status": "Absent"
                },
                {
                    "date": "2024-11-28",
                    "status": "Present"
                },
                {
                    "date": "2024-11-29",
                    "status": "Present"
                }
            ],
            "leaveRequests": [
                {
                    "date": "2024-12-03",
                    "reason": "Vacation",
                    "status": "Pending"
                }
            ]
        }
    ]

        };
    },
    computed: {
        calendar() {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            const calendar = [];
            let week = [];

            for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                week.push(null);
            }

            for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
                const date = new Date(today.getFullYear(), today.getMonth(), day);
                week.push(date);
                if (week.length === 7 || day === lastDayOfMonth.getDate()) {
                    calendar.push(week);
                    week = [];
                }
            }
            return calendar;
        },
        currentLeaveRequests() {
            const employee = this.attendanceAndLeave.find(
                (emp) => emp.employeeId === this.selectedEmployeeId
            );
            return employee ? employee.leaveRequests : [];
        },
        getSelectedEmployeeName() {
            const employee = this.attendanceAndLeave.find(
                (emp) => emp.employeeId === this.selectedEmployeeId
            );
            return employee ? employee.name : "Unknown";
        },
    },
    methods: {
        selectDate(date) {
            this.selectedDate = date;
        },
        isSelected(date) {
            return (
                date &&
                this.selectedDate &&
                date.toDateString() === this.selectedDate.toDateString()
            );
        },
        getAttendanceStatus(date) {
            const dateString = date.toISOString().split("T")[0];
            const employee = this.attendanceAndLeave.find(
                (emp) => emp.employeeId === this.selectedEmployeeId
            );
            return (
                employee &&
                employee.attendance.find((entry) => entry.date === dateString)?.status
            );
        },
        markAttendance(date, status) {
            if (date) {
                const dateString = date.toISOString().split("T")[0];
                const employee = this.attendanceAndLeave.find(
                    (emp) => emp.employeeId === this.selectedEmployeeId
                );
                if (employee) {
                    const existingEntry = employee.attendance.find(
                        (entry) => entry.date === dateString
                    );
                    if (existingEntry) {
                        existingEntry.status = status;
                    } else {
                        employee.attendance.push({ date: dateString, status });
                    }
                    alert(`Attendance for ${dateString} marked as ${status}`);
                }
            }
        },
        respondToRequest(index, status) {
            const employee = this.attendanceAndLeave.find(
                (emp) => emp.employeeId === this.selectedEmployeeId
            );
            if (employee && employee.leaveRequests[index]) {
                employee.leaveRequests[index].status = status;
                alert(`Leave request has been ${status}`);
            } else {
                alert("Unable to update leave request.");
            }
        },
    },
};
</script>

<style scoped>
#navbarNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: cadetblue;
    color: white;
    padding: 1rem 0;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.calendar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    width: 100%;
    border-collapse: collapse;
}

.calendar table {
    border-collapse: collapse;
    width: 80%;
    height: 80%;
    margin: 0 auto;
    font-size: 1.2em;
}

.calendar th,
.calendar td {
    width: 14%;
    height: 50px;
    text-align: center;
    border: 1px solid #ddd;
    position: relative;
}

.calendar td div {
    cursor: pointer;
    padding: 5px;
}

.calendar td div.selected {
    background-color: #007bff;
    color: white;
    border-radius: 50%;
}

.attendance-options {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
}

.attendance-options button {
    margin: 2px 0;
}

#leaveRequestsTable {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

#leaveRequestsTable th, #leaveRequestsTable td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
}

#leaveRequestsTable th {
    background-color: #4CAF50;
    color: white;
}

#leaveRequestsTable tr:nth-child(even) {
    background-color: #f2f2f2;
}

#leaveRequestsTable tr:hover {
    background-color: #ddd;
}

.approve {
    background-color: #4CAF50;
    color: white;
}

.reject {
    background-color: #f44336;
    color: white;
}

.approve:hover {
    background-color: #45a049;
}

.reject:hover {
    background-color: #e53935;
}
</style>

