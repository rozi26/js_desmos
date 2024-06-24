import { IdentifyNumber } from "../../General/IdentifyNumber.js";
export class DesmomsClassifyerBase {
    constructor() {
        this.id = new IdentifyNumber();
    }
    setRefrance(refranceMeneger) {
        this.refranceMeneger = refranceMeneger;
    }
    isValid(text) {
        try {
            const res = this.transform(text);
            return true;
        }
        catch (e) { }
        return false;
    }
}
//# sourceMappingURL=DesmosCalssifyerBase.js.map