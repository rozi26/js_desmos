export class RefrenceKey {
    constructor(owner, name) {
        this._loopCheckTemp = 0;
        this.id = owner.ID;
        this.name = name;
    }
}
export class DesmosRefrenceMeneger {
    constructor() {
        this.loopCheckInx = 0;
        this.Names = new Map();
        this.Elems = new Map();
    }
    SignElement(element, name) {
        if (this.Keys.has(element.ID))
            return this.Keys.get(element.ID);
        this.Elems.set(element.ID, element);
        const key = new RefrenceKey(element, name);
        this.Keys.set(element.ID, key);
        return key;
    }
    UnsignElement(key) {
        this.Keys.delete(this.Elems.get(key.id).ID);
        this.Elems.delete(key.id);
        for (let name in this.Names.keys) {
            if (this.Names.get(name).equalTo(key.id))
                this.Names.delete(name);
        }
    }
}
//# sourceMappingURL=DesmosRefrenceMeneger.js.map