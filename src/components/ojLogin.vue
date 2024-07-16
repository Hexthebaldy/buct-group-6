<!-- <template>
    <div class="login">
      <h2>LOG IN</h2>
      <form @submit.prevent="login" class="log-in-sheet">
        <div>
          <label for="username">Username: </label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div>
          <label for="password">Password : </label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-submit">Login</button>
      </form>
    </div>
  </template> -->
  <template>
    <div class="login">
      <h2>  Wlcome To Coding Hub  </h2>
      <form @submit.prevent="login" class="log-in-sheet">
        <div class="input-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="input-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="login-submit">Login</button>
      </form>
    </div>
  </template>


  <script>
  export default {
    name:'ojLogin',
    data() {
      return {
        users:[
            {
                username:'Tommy',
                password:'12345678'
            },
            {
                username:'Bam',
                password:'87654321'
            },
            {
                username:'Reeves',
                password:'7895123'
            },
        ],
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (this.username && this.password) {
          let flag = false;
          for(let i=0;i<this.users.length;i++){
            if(this.username === this.users[i].username){
                if(this.password === this.users[i].password){
                    flag = true;
                    break;
                }
            }
          }

          if(flag){
            this.$emit('login-success');
          }else{
            alert("Wrong Password or User Name !");
          }

        } else {
          alert('Please enter username and password.');
        }
      }
    }
  }
  </script>
  
<style scoped>
  .login {
    background: rgba(255, 255, 255, 0.9); /* 半透明白色背景 */
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: auto;
    text-align: center;
  }

  .login h2 {
    margin-bottom: 20px;
    color: #333;
  }

  .log-in-sheet {
    display: flex;
    flex-direction: column;
  }

  .input-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }

  .input-group input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .login-submit {
    padding: 10px 20px;
    background-color: rgb(55, 59, 91); /* 更改为指定的颜色 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .login-submit:hover {
    background-color: #52088a;
  }
</style>