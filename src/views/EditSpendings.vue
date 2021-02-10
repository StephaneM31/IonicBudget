<template>
<Layout>
  <template #content>
  <ion-page>
    

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size-md="6" offset-md="3">
            <ion-card>
              <ion-card-header>
                <ion-card-subtitle>Nouvelle commande</ion-card-subtitle>
              </ion-card-header>

              <ion-card-content>
                <ion-item>
                  <ion-label position="floating" type="text"
                    >Produits</ion-label
                  >
                  <ion-input v-model="description" type="text"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="floating">Montant</ion-label>
                  <ion-input type="number" v-model="montant"></ion-input>
                </ion-item>
                <div class="ion-text-right ion-margin-vertical">
                  <ion-button fill="outline" color="danger" @click="clearAll()"
                    ><ion-icon name="close-circle-outline"></ion-icon>TOUT
                    EFFACER</ion-button
                  ><ion-button @click="pushSpend()"
                    ><ion-icon name="add-sharp"></ion-icon>CREER LA
                    COMMANDE</ion-button
                  >
                </div>
              </ion-card-content>
            </ion-card>
            <ion-list v-for="Item in list" :key="Item.id">
              <ion-item>
                <ion-label
                  >{{ Item.description }}: {{ Item.montant }} €
                  <!-- {{ Item.key }}--></ion-label
                ><ion-button
                  fill="outline"
                  color="danger"
                  @click="clearOne(Item.key)"
                  ><ion-icon name="close-circle-outline"></ion-icon
                ></ion-button>
              </ion-item>
            </ion-list>
            <ion-item>
              <ion-label class="ion-text-right"
                ><b>Total: {{list.length}} commandes pour un total de {{ total }} €</b></ion-label
              >
            </ion-item>
            <router-link to="/home">Retour</router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>

   </template>
</Layout>
</template>

<script lang="ts">
/*class Item {
  description: string;
  montant: number;
  key: string;
  constructor(description: string, montant: string, key?: string) {
    //key est un parametre optionnel nullable
    this.description = description;
    this.montant = parseInt(montant);
    if (key == null) {
      this.key = "";
    } else {
      this.key = key.toString();
    }
  }
}*/

import {
  IonContent,
  IonCard,
  IonPage,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonLabel,
  IonInput,
  IonItem,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  alertController,
} from "@ionic/vue";
import firebase from "../services/firebase";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { addSharp, closeCircleOutline } from "ionicons/icons";
import { Item } from "../beans/Item";
import Layout from '../components/Layout.vue';

addIcons({
  "add-sharp": addSharp,
  "close-circle-outline": closeCircleOutline,
});
export default defineComponent({
  name: "EditSpendings",
  components: {
    IonContent,
    IonPage,
    IonCard,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonList,
    Layout
  },

  data() {
    return {
      list: Array<Item>(),
      description: "",
      montant: "",
      total: 0,
      itemRef: firebase.ref().child("list"),
      key: firebase.ref().key, //recuperation de la clé de la db d firebase
    };
  },
  //push des elements de la db vers mon composant en amont
  async created() {
    try {
      this.itemRef.once("value", (snapshot) => {
        snapshot.forEach((element) => {
          const childData = element.val() as Item; //cast en objet Item
          const childId = element.key;
          console.log("id : " + childId);
          this.total += childData.montant;
          this.list.push(
            new Item(
              childData.description,
              childData.montant.toString(),
              childId?.toString()
            )
          );
        });
      });
      console.log(this.list);
    } catch (error) {
      console.log("error" + error);
    }
  },

  methods: {
    pushSpend: function() {
      if (!this.montant || !this.description || parseInt(this.montant) < 1) {
        this.presentAlertCheckInputs();
      } else {
        try {
          const newItem = new Item(this.description, this.montant); //une nouvelle depense se nomera newItem
          const dbData = this.itemRef.push(newItem); //on push newItem dans la db
          newItem.key = dbData.key as string;
          // EN LOCAL
          this.list.push(newItem);
        } catch (error) {
          console.log(error);
        }

        this.totalSpend();
        console.log(this.list);
        //console.log(this.key);
        this.description = "";
        this.montant = "";
        //alert("Dépense créée");
      }
    },
    clearAll: function() {
      this.description = "";
      this.montant = "";
      this.list.splice(0, this.list.length);
      this.total = 0;
      this.itemRef.remove();

      //alert("Effacer OK");
    },

    clearOne: function(key: string) {
      console.log(key);
      let index = -1;
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].key == key) {
          index = i;
        }
      }
      console.log(index);
      this.itemRef.child(this.list[index].key).remove();

      //EN LOCAL
      this.total -= this.list[index].montant;
      this.list.splice(index, 1);

      //alert("Effacer OK");
    },

    totalSpend: function() {
      this.total = 0;

      this.list.forEach(
        (totalDepenses: Item) => (this.total += totalDepenses.montant)
      );
    },
    async presentAlertCheckInputs() {
      const alert = await alertController.create({
        header: "ATTENTION",
        subHeader: "Les données sont incorrectes",
        message: "Vérifiez le format des données",
        buttons: ["OK"],
      });
      return alert.present();
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
