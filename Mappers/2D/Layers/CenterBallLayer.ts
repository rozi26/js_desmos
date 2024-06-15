import { GridLayerBase } from "../GridLayerBase.js";

export class CenterBallLayer extends GridLayerBase
{
    renderAt(px1: number, py1: number, px2: number, py2: number)
    {
        for (let y = py1; y < py2; y++)
        {
            for (let x = px1; x < px2; x++)
            {
                const vx = this.transformer.pixelToLocX(x);
                const vy = this.transformer.pixelToLocY(y);
                if (vx*vx + vy*vy < 0.5) this.writer.setAt(x,y,255<<16);
                else if (vx*vx + vy*vy < 1) this.writer.setAt(x,y,(~~Math.pow(1<<24,vx*vx + vy*vy))-1);
                else if (vx*vx + vy*vy < 2) this.writer.setAt(x,y,255);
            }
        }
    }
}