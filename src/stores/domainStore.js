import { makeAutoObservable } from "mobx";

class DomainStore {

    constructor(rootStore) {
        makeAutoObservable(this, {}, { autoBind: true });
        this.rootStore = rootStore;
    }
}

export default DomainStore;