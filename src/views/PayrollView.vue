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
    <a to="/Welcome" class="navbar-brand" href="#">Modern Tech Solutions</a>

</nav>
<br>
<div>
    <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Monthly Salary</th>
                <th>Payslip</th>
            </tr>
        </thead>
        <tr v-for="payroll in payrollData" :key="payroll.employeeId">
            <td>{{ payroll.employeeId }}</td>
            <td>{{ payroll.name }}</td>
            <td>{{formatCurrency(payroll.hourlyRate)}}</td>
            <td>{{ payroll.hoursWorked }}</td>
            <td>{{ formatCurrency(payroll.finalSalary) }}</td>
            <td><button @click="generatePDF(payroll)" class="btn btn-primary">Generate Payslip PDF</button></td>
            <td><button @click="deletePayroll(payroll.pay_id)" class="btn btn-primary">Delete Payroll</button></td>

        </tr>
    </table>


    </div>

    {{ $store.state.payroll }}

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
    data(){
        return{
            payrollData: [
        {
            "employeeId": 1,
            "name": "Sibongile Nkosi",
            "hourlyRate": 457.24,
            "hoursWorked": 160,
            "leaveDeductions": 8,
            "finalSalary": 69500
        },
        {
            "employeeId": 2,
            "name": "Lungile Moyo",
            "hourlyRate": 564.29,
            "hoursWorked": 150,
            "leaveDeductions": 10,
            "finalSalary": 79000
        },
        {
            "employeeId": 3,
            "name": "Thabo Molefe",
            "hourlyRate": 330.12,
            "hoursWorked": 170,
            "leaveDeductions": 4,
            "finalSalary": 54800
        },
        {
            "employeeId": 4,
            "name": "Keshav Naidoo",
            "hourlyRate": 375.47,
            "hoursWorked": 165,
            "leaveDeductions": 6,
            "finalSalary": 59700
        },
        {
            "employeeId": 5,
            "name": "Zanele Khumalo",
            "hourlyRate": 378.10,
            "hoursWorked": 158,
            "leaveDeductions": 5,
            "finalSalary": 57850
        },
        {
            "employeeId": 6,
            "name": "Sipho Zulu",
            "hourlyRate": 390.36,
            "hoursWorked": 168,
            "leaveDeductions": 2,
            "finalSalary": 64800
        },
        {
            "employeeId": 7,
            "name": "Naledi Moeketsi",
            "hourlyRate": 417.44,
            "hoursWorked": 175,
            "leaveDeductions": 3,
            "finalSalary": 71800
        },
        {
            "employeeId": 8,
            "name": "Farai Gumbo",
            "hourlyRate": 350,
            "hoursWorked": 160,
            "leaveDeductions": 0,
            "finalSalary": 56000
        },
        {
            "employeeId": 9,
            "name": "Karabo Dlamini",
            "hourlyRate": 410,
            "hoursWorked": 155,
            "leaveDeductions": 5,
            "finalSalary": 61500
        },
        {
            "employeeId": 10,
            "name": "Fatima Patel",
            "hourlyRate": 365.51,
            "hoursWorked": 162,
            "leaveDeductions": 4,
            "finalSalary": 57750
        },

    ],
        employeePayslip: null,
        }
    },
    methods: {
        deletePayroll(){
    this.$store.dispatch('deletePayroll')
},
    calculateFinalSalary(employee) {
    const basicSalary = employee.hoursWorked * employee.hourlyRate;
    const employeeDeduction = employee.leaveDeductions * employee.hourlyRate;
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
        employee.employeeId,
        employee.name,
        this.formatCurrency(employee.hourlyRate),
        employee.hoursWorked,
        employee.leaveDeductions,
        this.formatCurrency(employee.finalSalary)
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
table{
    border-collapse: collapse;
    border: 2px solid black;
    height: 100vh;
    width: 100%;
}
th{
    background-color: rgb(55, 157, 161);
}
th, td{
    border: 2px solid black;
    text-align: center;
}


h1 {
    text-align: center;
    color: #333;
}
.modal {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
}


</style>

