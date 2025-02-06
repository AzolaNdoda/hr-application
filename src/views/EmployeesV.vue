<template>


<br><br>
<div>
    <h1>Employees Table</h1>
</div>
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
        <tr v-for="employee in  $store.state.employees" :key="employee">
            <td>{{ employee.employee_id }}</td>
            <!-- <td>{{ payroll.name }}</td>
            <td>{{formatCurrency(payroll.hourlyRate)}}</td>
            <td>{{ payroll.hoursWorked }}</td>
            <td>{{ formatCurrency(payroll.finalSalary) }}</td>
            <td><button @click="generatePDF(payroll)" class="btn btn-primary">Generate Payslip PDF</button></td>
            <td><button @click="deletePayroll(payroll.pay_id)" class="btn btn-primary">Delete Payroll</button></td> -->

        </tr>
    </table>


    {{ $store.state.employees }}


</template>

<script>
export default {
    mounted(){
        this.$store.dispatch('getEmployees')
    }

}
</script>

<style>

</style>