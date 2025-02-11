import { createStore } from 'vuex';

export default createStore({
  state: {
    employees: null,
    
  },

  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },

  },

  actions: {
    async getEmployees({commit},payload) {
      let {employees} = await (await fetch('http://localhost:3000/employees')).json()
      commit('setEmployees',employees)
      },
      async removeEmployee({commit},employee_id){
        await fetch('http://localhost:3000/employees/'+employee_id,{
          method:'DELETE'
        })
        location.reload()
      },
      async insertEmployee({commit},employee){
        console.log(employee);
        await fetch('http://localhost:3000/employees',{
          method:'POST',
          headers:{
            "Content-type":"application/json"
          },
          body:JSON.stringify({
            name: employee.name,
            gender: employee.gender,
            position: employee.position,
            salary: employee.salary,
            employmentHistory: employee.employmentHistory,
            email: employee.email,
            department_id: employee.department_id
          })
        })
        location.reload()
        },
        async updateEmployee({ commit }, employee) {
          await fetch(`http://localhost:3000/employees/${employee.employee_id}`, {
              method: "PATCH",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({
                  name: employee.name,
                  gender: employee.gender,
                  position: employee.position,
                  salary: employee.salary,
                  employmentHistory: employee.employmentHistory,
                  email: employee.email,
                  department_id: employee.department_id
              })
          });
  
          commit("setEmployees", await (await fetch("http://localhost:3000/employees")).json());
      }
      
    },



});
