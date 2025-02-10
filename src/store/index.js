import { createStore } from 'vuex'

export default createStore({
state: {
    payroll: null,
    // employees: null

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
        let {payroll} = await (await fetch('http://localhost:3000/payroll')).json()
         
        console.log(payroll);
        commit('setPayroll',payroll)

    },

    async deletePayroll({commit},pay_id){
        // await fetch('http://localhost:3000/payroll/'+payload)
        console.log(pay_id);
        
    }
},
modules: {
}
})


























