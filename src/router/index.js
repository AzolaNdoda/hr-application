import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import PayrollView from '@/views/PayrollView.vue'
import Welcome from '@/components/Welcome.vue'
import EmployeesV from '@/views/EmployeesV.vue'





const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Welcome',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/Employees',
    name: 'Employees',
    component: EmployeesView
  },
  {
    path: '/Payroll',
    name: 'Payroll',
    component: PayrollView
  },
  {
    path: '/Attendance',
    name: 'Attendance',
    component: AttendanceView
  },
  {
    path: '/Employees',
    name: 'Employees',
    component: EmployeesV
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
