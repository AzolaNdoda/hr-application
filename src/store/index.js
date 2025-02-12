import { createStore } from 'vuex';

export default createStore({
state: {
    payroll: null,
    employees: null

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
    }
    
},
modules: {
}
})


























