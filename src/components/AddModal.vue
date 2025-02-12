<template>
    <!-- Add Employee Modal -->
    <div class="modal fade" id="employeeModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Employee</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Employee Name" v-model="employee.name">
            </div>
  
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-control" id="gender" v-model="employee.gender">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
  
            <div class="mb-3">
              <label for="position" class="form-label">Position</label>
              <input type="text" class="form-control" id="position" placeholder="Position" v-model="employee.position">
            </div>
  
            <div class="mb-3">
              <label for="salary" class="form-label">Salary</label>
              <input type="number" class="form-control" id="salary" placeholder="Salary" v-model="employee.salary">
            </div>
  
            <div class="mb-3">
              <label for="employmentHistory" class="form-label">Employment History</label>
              <input type="text" class="form-control" id="employmentHistory" placeholder="New Hire" v-model="employee.employmentHistory">
            </div>
  
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="name@moderntech.com" v-model="employee.email">
            </div>
  
            <div class="mb-3">
              <label for="department_id" class="form-label">Department ID</label>
              <input type="text" class="form-control" id="department_id" placeholder="Department ID" v-model="employee.department_id">
            </div>
          </div>
  
        <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="insertEmployee">Save</button>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:["employee"],
    data() {
      return {
        employee: {
          name: '',
          gender: '',
          position: '',
          salary: '',
          employmentHistory: '',
          email: '',
          department_id: ''
        }
      };
    },
    methods: {
      async insertEmployee() {
        // Basic form validation
        if (!this.employee.name || !this.employee.email || !this.employee.position || !this.employee.salary) {
          alert("Please fill out all required fields!");
          return;
        }
  
        try {
          await this.$store.dispatch("insertEmployee", this.employee);
          alert("Employee added successfully!");
          this.resetForm();
  
          // Close modal using Bootstrap
          let modalElement = document.getElementById("employeeModal");
          let modalInstance = bootstrap.Modal.getInstance(modalElement);
          if (modalInstance) modalInstance.hide();
        } catch (error) {
          console.error("Error inserting employee:", error);
          alert("Failed to add employee. Please try again.");
        }
      },
  
      resetForm() {
        this.employee = {
          name: '',
          gender: '',
          position: '',
          salary: '',
          employmentHistory: '',
          email: '',
          department_id: ''
        };
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-content {
    border-radius: 10px;
  }
  </style>
  