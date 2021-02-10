<template>
  <ion-toolbar color="primary">
    <ion-title size="large">Mon budget</ion-title>
    <button 
        type="submit" 
        class="btn btn-dark btn-lg btn-block"
        @click="logOut()">
            Log out
        </button>
  </ion-toolbar>
</template>

<script>
import { auth } from "../main";
import router from "../router/index";
import { IonToolbar, IonTitle } from "@ionic/vue";
export default {
  name: 'Toolbar',
  components: { IonToolbar, IonTitle },
  

methods: {
  logOut() {
    
    auth.signOut()
    .then(() => {
      router.push("/authentication");
      //console.log("OK");
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
};

  
  
</script>

<style>
</style>