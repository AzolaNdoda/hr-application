import { createStore } from 'vuex';

export default createStore({
  state: {
    employees: null, // Changed from `null` to an empty array
    singleEmployee: null // To store a single employee when fetching details
  },

  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },

    addEmployee(state, newEmployee) {
      state.employees.push(newEmployee);
    },

    removeEmployee(state, employee_id) {
      state.employees = state.employees.filter(emp => emp.employee_id !== employee_id);
    },

    updateEmployee(state, updatedEmployee) {
      const index = state.employees.findIndex(emp => emp.employee_id === updatedEmployee.employee_id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },

    setSingleEmployee(state, payload) {
      state.singleEmployee = payload;
    }
  },

  actions: {
    async getEmployees({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/employees');
        const employees = await response.json();
        commit('setEmployees', employees); // Directly setting the array
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },

    async removeEmployee({ commit }, employee_id) {
      try {
        await fetch(`http://localhost:3000/employees/${employee_id}`, {
          method: 'DELETE'
        });
        commit('removeEmployee', employee_id); // Updating state without reloading page
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },

    async insertEmployee({ commit }, newEmployee) {
      try {
        const response = await fetch('http://localhost:3000/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEmployee)
        });
        const createdEmployee = await response.json();
        commit('addEmployee', createdEmployee); // Add new employee to state
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    },

    async updateEmployee({ commit }, updatedEmployee) {
      try {
        await fetch(`http://localhost:3000/employees/${updatedEmployee.employee_id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedEmployee)
        });
        commit('updateEmployee', updatedEmployee); // Update employee in state
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },

    async getSingleEmployee({ commit }, employee_id) {
      try {
        const response = await fetch(`http://localhost:3000/employees/${employee_id}`);
        const employee = await response.json();
        commit('setSingleEmployee', employee); // Store single employee separately
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }
  }
});
