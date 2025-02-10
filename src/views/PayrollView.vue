<template>
    <!--navbar-->
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
    <!-- <li class="nav-item">
        <router-link to="/Employees" class="nav-link" href="#">Employees</router-link>
    </li>
    <li class="nav-item">
        <router-link to="/Attendance" class="nav-link" href="#">Attendance Tracking</router-link>
    </li> -->
    <li class="nav-item">
        <router-link to="/Payroll" class="nav-link" href="#">Payroll</router-link>
    </li>
    <li class="nav-item">
        <router-link to="/" class="nav-link active" aria-current="page" href="#">Log out</router-link>
    </li>
    </ul>
</div>
</div>
<a to="/Welcome" class="navbar-brand" href="#">Modern Tech Solutions</a>
</nav>
<br>
<div>
<table>
    <thead>
        <tr>
            <th>Pay ID</th>
            <th>Employee Name</th>
            <th>Hourly Rate</th>
            <th>Hours Worked</th>
            <th>Leave Deductions</th>
            <th>Monthly Salary</th>
            <th>Payslip</th>
            <th>Remove Payslip</th>
            <th>Edit Payslip</th>

        </tr>
    </thead>
    
    <tbody>
       <tr v-for="payroll in $store.state.payroll" :key="payroll">
            <td>{{ payroll.pay_id }}</td>
            <td>{{ payroll.name }}</td>
            <td>{{formatCurrency(payroll.hourly_rate)}}</td>
            <td>{{ payroll.hours_worked }}</td>
            <td>{{ payroll.leave_deductions }}</td>
            <td>{{ formatCurrency(payroll.final_salary) }}</td>
            <td><button @click="generatePDF(payroll)" class="btn btn-primary">Generate Payslip PDF</button></td>
            <td>
            <button @click="deletePayroll(payroll.pay_id)" class="btn btn-primary">Delete</button>
            </td>
            <td>
            <button @click="editPayroll(payroll.pay_id)" class="btn btn-primary">Edit</button>
            </td>
           
        </tr>
    </tbody>
</table>

<br>
<br>
<td><button @click="insertPayroll(payroll.pay_id)" class="btn btn-primary">Add Payroll</button></td>

</div>

</template>
<script>
import Payroll from '@/components/Payroll.vue';
import EmployeesView from './EmployeesView.vue';
import Navbar from '@/components/Navbar.vue';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';


export default {
 // it runs code the moment thr component loads
mounted(){
    this.$store.dispatch("getData")
},
components: {
    Payroll,
    EmployeesView,
    Navbar
},
// data(){
//     return{
//         payrollData: [
//     {
//         "employeeId": 1,
//         "name": "Sibongile Nkosi",
//         "hourlyRate": 457.24,
//         "hoursWorked": 160,
//         "leaveDeductions": 8,
//         "finalSalary": 69500
//     },
//     {
//         "employeeId": 2,
//         "name": "Lungile Moyo",
//         "hourlyRate": 564.29,
//         "hoursWorked": 150,
//         "leaveDeductions": 10,
//         "finalSalary": 79000
//     },
//     {
//         "employeeId": 3,
//         "name": "Thabo Molefe",
//         "hourlyRate": 330.12,
//         "hoursWorked": 170,
//         "leaveDeductions": 4,
//         "finalSalary": 54800
//     },
//     {
//         "employeeId": 4,
//         "name": "Keshav Naidoo",
//         "hourlyRate": 375.47,
//         "hoursWorked": 165,
//         "leaveDeductions": 6,
//         "finalSalary": 59700
//     },
//     {
//         "employeeId": 5,
//         "name": "Zanele Khumalo",
//         "hourlyRate": 378.10,
//         "hoursWorked": 158,
//         "leaveDeductions": 5,
//         "finalSalary": 57850
//     },
//     {
//         "employeeId": 6,
//         "name": "Sipho Zulu",
//         "hourlyRate": 390.36,
//         "hoursWorked": 168,
//         "leaveDeductions": 2,
//         "finalSalary": 64800
//     },
//     {
//         "employeeId": 7,
//         "name": "Naledi Moeketsi",
//         "hourlyRate": 417.44,
//         "hoursWorked": 175,
//         "leaveDeductions": 3,
//         "finalSalary": 71800
//     },
//     {
//         "employeeId": 8,
//         "name": "Farai Gumbo",
//         "hourlyRate": 350,
//         "hoursWorked": 160,
//         "leaveDeductions": 0,
//         "finalSalary": 56000
//     },
//     {
//         "employeeId": 9,
//         "name": "Karabo Dlamini",
//         "hourlyRate": 410,
//         "hoursWorked": 155,
//         "leaveDeductions": 5,
//         "finalSalary": 61500
//     },
//     {
//         "employeeId": 10,
//         "name": "Fatima Patel",
//         "hourlyRate": 365.51,
//         "hoursWorked": 162,
//         "leaveDeductions": 4,
//         "finalSalary": 57750
//     },
// ],
//     employeePayslip: null,
//     }
// },
methods: {
    deletePayroll(payId) {
this.$store.dispatch('deletePayroll', payId);
},
insertPayroll(payId) {
this.$store.dispatch('insertPayroll', payId);
},
calculateFinalSalary(employee) {
const basicSalary = employee.hours_worked * employee.hourly_rate;
const employeeDeduction = employee.leave_deductions * employee.hourly_rate;
return basicSalary - employeeDeduction;
},
viewPayslip(employee) {
// Calculating the  final salary
const finalSalary = this.calculateFinalSalary(employee);
this.employeePayslip = { ...employee, finalSalary };
},
closeModal() {
this.employeePayslip = null;
},
formatCurrency(amount) {
return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
}).format(amount);
},
// Payslip generation
generatePDF(employee) {
const doc = new jsPDF();
// Payslip Title
doc.setFontSize(18);
doc.text("ModernTech Solutions", 14, 20);
doc.setFontSize(16);
doc.text("Employee Payslip", 14, 30);
// Table headers
const headers = [["Employee ID", "Name", "Hourly Rate", "Hours Worked", "Leave Deductions", "Final Salary"]];
// Table data (only for the selected employee)
const data = [[
employee.pay_id,
employee.name,
this.formatCurrency(employee.hourly_rate),
employee.hours_worked,
employee.leave_deductions,
this.formatCurrency(employee.final_salary)
]];
// Adding table using autoTable
autoTable(doc, {
    startY: 40,
    head: headers,
    body: data,
    theme: "striped",
    headStyles: { fillColor: [70, 130, 180] },
    margin: { top: 20 }
});
// Saving the PDF with employee name
doc.save(`Payslip_${employee.name}.pdf`);
}
}
}
</script>
<style scoped>
 /* NAVBAR FIX */
#navbarNav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: cadetblue;
    color: white;
    padding: 10px 20px;
    z-index: 1050;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    height: 65px;
    display: flex;
    justify-content: space-between; /* Align navbar content */
    align-items: center;
    flex-wrap: wrap; /* Ensures items wrap on smaller screens */
}

.navbar-brand {
    font-size: 20px;
    font-weight: bold;
    color: white !important;
    text-decoration: none;
    margin-left: 20px;
    margin-right: auto; /* Ensures the brand stays to the left */
}

.navbar-nav {
    display: flex;
    gap: 20px;
    margin-right: 20px;
}

.navbar-nav .nav-item {
    list-style: none;
}

.navbar-nav .nav-link {
    color: white !important;
    font-size: 16px;
    padding: 8px 12px;
    text-decoration: none;
}

/* TABLE FIX */
table {
    border-collapse: collapse;
    border: 2px solid black;
    width: 100%;
    margin-top: 80px; /* Ensure the table is below the navbar */
}

/* Make table headers visible under navbar */
th {
    background-color: rgb(55, 157, 161) !important;
    color: white;
    padding: 12px;
    font-size: 16px;
    text-align: center;
    position: sticky;
    top: 65px; /* Adjust the top to push the header below navbar */
    z-index: 1000; /* Keeps the header above table content */
}

th, td {
    border: 2px solid black;
    text-align: center;
    padding: 10px;
}

/* BODY SPACING */
body {
    padding-top: 70px; /* Ensure content is pushed below navbar */
    padding-bottom: 80px;
}

/* LOGOUT BUTTON AND NAVBAR FIX */
.navbar-nav .nav-item:last-child {
    margin-left: auto; /* Push the "Log out" to the far right */
}
</style> 