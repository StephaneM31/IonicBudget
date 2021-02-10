<template>
    <ion-item color="primary">
    <ion-title size="large">Mon budget</ion-title>
    <ion-button 
        color="warning"
        type="submit" 
        class="btn btn-dark btn-lg btn-block"
        @click="logOut()">
            Log out
        </ion-button>
        </ion-item>
</template>

<script>
import { auth } from "../main";
import router from "../router/index";
import { IonTitle, IonButton, } from "@ionic/vue";
export default {
  name: 'Toolbar',
  components: { IonTitle, IonButton, },
  

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