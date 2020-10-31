import { Dag } from './dag';

export class OpeningsUren {

  id: number;
  dagen: Dag[];

  constructor(id: number, dagen: Dag[]) {
    this.id = id;
    this.dagen = dagen;
  }
}
