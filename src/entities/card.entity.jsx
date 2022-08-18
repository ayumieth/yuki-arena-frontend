export default class Card {

  // get power() {
  //   return this.offense + this.defense + this.energy;
  // }

  // get cost() {
  //   return parseFloat(this.power * ((Math.random() + 1) * 3));
  // }

  constructor(model = {}) {
    this.tokenId = model?.tokenId ?? 0;
    this.name = model?.name ?? "Unknown";
    this.image = model?.image ?? '';

    this.element = model?.element ?? 0;
    this.power = model?.power ?? 0;
    // this.number = model?.number ?? 0;
    // this.energy = model?.energy ?? 0;
    // this.offense = model?.offense ?? 0;
    // this.defense = model?.defense ?? 0;
  }
}
