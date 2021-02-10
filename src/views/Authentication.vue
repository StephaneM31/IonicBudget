<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title>Authentification</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" offset-md="3">
      <ion-card>
        <ion-card-header>
          <ion-card-title> Bienvenue dans "My Spendings" ! </ion-card-title>
          <ion-card-subtitle> Se connecter </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <form
            @submit.prevent="
              mode === AuthMode.SignIn
                ? signInWithEmailAndPassword(email, password)
                : signUpWithEmailAndPassword(name, email, password)
            "
          >
            <ion-item v-if="mode === AuthMode.SignUp">
              <ion-label position="floating">Pseudo</ion-label>
              <ion-input v-model="name"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Mot de passe</ion-label>
              <ion-input v-model="password" type="password"></ion-input>
            </ion-item>
            <ion-button
              expand="block"
              color="primary"
              class="ion-margin-top"
              type="submit"
            >
              {{ mode === AuthMode.SignIn ? "Connexion" : "S'enregistrer" }}
            </ion-button>
            <ion-button
              expand="block"
              color="secondary"
              class="ion-margin-top"
              @click="
                mode =
                  mode === AuthMode.SignIn ? AuthMode.SignUp : AuthMode.SignIn
              "
            >
              {{ mode === AuthMode.SignIn ? "S'enregistrer" : "Annuler" }}
            </ion-button>
          </form>
        </ion-card-content>
        <ion-card-content v-if="errorMsg" class="error-message">
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
       </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";
import { auth, db } from "../main";
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

enum AuthMode {
  SignIn,
  SignUp,
}

export default {
  name: "Authenication",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonCardHeader,
  },
  
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      email: "",
      password: "",
      mode: AuthMode.SignIn,
      errorMsg: "",
    });

    const signInWithEmailAndPassword = async (
      email: string,
      password: string
    ) => {
      try {
        if (!email || !password) {
          state.errorMsg = "Email et mot de passe obligatoires!";
          return;
        }

        await auth.signInWithEmailAndPassword(email, password);
        router.push("/home");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };

    const signUpWithEmailAndPassword = async (
      name: string,
      email: string,
      password: string
    ) => {
      try {
        if (!name || !email || !password) {
          state.errorMsg = "Pseudo, email et mot de passe obligatoires!";
          return;
        }

        const authRes = await auth.createUserWithEmailAndPassword(
          email,
          password
        );

        db.collection("users")
          .doc(authRes.user?.uid)
          .set({
            name,
            email,
          });

        router.push("/home");
      } catch (error) {
        state.errorMsg = error.message;
      }
    };
    

    return {
      ...toRefs(state),
      signInWithEmailAndPassword,
      signUpWithEmailAndPassword,
      AuthMode,
    };
  },
};
</script>

<style>
.center {
  display: flex;
  height: 90vh;
  width: 100%;
  align-items: center;
  justify-content: center;
}
.error-message {
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
  text-align: center;
}
</style>
