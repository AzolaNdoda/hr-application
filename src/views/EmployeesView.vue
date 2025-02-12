<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/Welcome" class="nav-link">Homepage</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Employees" class="nav-link">Employees</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Attendance" class="nav-link">Attendance Tracking</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Payroll" class="nav-link">Payroll</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Log out</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Employee Table -->
  <div class="container mt-5">
    <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#employeeModal">Add Employee</button>
    <table class="table table-striped table-bordered">
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
        <tr v-for="employee in employees" :key="employee.employee_id">
          <td>{{ employee.employee_id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.gender }}</td>
          <td>{{ employee.position }}</td>
          <td>{{ formatCurrency(employee.salary) }}</td>
          <td>{{ employee.employmentHistory }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.department_id }}</td>
          <td>
            <edit-modal :employee="employee" />
          </td>
          <td>
            <button class="btn btn-danger" @click="removeEmployee(employee.employee_id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Add Employee Modal -->
  <add-modal />
</template>

<script>
import AddModal from "@/components/AddModal.vue"; // Import the AddModal component
import EditModal from "@/components/editModal.vue";
import { mapState } from "vuex";

export default {
  components: {
    EditModal,
    AddModal,  
  },
  computed: {
    ...mapState(["employees"]),
  },
  mounted() {
    this.$store.dispatch("getEmployees");
  },
  methods: {
    async removeEmployee(employee_id) {
      try {
        await this.$store.dispatch("removeEmployee", employee_id);
        alert("Employee removed successfully!");
      } catch (error) {
        console.error("Error removing employee:", error);
        alert("Failed to remove employee. Please try again.");
      }
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
      }).format(amount);
    },
  },
};
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(13, 125, 129);
  color: cadetblue;
  padding: 10px 20px;
  z-index: 1050;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Adjust table position below navbar */
.container {
  margin-top: 80px;
}

/* Table Styling */
.table th {
  background-color: rgb(55, 157, 161);
  color: white;
  position: sticky;
  top: 65px;
  z-index: 1000;
  text-align: center;
}

.table td {
  text-align: center;
}
</style>
