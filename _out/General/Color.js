export class Color {
    constructor(r, g, b, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    getAsSingleValue() {
        return (this.r << 16) + (this.g << 8) + (this.b);
    }
}
export function HSVToColor(h, s, v) {
    const M = v * s;
    const m = M * (1 - Math.abs((h) % 2 - 1));
    const z = v - M;
    let r, g, b;
    switch (Math.floor(h)) {
        case 0:
            r = M;
            g = m;
            b = 0;
            break;
        case 1:
            r = m;
            g = M;
            b = 0;
            break;
        case 2:
            r = 0;
            g = M;
            b = m;
            break;
        case 3:
            r = 0;
            g = m;
            b = M;
            break;
        case 4:
            r = m;
            g = 0;
            b = M;
            break;
        default:
            r = M;
            g = 0;
            b = m;
            break;
    }
    return new Color((r + z) * 255, (g + z) * 255, (b + z) * 255);
}
//# sourceMappingURL=Color.js.map