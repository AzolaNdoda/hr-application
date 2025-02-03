<template>
  <div class="container">
    <div class="content">
      <h1 class="welcome-message">Welcome to ModernTech Solutions</h1>
      <p class="motto">"Crafting elegant and efficient software solutions that empower our clients."</p>
      
      <!-- Centered Explore Workplace Button -->
      <router-link to="/Employees" class="btn">Explore Workplace</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<style scoped>
/* Full-screen centered layout */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://i.pinimg.com/736x/47/5f/31/475f31d24a3b94078c1a4199604a71b0.jpg");
  background-size: cover;
  background-position: center;
  text-align: center;
  flex-direction: column;
  margin: 0;
  max-width: 100%;

}

/* Content wrapper */
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Welcome message */
.welcome-message {
  font-size: 50px;
  text-shadow: 5px 5px navy;
  color: white;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out;
}

/* Motto styling */
.motto {
  text-shadow: 3px 3px white;
  font-size: 30px;
  font-weight: bold;
  color: navy;
  margin-bottom: 30px;
  animation: fadeIn 3s ease-in-out;
}

/* Explore Workplace Button - Centered */
.btn {
  display: inline-block;
  padding: 15px 30px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: #1E3A8A;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease-in-out;
}

.btn:hover {
  background-color: #3B82F6;
}

/* Fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
