<template>

  <div class="loading">
    <img src="" alt="">
    <p class="loading-text">Loading....Please wait</p>
    <div class="spinner">
      <span></span>
    </div>
  </div>
  <br>
  <br><br>
  <div class="login-container">
    <h1>ModernTech Solutions</h1>
    <h2>Login Page</h2>
    <p>Please enter your login details :)</p>
    <form @submit.prevent="validateLogin">
      <div class="tbox">
        <input v-model="username" type="text" placeholder="Username">
      </div>
      <div class="tbox">
        <input v-model="password" type="password" placeholder="Employee ID">
      </div>
      <div class="tbox">
        <input v-model="email" type="email" placeholder="siba17@moderntech.com">
      </div>
      <input class="btn" type="submit" value="LOG IN">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    validateLogin() {
      if (this.username && this.password && this.email) {
        this.$router.push('/welcome'); // Navigate to the Welcome page
      } else {
        alert('Please fill in all fields!');
      }
    },
  },
};
</script>

  <style scoped>
  body {
  background-image: url('https://i.pinimg.com/736x/47/5f/31/475f31d24a3b94078c1a4199604a71b0.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  font-family: Arial, sans-serif;
}
  .login-container {
    width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 10px solid #ccc;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  .login-container {
    background-image: url('https://i.pinimg.com/736x/47/5f/31/475f31d24a3b94078c1a4199604a71b0.jpg');
    background-size: cover;
  }
  
  h1 {
    color: #f2f2f2;
    font: bold 50px 'Times New Roman';
  }
  h2 {
    color: #F2F2F2;
  }
  p {
    color: #F2F2F2;
  }
  .tbox {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 1px;
    padding: 10px;
  }
  .btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: blueviolet;
  }
  .loading{
    position: fixed;
    background-color: lightblue
    ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    animation: 1s fadein forwards;
    animation-delay: 2s;
  }
  .loading-text{
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 10px;
  }
  @keyframes fadein {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  @keyframes spinner{
    0%{ transform: rotate(0deg);}
    100%{ transform: rotate(360deg);}
  }
  .spinner{
    animation: spinner 1s linear infinite;
    border: 4px solid #FF0000;
    border-radius: 50%;
    border-top-color: transparent;
    width: 50px;
    height: 50px;
  }
  </style>