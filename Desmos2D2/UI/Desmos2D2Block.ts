import { Action } from "../../General/Action.js";
import { IdentifyNumber } from "../../General/IdentifyNumber.js";
import { MQ } from "../../General/Utils.js";

export class Desmos2D2Block
{
    protected ID: IdentifyNumber;
  
    private HTML_BLOCK: HTMLDivElement;
    private DRAG_AREA: HTMLDivElement;
    private MENU_AREA: HTMLDivElement;
    protected WRITE_AREA: HTMLDivElement;
    protected text_input_element: HTMLSpanElement | HTMLInputElement;
    protected text_input_latex: string;

    protected TEXT_CHANGE_ACTION: Action<IdentifyNumber>;

    constructor(math_input = true)
    {
        this.ID = new IdentifyNumber();
        this.TEXT_CHANGE_ACTION = new Action();

        this.HTML_BLOCK = document.createElement("div");
        this.HTML_BLOCK.classList.add("desmos_block")

        this.DRAG_AREA = document.createElement("div");
        this.DRAG_AREA.classList.add("desmos_block_drag_area")
        this.HTML_BLOCK.appendChild(this.DRAG_AREA);

        this.WRITE_AREA = document.createElement("div");
        this.WRITE_AREA.classList.add("desmos_block_write_area");
        this.HTML_BLOCK.appendChild(this.WRITE_AREA);

        this.MENU_AREA = document.createElement("div");
        this.MENU_AREA.classList.add("desmos_block_menu_area");
        this.HTML_BLOCK.appendChild(this.MENU_AREA);

        if (math_input)
        {
            const change_event: ((text: string) => void) = (text) => this.textChangeEvent(text);
            this.text_input_element = document.createElement("span");
            const mathField = MQ.MathField(this.text_input_element, {
                spaceBehavesLikeTab: true, // configurable
                autoCommands: 'pi theta sqrt sum prod',
                handlers: {
                  edit: () => { // useful event handlers
                    change_event(mathField.latex());
                    //this.text_input_latex = mathField.latex(); // simple API
                    //console.log(mathField.latex())
                  }
                }
              });
        }
        else
        {
            this.text_input_element = document.createElement("input");
            // @ts-ignore
            this.text_input_element.type = "text";
        }
        this.text_input_element.style.margin = "0px";
        this.text_input_element.style.width = "100%";
        this.text_input_element.style.height = "100%";
        this.WRITE_AREA.appendChild(this.text_input_element)
    }

    textChangeEvent(text: string)
    {
        this.text_input_latex = text;
        this.TEXT_CHANGE_ACTION.invoke(this.getId());
        console.log(`text is ${text}`);
    }

    public getHTML(): HTMLDivElement
    {
        return this.HTML_BLOCK;
    }

    public getId(): IdentifyNumber
    {
        return this.ID;
    }

    public getText(): string
    {
        return this.text_input_latex;
    }

    public AddFunctionToTextChangeAction(func: (id: IdentifyNumber) => void)
    {
        this.TEXT_CHANGE_ACTION.addFunc(func);
    }
}