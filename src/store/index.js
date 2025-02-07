import { createStore } from 'vuex';

export default createStore({ 
    state: {
        employees: []
    },
    getters: {},
    mutations: {
        setEmployees(state, employees) {
        state.employees = employees;
    },
        insertEmployee(state, employee) {
        state.employees.push(employee); // Add the new employee to the employees array
    },
        removeEmployee(state, employeeId) {
        state.employees = state.employees.filter(employee => employee.employee_id !== employeeId);
    },
        updateEmployee(state,employees){
            state.employees = employees
        }
    },
    actions: {
        async getEmployees({ commit }) {
            try {
            const response = await fetch('http://localhost:3000/employees');
            if (!response.ok) throw new Error("Failed to fetch employees");
            const data = await response.json();
            commit("setEmployees", data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
        },
        async insertEmployee({ commit }, employee) {
          commit('insertEmployee', employee); // Adds to Vuex store
        },
        async removeEmployee({ commit }, employee_id) {
          commit('removeEmployee', employee_id); // Removes from Vuex store
        },
        async updateEmployee({commit}, employee){
            commit('updateEmployee',employee)
        }
    },

    modules: {}
});
