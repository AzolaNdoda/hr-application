<template>
<div>
        <br><br><br>
        <h1>Employee Payroll</h1>
        <br>
    </div>
    <table>
        <thead>
            <tr>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Payslip</th>
            </tr>
        </thead>
        <tr v-for="payroll in payrollData" :key="payroll.employeeId">
            <td>{{ payroll.employeeId }}</td>
            <td>{{ payroll.name }}</td>
            <td>{{ payroll.hourlyRate }}</td>
            <td>{{ payroll.hoursWorked }}</td>
            <td><button type="button" class="btn btn-success" @click="viewPayslip(payroll)">View Payslip</button><br></td>
        </tr>
    </table>

    <!-- Modal Section -->

    <div v-if="employeePayslip" class="modal" tabindex="-1" role="dialog" style="display: block;">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Payslip for {{ employeePayslip.name }}</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
    </div>
        <div class="modal-body">
        <p><strong>Employee ID:</strong> {{ employeePayslip.employeeId }}</p>
        <p><strong>Name:</strong> {{ employeePayslip.name }}</p>
        <p><strong>Hours Worked:</strong> {{ employeePayslip.hoursWorked }}</p>
        <p><strong>Leave Deductions:</strong> {{ employeePayslip.leaveDeductions }}</p>
        <p><strong>Final Salary:</strong> {{ employeePayslip.finalSalary }}</p>
        </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="closeModal">Hide</button>
    </div>
    </div>
    </div>
</div>

</template>
<script>
import Payroll from '@/components/Payroll.vue';
import EmployeesView from './EmployeesView.vue';


export default {
    components: {
        Payroll,
        EmployeesView
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
}


    
}
</script>
<style scoped>
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

Add the table to the PDF
     doc.autoTable({
       startY: 30,      // Starting Y position for the table
       head: headers,   // Table headers
       body: data,      // Table data
       theme: 'striped',   // Table style (options: 'striped', 'grid', 'plain')
       headStyles: { fillColor: [70, 130, 180] }, // Header background color (steel blue)
       margin: { top: 20 }
     });
     // This is my file name
     doc.save("ModernTech Solutions Payslip.pdf")