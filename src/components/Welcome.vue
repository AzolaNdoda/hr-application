<template>
<div class="container">
    
    <div class="welcome-message">Welcome to ModernTech Solutions</div>
    <div class="motto">"Crafting elegant and efficient software solutions that empower our clients."</div>
</div>
</template>
<script>
export default {
    name: "Welcome"
    
}
</script>
<style scoped>
.container{
  font-family: Arial, sans-serif;
  background-image: url("https://i.pinimg.com/736x/47/5f/31/475f31d24a3b94078c1a4199604a71b0.jpg");
  height: 100vh;
  margin: 0;
  max-width: 100%;
  padding-top: 250px;
  background-size: cover;
}
.welcome-message {
  font-size: 50px;
  text-shadow: 5px 5px navy;
  color: white;
  margin-bottom: 20px;
  margin-left: 300px;
  animation: close 5s 1;
}
.motto {
  text-shadow: 3px 3px white;
  font-size: 30px;
  font-weight: bolder;
  color: navy;
  margin-top: 50px;
  margin-left: 150px;
  animation: tech 5s 1;
}
@keyframes close {
  0% {
    margin-top: 40px;
  }
  30% {
    letter-spacing: 40px;
    margin-bottom: -40px;
  }
  85% {
    letter-spacing: 40px;
    margin-bottom: -40px;
  }
}
@keyframes tech {
  0% {
    margin-bottom: -30px;
    opacity: 0;
  }
  30% {
    opacity: 0;
    margin-bottom: -30px;
  }
  85% {
    letter-spacing: 4px;
    margin-bottom: -35px;
    opacity: 0;
  }
}
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
}
.dropdown-item:hover {
  background-color: blue;
  color: white;
}
</style>