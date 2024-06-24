import { Action } from "../../General/Action.js";
import { ElementBox } from "./ElementBox.js";
import { DesmomsClassifyerBase } from "./DesmosCalssifyerBase.js";
import { NullCalssifyer } from "../General/NullCalssifyers.js";
import { IDesmosDisplayer } from "./IDesmosDisplayer.js";
import { DesmosElementBase } from "./DesmosElementBase.js";
import { DesmosRefrenceMeneger } from "../General/DesmosRefrenceMeneger.js";

export class DesmosSideMenu<T extends DesmosElementBase>
{
    protected Div: HTMLDivElement;
    protected Classifyers: DesmomsClassifyerBase<T>[];
    protected refranceMeneger: DesmosRefrenceMeneger<T>;
    protected Displayer: IDesmosDisplayer<T>
    protected ELEMENTS: ElementBox<T>[];
    protected elementChangeAction: Action<ElementBox<T>>

    constructor(div: HTMLDivElement,
                displayer: IDesmosDisplayer<T>,
                refranceMeneger: DesmosRefrenceMeneger<T>,
                calssifyers: DesmomsClassifyerBase<T>[])
    {
        this.Div = div;

        this.Classifyers = calssifyers;
        this.Displayer = displayer;
        this.refranceMeneger = refranceMeneger;
        this.ELEMENTS = [];
        this.elementChangeAction = new Action();
        this.elementChangeAction.addFunc((elem: ElementBox<T>) => this.onElementChange(elem))
        this.addElement();

        this.Classifyers.forEach(classifyer => classifyer.setRefrance(this.refranceMeneger));
    }

    addElement()
    {
        const elem = new ElementBox(this.elementChangeAction);
        this.ELEMENTS.push(elem);
        this.Div.appendChild(elem.getDiv());
    }

    onElementChange(element: ElementBox<T>)
    {
        if (element.id.equalTo(this.ELEMENTS[this.ELEMENTS.length - 1].id)) this.addElement();
        let text = element.text;

        for (let i = 0; i < this.Classifyers.length; i++)
        {
            const classifyer = this.Classifyers[i];
           
            const equalIdex = text.indexOf("=");
            let name;
            if (equalIdex < 1) name = "autoname" + ~~(Math.random()*10000000);
            else
            {
                name = text.substring(0,equalIdex);
                text = text.substring(equalIdex + 1);
            }

            if (!classifyer.isValid(text)) continue;
            element.changeElem(classifyer);
            this.Displayer.removeElement(element.id);
            this.Displayer.addElement(element.getElem())
            break;
        }
    }
}