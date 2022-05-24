import { action, makeAutoObservable, observable } from 'mobx';
import type p5Types from 'p5';

//define store class which will be used to store data, add extra states here

class Store {
  //define your data here

  // @ts-ignore
  p5: p5Types = null;

  constructor() {
    makeAutoObservable(this);
  }
  //you can add functions to manipulate data here
}

export const store = new Store();
