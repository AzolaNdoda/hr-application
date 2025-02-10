import { createStore } from 'vuex';

export default createStore({
state: {
    payroll: null,
    employees: null

},
getters: {
},
mutations: {
    // commits
    setPayroll(state, payload){
        state.payroll = payload
    },
    setEmployees(state, payload){
        state.employees = payload
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
    async getEmployees({commit},payload){
        let {employees} = await (await fetch('http://localhost:3000/employees')).json()
        commit('setEmployees', employees)
    },
    async deletePayroll({commit},pay_id){
        // await fetch('http://localhost:3000/payroll/'+payload)
        console.log(pay_id);
        
    }
},
modules: {
}
})


























