import { CanvasWriterPlus } from "../../App/canvesWriter.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { Layered2D } from "../../Mappers/2D/Layered2D.js";
import { BackgroundLayer } from "../../Mappers/2D/Layers/BackgroundLayer.js";
import { GridLayer } from "../../Mappers/2D/Layers/GridLayer.js";
import { RegularNum } from "../../Math/Numbers/RegularNum.js";
import { DesmosVarClassifyer } from "../General/Elements/Var/DesmosVarClassifyer.js";
import { DesmosSideMenu } from "../Menu/DesmosSideMenu.js";
import { IDesmosDisplayer } from "../Menu/IDesmosDisplayer.js";
import { Desmos2DRefranceMeneger } from "./Desmos2DRefranceMeneger.js";
import { FunctionClassifyer } from "./Elements/Function/FunctionClassifyer.js";
import { Desmos2DElementBase } from "./Elements/Desmos2DElementBase.js";
import { Desmos2DPointClassifyer } from "./Elements/Point/Desmos2DPointClassifyer.js";
import { Transformer2DLinearCreator } from "../../Mappers/2D/Transformers/Transformer2DLinear.js";
import { Transformer2DExpXCreator } from "../../Mappers/2D/Transformers/Transformer2DExpX.js";


export class Desmos2DTest extends Layered2D implements IDesmosDisplayer<Desmos2DElementBase>
{
    constructor(writer: CanvasWriterPlus)
    {
        super(writer,Transformer2DLinearCreator);
        this.addLayer(new BackgroundLayer(255,255,255));
        this.addLayer(new GridLayer());
    }

    addElement(element: Desmos2DElementBase) {
        super.addLayer(element);
        super.fullRender()
    }

    removeElement(elementId: IdentifyNumber) {
        super.removeLayer(elementId);
        super.fullRender();
    }

    setSideDiv(div: HTMLDivElement): void {
        const sideMenu = new DesmosSideMenu(div,this,new Desmos2DRefranceMeneger(),[
            new FunctionClassifyer(),
            new Desmos2DPointClassifyer(),
            new DesmosVarClassifyer<RegularNum>(),
        ]);
    }
}