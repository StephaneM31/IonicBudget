<template>
<Layout>
    <template #content>
  <ion-page>
  
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-text>Catégories de dépenses</ion-text>
        </ion-card-header>
        <ion-list v-for="list in lists" :key="list.id">
          <router-link to="/spendings">{{ list.name }}</router-link>
        </ion-list>

        <ion-button @click="openPopover">New</ion-button>
      </ion-card>
    </ion-content>
  </ion-page>
  </template>
  </Layout>
</template>
<script lang="ts">
import Popover from "./Popover.vue";
import { defineComponent } from "vue";
import { List } from "../beans/List";
import { Item } from "../beans/Item";
import Layout from "../components/Layout.vue";
import {
  IonText,
  IonCardHeader,
  IonList,
  IonButton,
  IonCard,
  popoverController,
} from "@ionic/vue";
export default defineComponent({
  name: "Home",
  components: {
    IonText,
    IonCardHeader,
    IonList,
    IonButton,
    IonCard,
    Layout
  },
  data() {
    return {
      lists: Array<List>(),
    };
  },
  methods: {
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: Popover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true,
      });
      popover.onDidDismiss().then((listName) => {
        console.log(listName);
        if (listName.role != "backdrop" && listName.data != "") {
          const newList = new List(listName.data, new Array<Item>());
          this.lists.push(newList);
        }
      });
      return popover.present();
    },
  },
});
</script>

<style></style>
