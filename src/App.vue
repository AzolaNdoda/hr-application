<template>
  <div>
  

    <!-- Render page content -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoginPage() {
      return this.$route.path === "/login"; // Check if the current route is "/login"
    }
  }
};
</script>

<style>
/* Navbar should be fixed on top */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: rgb(4, 49, 65);
  padding: 10px 20px;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Push content down to avoid being covered by navbar */
body {
  padding-top: 60px;
}
</style>
