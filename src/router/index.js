import Login from '@/components/Login.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import Welcome from '@/components/Welcome.vue'
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import PayrollView from '@/views/PayrollView.vue'
// import PayrollView from '../views/PayrollView.vue'





const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  
  },
  {
    path: "/", 
    name: "LoginView",
    component: LoginView 
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

];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protect routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/");
  } else {
    next();
  }
});

export default router;
