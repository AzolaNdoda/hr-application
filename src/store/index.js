import { createStore } from 'vuex'

export default createStore({
state: {
    payroll: null
},
getters: {
},
mutations: {
    // commits
    setPayroll(state, payload){
        state.payroll = payload
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
    async deletePayroll({commit},pay_id){
        // await fetch('http://localhost:3000/payroll/'+payload)
        console.log(pay_id);
        
    }
},
modules: {
}
})


























