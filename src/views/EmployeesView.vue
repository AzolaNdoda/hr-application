<template>
     <!--nav bar-->
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
    <div>
        
        <br>
        <input type="text" v-model="searchQuery" placeholder="Search by Employee Name or Department" class="search-bar"/>
        
    </div>
    <div class="row">
    <div class="card" v-for="employee in filteredEmployees" :key="employee" style="width: 18rem;">
    <img 
    :src="employee.gender === 'Female' ? require('@/assets/female-employee.jpg') : require('@/assets/male-employee-icon.jpg')" class="card-img-top" alt="Employee Icon">
    <div class="card-body">
    <h5 class="card-title">Employee</h5>
    <p class="card-text">{{ employee.name }}</p>
    <p class="card-text">{{ employee.position }}</p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employeeModal" @click="fullDetails(employee)">Full Details</button>
    </div>
    </div>
    </div>

<!-- Modal Section -->
<div class="modal" id="employeeModal" tabindex="-1" aria-labelledby="employeeModalLabel">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="employeeModalLabel">Full Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <p>Employee Id: {{ chosenEmployee.employeeId }}</p>
        <p>Name: {{ chosenEmployee.name }}</p>
        <p>Gender: {{ chosenEmployee.gender }}</p>
        <p>Position: {{ chosenEmployee.position }}</p>
        <p>Department: {{ chosenEmployee.department }}</p>
        <p>Salary: {{ chosenEmployee.salary }}</p>
        <p>Employee History: {{ chosenEmployee.employmentHistory }}</p>
        <p>Business Email: {{ chosenEmployee.contact }}</p>
        <p>Performance Review: {{ chosenEmployee.performance }}</p>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger mt-2" @click="removeEmployee(chosenEmployee.employeeId)">Remove Employee</button>
    </div>
    
    </div>
    </div>
</div>

<div>
    <!-- Button To Add A New Employee -->
    <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">Add New Employee</button>

    <!-- Add New Employee Modal -->
    <div class="modal" id="addEmployeeModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Add New Employee</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <form @submit.prevent="addEmployee">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input v-model="newEmployee.name" type="text" id="name" class="form-control" required>
            </div>
        <div class="dropdown">
            <label for="gender" class="form-label">Gender</label>
            <br>
            <button class="btn btn-secondary dropdown-toggle" type="button" id="genderDropdown" data-bs-toggle="dropdown" aria-expanded="false">{{ newEmployee.gender || 'Select Gender' }}</button>
            <ul class="dropdown-menu" aria-labelledby="genderDropdown">
            <li>
            <a class="dropdown-item" href="#" @click.prevent="selectGender('Male')">Male</a>
            </li>
            <li>
            <a class="dropdown-item" href="#" @click.prevent="selectGender('Female')">Female</a>
            </li>
            </ul>
        </div>

            <div class="mb-3">
                <label for="position" class="form-label">Position</label>
                <input v-model="newEmployee.position" type="text" id="position" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="department" class="form-label">Department</label>
                <input v-model="newEmployee.department" type="text" id="department" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="salary" class="form-label">Salary</label>
                <input v-model="newEmployee.salary" type="number" id="salary" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Add Employee</button>
            </form>
        </div>
        </div>
    </div>
    </div>
</div>



</template>
<script>

import Modal from '@/components/Modal.vue';
import Navbar from '@/components/Navbar.vue';



export default {
    data(){
        return{
            searchQuery: '',
            employees: [
    {
        "employeeId": 1,
        "name": "Sibongile Nkosi",
        "gender": "Female",
        "position": "Software Engineer",
        "department": "Development",
        "salary": 70000,
        "employmentHistory": "Joined in 2015, promoted to Senior in 2018",
        "contact": "sibongile.nkosi@moderntech.com",
        "performance":"Excellent" 
    },
    {
        "employeeId": 2,
        "name": "Lungile Moyo",
        "gender": "Male",
        "position": "HR Manager",
        "department": "HR",
        "salary": 80000,
        "employmentHistory": "Joined in 2013, promoted to Manager in 2017",
        "contact": "lungile.moyo@moderntech.com",
        "performance": "Employee of the month"
    },
    { 
        "employeeId": 3,
        "name": "Thabo Molefe",
        "gender": "Male",
        "position": "Quality Analyst",
        "department": "QA",
        "salary": 55000,
        "employmentHistory": "Joined in 2018",
        "contact": "thabo.molefe@moderntech.com",
        "performance": "Great performance"
        },
        {
        "employeeId": 4,
        "name": "Keshav Naidoo",
        "gender": "Male",
        "position": "Sales Representative",
        "department": "Sales",
        "salary": 60000,
        "employmentHistory": "Joined in 2020",
        "contact": "keshav.naidoo@moderntech.com",
        "performance": "Excellent Team Player"
    },
    {
        "employeeId": 5,
        "name": "Zanele Khumalo",
        "gender": "Female",
        "position": "Marketing Specialist",
        "department": "Marketing",
        "salary": 58000,
        "employmentHistory": "Joined in 2019",
        "contact": "zanele.khumalo@moderntech.com",
        "performance": "Excellent Team Player"
        },
        {
        "employeeId": 6,
        "name": "Sipho Zulu",
        "gender": "Male",
        "position": "UI/UX Designer",
        "department": "Design",
        "salary": 65000,
        "employmentHistory": "Joined in 2016",
        "contact": "sipho.zulu@moderntech.com",
        "performance": "Dedicated Team Player"
        },
        {
        "employeeId": 7,
        "name": "Naledi Moeketsi",
        "gender": "Female",
        "position": "DevOps Engineer",
        "department": "IT",
        "salary": 72000,
        "employmentHistory": "Joined in 2017",
        "contact": "naledi.moeketsi@moderntech.com",
        "performance": "Excellent Team Player"
        },
        {
        "employeeId": 8,
        "name": "Farai Gumbo",
        "gender": "Male",
        "position": "Content Strategist",
        "department": "Marketing",
        "salary": 56000,
        "employmentHistory": "Joined in 2021",
        "contact": "farai.gumbo@moderntech.com",
        "performance": "Excellent Team Player"
        },
        {
        "employeeId": 9,
        "name": "Karabo Dlamini",
        "gender": "Female",
        "position": "Accountant",
        "department": "Finance",
        "salary": 62000,
        "employmentHistory": "Joined in 2018",
        "contact": "karabo.dlamini@moderntech.com",
        "performance": "Excellent Team Player"
        },
        {
        "employeeId": 10,
        "name": "Fatima Patel",
        "gender": "Female",
        "position": "Customer Support Lead",
        "department": "Support",
        "salary": 58000,
        "employmentHistory": "Joined in 2016",
        "contact": "fatima.patel@moderntech.com",
        "performance": "Excellent Team Player"
}
],
            chosenEmployee: {},
            nextEmployeeId: 11,  //This is to track a new employee Id for new employees
            newEmployee: {
                name: "",
                gender: "",
                position: "",
                department: "",
                salary: 0,
    },
        }
        

    },

    components:{
        Modal,
        Navbar
    
    },
    computed: {
        filteredEmployees() {
            const query = this.searchQuery.toLowerCase();
            return this.employees.filter(employee => {
        return (
            employee.name.toLowerCase().includes(query) ||
            employee.department.toLowerCase().includes(query)
        );
    });
    },
},
    methods:{
        fullDetails(employee){
            this.chosenEmployee = employee;
        },
        removeEmployee(employeeId) {
            this.employees = this.employees.filter((employee) => employee.employeeId !== employeeId);
            this.chosenEmployee = {}
    },
        addEmployee() {
    if (!this.newEmployee.name || !this.newEmployee.position || !this.newEmployee.department) {
        alert("All fields are required!");
        return;
    }

    const employee = {
        ...this.newEmployee,
        employeeId: this.nextEmployeeId++,
        employmentHistory: "New Hire",
        contact: `${this.newEmployee.name.toLowerCase().replace(/ /g, ".")}@moderntech.com`,
    };

    this.employees.push(employee);

    // Clear form
    this.newEmployee = { name: "", position: "", department: "", salary: 0 };

    // Close modal
    const modal = document.getElementById("addEmployeeModal");
    if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
    }
},
        selectGender(gender){
            this.newEmployee.gender = gender;

}
}
}


</script>
<style scoped>

.search-bar {
    padding: 8px;
    width: 100%;
    margin: 0 auto;
    display: block;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    box-sizing: border-box;
    position: fixed;
}

body{
    background-color: cadetblue;
}
.card{
    background-color: grey;
    box-shadow:10px 10px;
    margin: 20px;
}
img{
    border-radius: 80%;
}   
</style>