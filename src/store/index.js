import { createStore } from 'vuex';

export default createStore({
  state: {
    employees: [],
  },

  getters: {
    
  },

  mutations: {
    // Commit to update the employee list
    setEmployees(state, payload) {
      state.employees = payload;
    },

    setPayroll(state, payload) {
      state.payroll = payload;
    },
  },

  actions: {
    // Get employees from the API and update the state
    async getEmployees({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/employees');
        const data = await response.json();
        commit('setEmployees', data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },

    async removeEmployee({ commit, dispatch }, employee_id) {
      try {
        await fetch(`http://localhost:3000/employees/${employee_id}`, {
          method: 'DELETE',
        });

        
        dispatch('getEmployees');
      } catch (error) {
        console.error('Error removing employee:', error);
      }
    },

    // Insert a new employee and update the state
    async insertEmployee({ dispatch }, employee) {
      try {
        await fetch('http://localhost:3000/employees', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(employee),
        });

        // Fetch the updated employee list after insertion
        dispatch('getEmployees');
      } catch (error) {
        console.error('Error inserting employee:', error);
      }
    },

    // Update employee info and refresh the employee list
    async updateEmployee({ dispatch }, employee) {
      try {
        await fetch(`http://localhost:3000/employees/${employee.employee_id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            position: employee.position,
            salary: employee.salary,
            department_id: employee.department_id,
          }),
        });

        // Fetch the updated employee list after update
        dispatch('getEmployees');
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
  },
});
