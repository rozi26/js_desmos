import { Desmos2D2Block } from "./Desmos2D2Block.js";


export class Desmos2D2SideMenu
{
    protected SIDE_DIV: HTMLDivElement;
    protected BLOCKS: Desmos2D2Block[];

    constructor(side_div: HTMLDivElement)
    {
        this.SIDE_DIV = side_div;
        this.BLOCKS = [];
        this.createNewBlock();
    }

    private createNewBlock()
    {
        const block = new Desmos2D2Block();
        this.BLOCKS.push(block);
        this.SIDE_DIV.appendChild(block.getHTML());
    }
}