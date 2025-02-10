<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link to="/Welcome" class="nav-link">Homepage</router-link></li>
          <li class="nav-item"><router-link to="/Employees" class="nav-link">Employees</router-link></li>
          <li class="nav-item"><router-link to="/Attendance" class="nav-link">Attendance Tracking</router-link></li>
          <li class="nav-item"><router-link to="/Payroll" class="nav-link">Payroll</router-link></li>
          <li class="nav-item"><router-link to="/" class="nav-link active">Log out</router-link></li>
        </ul>
      </div>
    </div>
    <a class="navbar-brand">Modern Tech Solutions</a>
  </nav>
  <div>{{ $store.state.employees }}</div>

  <div>
    <br>
    <input type="text" v-model="searchQuery" placeholder="Search by Employee Name or Department" class="search-bar" />
  </div>

  <br><br>

  <div class="row">
    <div class="card" v-for="employee in $store.state.employees" :key="employee" style="width: 18rem;">
      <img :src="employeeImage(employee)" class="card-img-top" alt="Employee Icon" />
      <div class="card-body">
        <h5 class="card-title">{{ employee.name }}</h5>
        <p class="card-text">{{ employee.employee_id }}</p>
        <p class="card-text">{{ employee.position }}</p>
        <button class="btn btn-primary" @click="getSingleEmployee(employee)">Full Details</button>
      </div>
    </div>
  </div>

  <!-- <-- Employee Details Modal -->
  <div class="modal" id="employeeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Full Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" v-if="employee">
          <p><strong>Employee Id: {{ selectedEmployee.employee_id }} </strong></p>
          <p><strong>Name: {{ selectedEmployee.name }}</strong></p>
          <p><strong>Gender: {{ selectedEmployee.gender }}</strong></p>
          <p><strong>Position: {{ selectedEmployee.position }}</strong></p>
          <p><strong>Department: {{ selectedEmployee.department }}</strong></p>
          <p><strong>Salary: {{ selectedEmployee.salery }}</strong></p>
          <p><strong>Employment History: {{ selectedEmployee.employmentHistory }}</strong></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="updateEmployee()">Edit</button>
          <button class="btn btn-danger" @click="removeEmployee(employee.employee_id)">Remove Employee</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Employee Modal -->
  <div>
    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">Add New Employee</button>
    <div class="modal" id="addEmployeeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Employee</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addEmployee">
              <input v-model="newEmployee.name" type="text" class="form-control" placeholder="Name" required />
              <select v-model="newEmployee.gender" class="form-control">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input v-model="newEmployee.position" type="text" class="form-control" placeholder="Position" required />
              <input v-model="newEmployee.department" type="text" class="form-control" placeholder="Department" required />
              <input v-model="newEmployee.salary" type="number" class="form-control" placeholder="Salary" required />
              <button type="submit" class="btn btn-success" @click="insertEmployee()">Add Employee</button>
            </form>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchQuery: '',
      newEmployee: {
        name: '',
        gender: '',
        position: '',
        department: '',
        salary: ''
      },
      selectedEmployee: null

    }
  },
  computed:{
    filteredEmployees() {
      return this.$store.state.employees.filter(employee =>
        employee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

  },
   // the code runs when the component loads
  mounted(){
    this.$store.dispatch('getEmployees')
  
  },
  methods:{
    removeEmployee(employee_id){
      this.$store.dispatch('removeEmployee',employee_id)
    },
    insertEmployee(){
      this.$store.dispatch('insertEmployee',this.newEmployee);
      this.newEmployee = {name: '', gender: '', position: '', department: '', salary: ''};
    },
    updateEmployee(){
      if(this.selectedEmployee){
        this.$store.dispatch('updateEmployee', this.selectedEmployee);

      }
    

    },
    getSingleEmployee(employee) {
      this.selectedEmployee = employee;
      new bootstrap.Modal(document.getElementById('employeeModal')).show();
    },
    employeeImage(employee) {
      return require(`@/assets/${employee.gender === 'Female' ? 'female-employee.jpg' : 'male-employee-icon.jpg'}`);
    }
  },

  }
</script>

<style scoped>
.search-bar { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
.card { background-color: grey; box-shadow: 10px 10px; margin: 20px; }
</style>
