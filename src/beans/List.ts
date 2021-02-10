import { Item } from './Item'

export class List {
  name: string
  spendings: Array<Item>
 

  constructor(name: string, spendings: Array<Item>) {
    this.name = name
    this.spendings = new Array<Item>()
    spendings.forEach((spending) => {
      this.spendings.push(spending)
    })
    }
}