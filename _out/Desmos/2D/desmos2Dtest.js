import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { BackgroundLayer } from "../../Mappers/2D/Layers/BackgroundLayer.js";
import { GridLayer } from "../../Mappers/2D/Layers/GridLayer.js";
import { DesmosVarClassifyer } from "../General/Elements/Var/DesmosVarClassifyer.js";
import { DesmosSideMenu } from "../Menu/DesmosSideMenu.js";
import { Desmos2DRefranceMeneger } from "./Desmos2DRefranceMeneger.js";
import { FunctionClassifyer } from "./Elements/Function/FunctionClassifyer.js";
import { Desmos2DPointClassifyer } from "./Elements/Point/Desmos2DPointClassifyer.js";
import { Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
export class Desmos2DTest extends Layered2D {
    constructor(writer) {
        super(writer, Transformer2DLinearCreator);
        this.addLayer(new BackgroundLayer(255, 255, 255));
        this.addLayer(new GridLayer());
    }
    addElement(element) {
        super.addLayer(element);
        super.fullRender();
    }
    removeElement(elementId) {
        super.removeLayer(elementId);
        super.fullRender();
    }
    setSideDiv(div) {
        const sideMenu = new DesmosSideMenu(div, this, new Desmos2DRefranceMeneger(), [
            new FunctionClassifyer(),
            new Desmos2DPointClassifyer(),
            new DesmosVarClassifyer(),
        ]);
    }
}
//# sourceMappingURL=desmos2Dtest.js.map