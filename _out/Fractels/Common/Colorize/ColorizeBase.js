import { Color } from "../../../General/Color.js";
export class ColorizeBase {
    constructor(colorizer) {
        this.colorizer = colorizer;
    }
}
const newtonColors1 = [new Color(200, 40, 40), new Color(40, 40, 200), new Color(40, 200, 40), new Color(200, 200, 40), new Color(40, 200, 200), new Color(200, 40, 200)];
export const NewtonColorizer1 = new ColorizeBase((val) => newtonColors1[~~val]);
//# sourceMappingURL=ColorizeBase.js.map