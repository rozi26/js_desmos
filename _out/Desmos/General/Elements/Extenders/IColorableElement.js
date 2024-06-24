import { getRandomInt } from "../../../../Math/General.js";
import { DESMOS_ELEMENTS_COLORS } from "../../../../App/settings.js";
export class ColorPicker {
    constructor() {
        this.color = DESMOS_ELEMENTS_COLORS[getRandomInt(0, DESMOS_ELEMENTS_COLORS.length)];
    }
    getColor() {
        return this.color;
    }
}
//# sourceMappingURL=IColorableElement.js.map