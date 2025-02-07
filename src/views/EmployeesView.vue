<template>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><router-link to="/Welcome" class="nav-link">Homepage</router-link></li>
            <li class="nav-item"><router-link to="/Employees" class="nav-link">Employees</router-link></li>
            <li class="nav-item"><router-link to="/Attendance" class="nav-link">Attendance Tracking</router-link></li>
            <li class="nav-item"><router-link to="/Payroll" class="nav-link">Payroll</router-link></li>
            <li class="nav-item"><router-link to="/" class="nav-link active" aria-current="page">Log out</router-link></li>
          </ul>
        </div>
      </div>
      <a to="/Welcome" class="navbar-brand">Modern Tech Solutions</a>
    </nav>
  
    <!-- Search Bar -->
    <div>
      <br>
      <input type="text" v-model="searchQuery" placeholder="Search by Employee Name or Department" class="search-bar" />
    </div>
  
    <br><br>
  
    <!-- Employee Cards -->
    <div class="row">
  <div class="card" v-for="employee in $store.state.employees" :key="employee.employee_id" style="width: 18rem;">
    <img :src="employeeImage(employee)" class="card-img-top" alt="Employee Icon" />
    <div class="card-body">
      <h5 class="card-title">Employee</h5>
      <p class="card-text">{{ employee.name }}</p>
      <p class="card-text">{{ employee.position }}</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#employeeModal" @click="fullDetails(employee)">Full Details</button>
    </div>
  </div>
</div>

  
    <!-- Employee Details Modal -->
    <div class="modal" id="employeeModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Full Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body" v-if="employee">
            <p v-if="employee.employee_id">Employee Id: {{ employee.employee_id }}</p>
            <p v-if="employee.name">Name: {{ employee.name }}</p>
            <p v-if="employee.gender">Gender: {{ employee.gender }}</p>
            <p v-if="employee.position">Position: {{ employee.position }}</p>
            <p v-if="employee.department">Department: {{ employee.department }}</p>
            <p v-if="employee.employeeHistory">Employment History: {{ employee.employeeHistory }}</p>
            <p v-if="employee.salary">Salary: {{ employee.salary }}</p>
            <p v-if="employee.email">Business Email: {{ employee.email }}</p>
        </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editEmployee(employee)">Edit</button>
            <button type="button" class="btn btn-danger mt-2" @click="removeEmployee(employee.employee_id)">Remove Employee</button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Add Employee Button & Modal -->
    <div>
      <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addEmployeeModal">Add New Employee</button>
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
                  <label class="form-label">Name</label>
                  <input v-model="newEmployee.name" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Gender</label>
                  <select v-model="newEmployee.gender" class="form-control">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Position</label>
                  <input v-model="newEmployee.position" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Department</label>
                  <input v-model="newEmployee.department" type="text" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label class="form-label">Salary</label>
                  <input v-model="newEmployee.salary" type="number" class="form-control" required />
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
  export default {
    data() {
        return {
            searchQuery: '',
            employee: null,
            newEmployee: { name: '', gender: '', position: '', department: '', salary: 0 },
    };
    },
    computed: {
    filteredEmployees() {
    if (!Array.isArray(this.$store.state.employees)) {
      return []; // Return an empty array if employees is not an array
    }

    const query = this.searchQuery.toLowerCase();
    return this.searchQuery
    ? this.$store.state.employees.filter(employee =>
            employee.name.toLowerCase().includes(query) ||
            employee.department.toLowerCase().includes(query)
        )
      : this.$store.state.employees; // Show all employees if no search query
}
}

,
    methods: {
        fullDetails(employee) {
        this.employee = employee;
    },
    async removeEmployee(employee_id) {
    const confirmRemoval = confirm("Are you sure you want to remove this employee?");
    if (confirmRemoval) {
        this.$store.dispatch('removeEmployee', employee_id);
    }
},
    insertEmployee() {
        if (!this.newEmployee.name || !this.newEmployee.position || !this.newEmployee.department) {
        alert("All fields are required!");
        return;
    }

    const newEmployee = { ...this.newEmployee, employee_id: Date.now() };

    try {
        this.$store.dispatch('insertEmployee', newEmployee);
        alert("Employee added successfully!");
        this.newEmployee = { name: '', gender: '', position: '', department: '', salary: 0 };
    } catch (error) {
        alert("Error adding employee");
    }
},
    updateEmployee(){
        
    },

    employeeImage(employee) {
        return require(`@/assets/${employee.gender === 'Female' ? 'female-employee.jpg' : 'male-employee-icon.jpg'}`);
    },

    },
    mounted() {
    this.$store.dispatch("getEmployees").then(() => {
    console.log("Vuex Employees:", this.$store.state.employees);
});
}

};
</script>

<style scoped>
.search-bar { padding: 8px; width: 100%; margin: 0 auto; display: block; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; box-sizing: border-box; }
body { background-color: cadetblue; }
.card { background-color: grey; box-shadow: 10px 10px; margin: 20px; }
    img { border-radius: 80%; }
</style>
