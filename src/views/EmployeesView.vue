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
    <a to="/Welcome" class="navbar-brand" href="#">Modern Tech Solutions</a>

</nav>
    </div>
  <div>
  </div>
  <table>
    <thead>
    <tr>
      <th>Employee ID</th>
      <th>Name</th>
      <th>Gender</th>
      <th>Position</th>
      <th>Salary</th>
      <th>Employment History</th>
      <th>Email</th>
      <th>Department ID</th>
      <th>Update Info</th>
      <th>Remove Employee</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="employee in $store.state.employees" :key="employee">
      <td>{{ employee.employee_id }}</td>
      <td>{{ employee.name }}</td>
      <td>{{ employee.gender }}</td>
      <td>{{ employee.position }}</td>
      <td>{{formatCurrency(employee.salary)}}</td>
      <td>{{ employee.employmentHistory }}</td>
      <td>{{ employee.email }}</td>
      <td>{{ employee.department_id }}</td>
      <td>
        <edit-modal :employee="employee"/>
      </td>
      <td><button @click="removeEmployee(employee.employee_id)">REMOVE</button></td>
    </tr>
  </tbody>
  </table>
  
  

</template>

<script>
import editModal from '@/components/editModal.vue';

export default {
  data(){
    return{
      employee:{
        name: null,
        gender: null,
        position: null,
        salary: null,
        employmentHistory: null,
        email: null,
        department_id: null
      },
      selectedEmployee: null
        

    }
  },
  components:{
    editModal

  },
  mounted(){
    this.$store.dispatch('getEmployees')
  }
  ,

  computed:{


  },

  methods:{
    removeEmployee(employee_id){
      this.$store.dispatch('removeEmployee',employee_id)
    },
    insertEmployee(){
      this.$store.dispatch('insertEmployee',this.employee)
    },
    
    formatCurrency(amount) {
    return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    }).format(amount);
},
      },
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
