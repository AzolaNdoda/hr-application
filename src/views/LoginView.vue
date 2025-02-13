<template>
    <div>
      <!-- LOADING SCREEN -->
      <div v-if="isLoading" class="loading">
        <p class="loading-text">Loading....Please wait</p>
        <div class="spinner"></div>
      </div>
  
      <div class="login-page">
        <div class="login-container">
          <h1>ModernTech Solutions</h1>
          <p>Please enter your login details :)</p>
  
          <form @submit.prevent="login">
            <div class="tbox">
              <input v-model="user_id" type="text" placeholder="UserId" required />
            </div>
            <div class="tbox">
              <input v-model="username" type="text" placeholder="Name" required />
            </div>
            <div class="tbox">
              <input v-model="email" type="email" placeholder="Email" required />
            </div>
            <div class="tbox">
              <input v-model="password" type="password" placeholder="Password" required />
            </div>
            <input class="btn" type="submit" value="LOG IN">
          </form>
  
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user_id: "",
        username: "",
        email: "",
        password: "",
        errorMessage: "",
        isLoading: false,
      };
    },
    methods: {
      async login() {
        this.errorMessage = "";
        this.isLoading = true;
  
        try {
          const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: this.user_id,
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || "Login failed.");
          }
  
          // Store token in localStorage
          localStorage.setItem("token", data.token);
          this.$router.push("/welcome"); // Redirect on success
  
        } catch (error) {
          this.errorMessage = error.message;
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
  </script>
  
  <style>
/* Full-screen background */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("../assets/login-background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
/* LOGIN CONTAINER */
.login-container {
  width: 400px;
  padding: 30px;
  background: rgba(3, 96, 112, 0.8);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  text-align: center;
}
/* HEADINGS */
h1, h2, p {
  color: white;
}
/* TEXTBOX */
.tbox input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
/* LOGIN BUTTON */
.btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: blueviolet;
}
/* ERROR MESSAGE */
.error {
  color: red;
  margin-top: 10px;
}
/* LOADING SCREEN */
.loading {
  position: fixed;
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
/* SPINNER ANIMATION */
.spinner {
  border: 4px solid #FF0000;
  border-top: 4px solid transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spinner 1s linear infinite;
}
@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 