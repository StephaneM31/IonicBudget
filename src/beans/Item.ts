export class Item {
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
  }