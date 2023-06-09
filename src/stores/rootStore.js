import { makeAutoObservable } from "mobx";
import DomainStore from "./domainStore";
import UIStore from "./uiStore";

class RootStore {
    constructor() {
        makeAutoObservable(this);
        this.uiStore = new UIStore(this);
        this.domainStore = new DomainStore(this);
    }
}

export default RootStore;