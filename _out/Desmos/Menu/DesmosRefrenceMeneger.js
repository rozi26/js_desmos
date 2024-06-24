export class RefrenceKey {
    constructor(owner) {
        this.id = owner.ID;
    }
}
export class DesmosRefrenceMeneger {
    constructor() {
        this.Names = new Map();
        this.Elems = new Map();
    }
    SignElement(element) {
        this.Elems.set(element.ID, element);
        return new RefrenceKey(element);
    }
    UnsignElement(key) {
        this.Elems.delete(key.id);
        for (let name in this.Names.keys) {
            if (this.Names.get(name).equalTo(key.id))
                this.Names.delete(name);
        }
    }
}
//# sourceMappingURL=DesmosRefrenceMeneger.js.map