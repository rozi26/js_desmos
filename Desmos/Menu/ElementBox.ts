import { DESMOS_ELEMENT_HEIGHT, DESMOS_ELEMENT_ERROR_HEIGHT } from "../../App/settings.js";
import { Action } from "../../General/Action.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { Desmos2DElementBase } from "../2D/Elements/Desmos2DElementBase.js";
import { NullCalssifyer, NullElement } from "../General/NullCalssifyers.js";
import { DesmomsClassifyerBase } from "./DesmosCalssifyerBase.js";
import { DesmosElementBase } from "./DesmosElementBase.js";

const VBM = 10;

export class ElementBox<T extends DesmosElementBase>
{
    public readonly id: IdentifyNumber;

    protected div: HTMLDivElement;
    protected subdiv1: HTMLDivElement;
    private visabilyDiv: HTMLDivElement;
    private inputBox: HTMLInputElement;
    private errorDiv: HTMLDivElement;
    private errorText: HTMLLabelElement;
    private extandDiv: HTMLDivElement;

    public text: string;
    
    public classify: DesmomsClassifyerBase<T> | NullCalssifyer;
    protected elem: T | NullElement
    public visble: boolean;

    constructor(elementChangeAction: Action<ElementBox<T>>)
    {
        this.id = new IdentifyNumber();
        this.visble = true;

        this.classify = new NullCalssifyer();

        this.div = document.createElement("div");
        this.div.style.width = "100%";
        this.div.style.height = DESMOS_ELEMENT_HEIGHT + "px";
        this.div.style.borderBottomStyle = "solid"
        this.div.style.overflow = "hidden";
        
        this.subdiv1 = document.createElement("div");
        this.subdiv1.style.display = "flex";
        this.div.appendChild(this.subdiv1);

        this.visabilyDiv = document.createElement("div");
        this.visabilyDiv.style.height = (DESMOS_ELEMENT_HEIGHT - VBM * 2) + "px";
        this.visabilyDiv.style.width = (DESMOS_ELEMENT_HEIGHT - VBM * 2) + "px";
        this.visabilyDiv.style.margin = VBM + "px";
        this.visabilyDiv.style.borderStyle = "solid";
        this.visabilyDiv.addEventListener("click",() => {this.visble = !this.visble; elementChangeAction.invoke(this)})
        this.subdiv1.appendChild(this.visabilyDiv);

        this.inputBox = document.createElement("input");
        this.inputBox.type = "text";
        this.inputBox.style.width = "100%";
        this.inputBox.style.fontSize = "20px";
        this.inputBox.addEventListener("input", () => {
            this.text = this.inputBox.value;
            elementChangeAction.invoke(this);
            this.update();
        })
        this.subdiv1.appendChild(this.inputBox);

        this.errorDiv = document.createElement("div");
        this.errorDiv.style.height = DESMOS_ELEMENT_ERROR_HEIGHT + "px";
        this.errorDiv.style.visibility = "hidden";
        this.errorDiv.style.overflowY = "auto";
        this.div.appendChild(this.errorDiv);

        this.errorText = document.createElement("label");
        this.errorText.style.alignSelf = "center";
        this.errorDiv.appendChild(this.errorText)

        this.text = "";
        this.changeElem(this.classify);
    }

    getDiv(): HTMLDivElement
    {
        return this.div;
    }

    getElem(): T | NullElement
    {
        if (!this.visble)
        {
            const elem = new NullElement();
            elem.ID = this.id;
            return elem;
        }
        return this.elem;
    }

    changeElem(classifyer: DesmomsClassifyerBase<T> | NullCalssifyer)
    {
        this.classify = classifyer;
        this.update()
        if (true || this.elem === undefined || !this.classify.id.equalTo(classifyer.id))
        {
            this.visabilyDiv.innerHTML = "";
            this.visabilyDiv.appendChild(this.elem.getLogo());
        }
    }

    update()
    {
        try
        {
            let text = this.text.substring(this.text.indexOf('=') + 1);
            this.elem = this.classify.transform(text);
            this.elem.ID = this.id;
            this.setErrorText("");
            this.updateElemExtand();    
        }
        catch (e)
        {
            this.setErrorText(e);
            this.elem = new NullElement();
            this.elem.ID = this.id;
        }
    }

    setErrorText(text: string) //visual method that set error text
    {
        if (text.length == 0)
        {
            this.errorDiv.style.visibility = "hidden";
            this.errorDiv.style.height = "0px";
            this.div.style.height = DESMOS_ELEMENT_HEIGHT + "px";
            return;
        }
        this.errorDiv.style.visibility = "visible"
        this.errorDiv.style.height = DESMOS_ELEMENT_ERROR_HEIGHT + "px";
        this.errorDiv.innerHTML = text;
        this.div.style.height = (DESMOS_ELEMENT_HEIGHT + DESMOS_ELEMENT_ERROR_HEIGHT) + "px";
    }

    updateElemExtand()
    {
        if (this.elem === undefined || this.elem.getBoxExtand() === undefined)
        {
            this.div.style.height = DESMOS_ELEMENT_HEIGHT + "px";
            if (this.extandDiv !== undefined) this.div.removeChild(this.extandDiv);
            return;
        }
        this.setErrorText(this.elem.getBoxExtand().innerHTML)
    }
}