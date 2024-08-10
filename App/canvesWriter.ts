import { Color } from "../General/Color.js";
import { LINE_WIDTH, LINE_COLOR } from "./settings.js";
import { Transformer2DExpX } from '../Mappers/2D/Transformers/Transformer2DExpX';
import { realFloor, getCharPixels } from "../General/Utils.js";

function    colorToRGB(color: number): number[]
{
   return [(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF];
}

function colorToCssRGB(color: number): string
{
    return `rgb(${color & 0xFF},${(color >> 8) & 0xFF},${(color >> 16) & 0xFF})`
}
    
export class CanvasWriter {
    width: number;
    height: number;
    canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D
    protected pixelData: ImageData


    constructor(canvas: HTMLCanvasElement) {
      this.width = canvas.width;
      this.height = canvas.height;
      this.canvas = canvas;
      console.log(this.width);
      this.context = this.canvas.getContext('2d', { willReadFrequently: true });
      this.pixelData = this.context.getImageData(0, 0, this.width, this.height);
    }

    resize(width: number, height: number)
    {
        this.width = width;
        this.height = height;
        this.context = this.canvas.getContext('2d');
        this.pixelData = this.context.getImageData(0, 0, this.width, this.height);
    }

    setAt(x: number, y: number, color: number) {
      const rgb = colorToRGB(color);
      this.setAtColor(x, y, rgb[0], rgb[1], rgb[2]);
    }

    setAtColor(x: number, y: number, r: number, g: number, b: number)
    {
        let index = (y * this.width + x) << 2;
        this.pixelData.data[index++] = r;
        this.pixelData.data[index++] = g;
        this.pixelData.data[index++] = b;
        this.pixelData.data[index] = 255;
    }

    setRect(x1: number, y1: number, x2: number, y2: number, color: number)
    {
        this.setRectAtColor(x1,y1,x2,y2,color & 0xFF, (color >> 8) & 0xFF, (color >> 16) & 0xFF);
    }

    setRectAtColor(x1: number, y1: number, x2: number, y2: number, r: number, g: number, b: number)
    {
        x1 = Math.max(0,~~x1); y1 = Math.max(0,~~y1); x2 = Math.min(~~x2, this.width); y2 = Math.min(~~y2, this.height);
        r = ~~r; g = ~~g; b = ~~b;
        let globalStart = ((y1 * this.width) + x1) << 2;
        for (let y = y1; y < y2; y++)
        {
            let loc = globalStart;
            for (let x = x1; x < x2; x++)
            {
                this.pixelData.data[loc++] = r;
                this.pixelData.data[loc++] = g;
                this.pixelData.data[loc++] = b;
                this.pixelData.data[loc++] = 255;
            }
            globalStart += (this.width << 2);
        }
    }
  
    getAt(x: number, y: number): number {
      const index = (y * this.width + x) << 2;
      const red = this.pixelData.data[index];
      const green = this.pixelData.data[index + 1];
      const blue = this.pixelData.data[index + 2];
      return (red << 16) | (green << 8) | blue;
    }

    move(mx: number, my: number)
    {
        const copyX = (srcY, destY, mx) =>
        {
            if (mx <= 0) for(let x = 0; x < this.width + mx; x++)  this.setAt(x, destY, this.getAt(x - mx, srcY));
            else  for(let x = this.width ; x > mx; x--) this.setAt(x,destY, this.getAt(x - mx, srcY));
        }

        if (my <= 0) for(let y = 0; y < this.height + my; y++) copyX(y-my,y,mx);
        else for(let y = this.height; y >= my; y--) copyX(y-my,y,mx);
    }

    render(x1: number, y1: number, x2: number, y2: number) {
      this.context.putImageData(this.pixelData, 0, 0, x1, y1, x2 - x1, y2 - y1);
    }

    fullRender()
    {
       this.render(0,0,this.width,this.height);
    }
}

export class CanvasWriterPlus extends CanvasWriter
{   
    context_methods: (() => void)[];
    constructor(canvas: HTMLCanvasElement)
    {
        super(canvas);
        this.context_methods = [];
        this.context.font = "bold 10px Arial"
    }

    drawLine(x1: number, y1: number, x2: number, y2: number, color: number = LINE_COLOR, width: number = LINE_WIDTH)
    {
        if (x1 === x2 && y1 === y2) return;
        const widthHalf = width / 2;
        const rgb = colorToRGB(color);
        const xwise = Math.abs(x1 - x2) >= Math.abs(y1 - y2);
        if (xwise ? (x2 < x1) : (y2 < y1))
        {
            const tempX = x1; const tempY = y1;
            x1 = x2; y1 = y2;
            x2 = tempX; y2 = tempY;
        }

        if (xwise)
        {
            const m = (y2 - y1) / (x2 - x1);
            let y = y1;
            for (let x = x1; x < x2; x++)
            {
                this.setRectAtColor(x,y - widthHalf, x + 1, y + widthHalf, rgb[0], rgb[1], rgb[2]);
                y += m;
            }
            return;
        }
        const m = (x2 - x1) / (y2 - y1);
        let x = x1;
        for (let y = y1; y < y2; y++)
        {
          this.setRectAtColor(x - widthHalf, y, x + widthHalf, y + 1, rgb[0], rgb[1], rgb[2]);
          x += m;
        }
    }

    drawCircle(x: number, y: number, color: number, radius: number = 10)
    {
        if (x + radius < 0 || x - radius >= this.width || y + radius < 0 || y - radius >= this.height) return;
        const r2 = radius * radius;
        let width;
        for (let ay = -radius; ay < radius; ay++)
        {
            width = ~~Math.sqrt(r2 - ay*ay);
            super.setRect(x-width,y+ay,x+width,y+ay+1,color);
        }
    }

    applyAtColor(x: number, y: number, color: number, strength: number)
    {

        const prev = this.getAt(x,y);
        //this.setAtColor(x, y, ~~(strength*(color & 0xFF) + (1-strength)*(prev & 0xFF)), ~~(strength*((color>>8) & 0xFF) + (1-strength)*((prev>>8) & 0xFF)), ~~(strength*((color>>16) & 0xFF) + (1-strength)*((prev>>16) & 0xFF)))
        color = ~~(color & 0xFF)*strength + (255*(1 - strength)) + ((~~((color >> 8) & 0xFF)*strength + (255*(1 - strength))) << 8) + ((~~((color >> 16) & 0xFF)*strength + (255*(1 - strength))) << 16)
        //this.setAtColor(x,y, ((color & 0xFF) + (prev & 0xFF))>>1, (((color >> 8) & 0xFF) + ((prev >> 8) & 0xFF))>>1, (((color >> 16) & 0xFF) + ((prev >> 16) & 0xFF))>>1)
        this.setAtColor(x,y, ~~Math.min((color & 0xFF), prev & 0xFF),~~Math.min(((color>>8) & 0xFF), (prev>>8) & 0xFF),~~Math.min(((color>>16) & 0xFF), (prev>>16) & 0xFF))
    }

    //draw rectange with floating point cordients, if the pixel is partiley colored, draw part of the pixel
    drawFloatRect(x1: number, y1: number, x2: number, y2: number, color: number)
    {

        if (x1 >= this.width || y1 >= this.height || x2 < 0 || y2 < 0 || x1 > x2 || y1 > y2) return;
        const rx1 = Math.floor(x1);
        const ry1 = Math.floor(y1);
        const rx2 = Math.floor(x2);
        const ry2 = Math.floor(y2);
        this.setRect(rx1 + 1, ry1 + 1, rx2, ry2, color); //fill the inner of the line
        const x1s = 1 - Math.abs(x1 % 1);
        const y1s = 1 - Math.abs(y1 % 1);
        const x2s = x2 - rx2;
        const y2s = y2 - ry2;
        
        const limx = Math.min(this.width, rx2);
        const limy = Math.min(this.height, ry2 + 1);

        for (let i = Math.max(0,ry1 + 1); i < limy; i++)
        {
            if(rx1 >= 0) {this.applyAtColor(rx1,i,color, x1s);}
            if (rx2 < this.width) {this.applyAtColor(rx2,i,color, x2s);}
        }

        for (let i = Math.max(0,rx1 + 1); i < limx; i++)
        {
            if(ry1 >= 0) {this.applyAtColor(i,ry1,color, y1s);}
            if (ry2 < this.height){ this.applyAtColor(i,ry2,color, y2s);}
        }

        if (rx1 >= 0 && ry1 >= 0) {this.applyAtColor(rx1, ry1, color, Math.min(x1s, y1s));}
        if (rx1 >= 0 && ry2 < this.height) {this.applyAtColor(rx1, ry2, color, Math.min(x1s,y2s));}
        if (rx2 < this.width && ry1 >= 0) {this.applyAtColor(rx2, ry1, color, Math.min(x2s,y1s));}
        if (rx2 < this.width && ry2 < this.height) {this.applyAtColor(rx2, ry2, color, Math.min(x2s,y2s));}
    }

    writeText(text: string, x :number, y: number, push_x: number=0, push_y: number=0, color: number = 0, space=5)
    {
        let width = space * (text.length - 1);
        let height = 0;
        for (let i = 0; i < text.length; i++)
        {
            const arr = getCharPixels(text[i]);
            height = Math.max(height,arr.length)
            width += arr[0].length;
        }
        const charY = Math.floor(y + height*push_y);
        let charX = Math.floor(x + width*push_x);
        for (let i = 0; i < text.length; i++)
        {
            const arr = getCharPixels(text[i]);
            for (let py = 0; py < arr.length; py++)
            {
                for (let px = 0; px < arr[0].length; px++)
                {
                    if (arr[py][px]) this.setAt(charX + px, charY + py, color);
                }
            }
            charX += arr[0].length + space;
        }
    }

    writeTextOnContext(text: string, x :number, y: number, push_x: number=0, push_y: number=0, background_color: number = undefined)
    {
        const text_size = this.context.measureText(text);
        x += text_size.width * push_x;
        y = (y + text_size.hangingBaseline) + text_size.hangingBaseline * push_y;
        if (background_color == undefined) this.context_methods.push(() => this.context.fillText(text,x,y));
        else
        {
            this.context_methods.push(() => {
                const bg = this.context.fillStyle;
                this.context.fillStyle = colorToCssRGB(background_color);
                this.context.fillRect(x, y - text_size.hangingBaseline, text_size.width, text_size.hangingBaseline);
                this.context.fillStyle = bg;
                this.context.fillText(text,x,y)}
            );
        }
    }

    setTextOnContextColor(color: number)
    {
        this.context_methods.push(() => this.context.fillStyle = `rgb(${color & 0xFF},${(color >> 8) & 0xFF},${(color >> 16) & 0xFF})`)
    }

    render(x1: number, y1: number, x2: number, y2: number) {
        super.render(x1,y1,x2,y2);
        this.context_methods.forEach(method => method());
        this.context_methods = [];
      }
}
