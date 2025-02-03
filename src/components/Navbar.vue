<template>
  <!--nav bar-->
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/Welcome" class="nav-link" href="#">Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Employees" class="nav-link" href="#">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Attendance" class="nav-link" href="#">Attendance Tracking</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Payroll" class="nav-link" href="#">Payroll</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page" href="#">Log out</router-link>
        </li>
      </ul>
    </div>
  </div>
  <a to="/Welcome" class="navbar-brand" href="#">
    Modern Tech Solutions
    </a>

</nav>
</template>

<script>
export default {
    name: "Navbar"
}
</script>

<style scoped>
.navbar{
    background-color: cadetblue;
}

</style>