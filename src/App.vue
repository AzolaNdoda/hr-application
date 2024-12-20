
<template>
  <div class="navbar">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">ModernTech Solutions</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Menu
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item"><router-link to="/Payroll">Payroll/Payslip</router-link></a></li>
            <li><a class="dropdown-item"><router-link to="/Employees">Employees</router-link> </a></li>
            <li><a class="dropdown-item"><router-link to="/Attendance">Attendance Tracking</router-link> </a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item"><router-link to="/">LOGOUT</router-link></a></li>

          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
  </div>
  <router-view/>
</template>
<script>
export default {
  name: "Navbar"
  
}
</script>
<style>
body{
  background-color: cadetblue;
}
/* Navbar container styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333; /* Dark background */
  color: rgb(4, 49, 65); /* Text color */
  padding: 10px 20px;
  z-index: 1000; /* Ensures it stays above other content */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */
}

/* Flexbox to align brand and navigation */
.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  text-decoration: none;
}

/* Brand styles */
.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: rgb(8, 47, 81);
}

/* Navigation links styles */
.navbar-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin: 0 10px;
  list-style: none;
  text-decoration: none;
}

.navbar-links a {
  text-decoration: none;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

/* Hover effect for links */
.navbar-links a:hover {
  background-color: #575757; /* Light gray background on hover */
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar-links {
    display: none; /* Hide links on smaller screens */
  }
}
</style>


