<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#exampleModal' + employee.employee_id">
    EDIT
  </button>

  <!-- Modal -->
  <div class="modal fade" :id="'exampleModal' + employee.employee_id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Employee Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Employee ID (disabled) -->
          <div class="mb-3">
            <label for="employeeId" class="form-label">Employee ID</label>
            <input type="text" class="form-control" id="employeeId" disabled v-model="editedEmployee.employee_id">
          </div>
          <!-- Position -->
          <div class="mb-3">
            <label for="position" class="form-label">Position</label>
            <input type="text" class="form-control" id="position" v-model="editedEmployee.position" placeholder="Position">
          </div>
          <!-- Salary -->
          <div class="mb-3">
            <label for="salary" class="form-label">Salary</label>
            <input type="number" class="form-control" id="salary" v-model="editedEmployee.salary" placeholder="Salary">
          </div>
          <!-- Department ID -->
          <div class="mb-3">
            <label for="departmentId" class="form-label">Department ID</label>
            <input type="text" class="form-control" id="departmentId" v-model="editedEmployee.department_id" placeholder="Department ID">
          </div>
        </div>
        <div class="modal-footer">
          <!-- Save Button -->
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="updateEmployee()">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
props: ["employee"], 
data() {
  return {
    // Initializing editedEmployee data model from the prop
    editedEmployee: {
      employee_id: this.employee.employee_id,
      position: this.employee.position,
      salary: this.employee.salary,
      department_id: this.employee.department_id,
    },
  };
},
methods: {
  updateEmployee() {
    // Dispatching updateEmployee action to Vuex store to persist changes
    this.$store.dispatch('updateEmployee', this.editedEmployee)
      .then(() => {
        // Optional: Show confirmation message or close modal
        console.log('Employee updated successfully');
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error updating employee:", error);
      });
  },
},
watch: {
  // Watch for changes to the employee prop, ensuring the modal reflects new data
  employee(newVal) {
    this.editedEmployee = { ...newVal };
  },
},
};
</script>

<style scoped>
/* Add any specific styles for the modal if needed */
</style>
