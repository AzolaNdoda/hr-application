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
},
getters: {
},
mutations: {
    // Set the initial payroll data
    setPayroll(state, payload) {
        state.payroll = payload;
    },

    // Set employees data
    setEmployees(state, payload) {
        state.employees = payload;
    },

    // Remove payroll from state after deletion
    REMOVE_PAYROLL(state, pay_id) {
        state.payroll = state.payroll.filter(item => item.pay_id !== pay_id);
    },

    // Add new payroll record to state
    ADD_PAYROLL(state, newPayroll) {
        state.payroll.push(newPayroll);
    },

    // Update an existing payroll record
    UPDATE_PAYROLL(state, updatedPayroll) {
        const index = state.payroll.findIndex(item => item.pay_id === updatedPayroll.pay_id);
        if (index !== -1) {
            state.payroll.splice(index, 1, updatedPayroll);
        }
    }
},
actions: {
    // dispatch
    async getData({commit},payload){
        // let payroll =  await fetch('http://localhost:3000/payroll')
        // let info = await payroll.json()
        let {payroll} = await (await fetch('http://localhost:3000/payroll')).json()
        commit('setPayroll',payroll) 
    },
    // async getEmployees({commit},payload){
    //     let {employees} = await (await fetch('http://localhost:3000/employees')).json()
    //     commit('setEmployees', employees)
    // },
    async deletePayroll({ commit }, pay_id) {
        console.log("Deleting Payroll ID:", pay_id);
    
        try {
            await fetch(`http://localhost:3000/payroll/${pay_id}`, {
                method: 'DELETE'
            });
    
            commit('REMOVE_PAYROLL', pay_id);
        } catch (error) {
            console.error("Error deleting payroll:", error);
        }
    },

    async insertPayroll({ commit }, newPayroll) {
        console.log("Adding Payroll:", newPayroll);
    
        try {
            const response = await fetch('http://localhost:3000/payroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPayroll)
            });
    
            const data = await response.json();
            commit('ADD_PAYROLL', data);
        } catch (error) {
            console.error("Error adding payroll:", error);
        }
    },

    async editPayroll({ commit }, updatedPayroll) {
        console.log("Editing Payroll:", updatedPayroll);
    
        try {
            const response = await fetch(`http://localhost:3000/payroll/${updatedPayroll.pay_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedPayroll)
            });
    
            const data = await response.json();
            commit('UPDATE_PAYROLL', data);
        } catch (error) {
            console.error("Error updating payroll:", error);
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
  modules: {
  }
});

    

























    