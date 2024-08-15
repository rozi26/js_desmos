
export function realFloor(num: number): number
{
    if (num >= 0) return ~~num;
    let res = ~~num;
    return (res == num) ? res : (res - 1);
}

export function realModulo(a: number, b: number)
{
    return Math.abs(a % b);
}

export function getCharPixels(char: string): number[][]
{
    if (char === '0') {return [[0,0,0,0,0],[0,0,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];} 
    else if (char === '1') {return [[0,0,0,0,0],[0,0,0,1,0],[0,0,1,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0],[0,0,0,1,0]];} 
    else if (char === '2') {return [[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,1,1,1]];} 
    else if (char === '3') {return [[0,0,0,0,0],[0,1,1,1,1],[0,0,0,1,0],[0,0,0,1,1],[0,0,0,0,1],[0,1,0,0,1],[0,1,1,1,1]];} 
    else if (char === '4') {return [[0,0,0,0,0,0],[0,0,0,1,0,0],[0,0,0,1,0,0],[0,0,1,1,0,0],[0,1,1,1,1,1],[0,0,0,1,0,0],[0,0,0,1,0,0]];} 
    else if (char === '5') {return [[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,0],[0,1,1,1,1],[0,0,0,0,1],[0,1,0,0,1],[0,1,1,1,1]];} 
    else if (char === '6') {return [[0,0,0,0,0],[0,0,1,1,1],[0,1,0,0,1],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];} 
    else if (char === '7') {return [[0,0,0,0,0],[0,1,1,1,1],[0,0,0,0,1],[0,0,0,1,0],[0,0,0,1,0],[0,0,1,0,0],[0,0,1,0,0]];} 
    else if (char === '8') {return [[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,1,1,1]];} 
    else if (char === '9') {return [[0,0,0,0,0],[0,0,1,1,0],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1],[0,1,0,0,1],[0,1,1,1,0]];} 
    else if (char === '(') {return [[0,0,1,1,0,0],[0,0,1,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0]];} 
    else if (char === ')') {return [[0,1,0,0,0,0],[0,0,1,0,0,0],[0,0,1,0,0,0],[0,0,1,1,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0],[0,0,1,0,0,0]];} 
    else if (char === '.') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,0,0]];} 
    else if (char === '-') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0]];} 
    else if (char === '+') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[1,1,1,1,1],[0,0,1,0,0],[0,0,1,0,0]];} 
    else if (char === '/') {return [[0,0,0,0,0,1],[0,0,0,0,1,0],[0,0,0,0,1,0],[0,0,0,1,0,0],[0,0,0,1,0,0],[0,0,1,0,0,0],[0,1,0,0,0,0]];}
    else if (char === ',') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,0,0]];}
    else if (char === ' ') {return [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]];}
    else if (char === 'a') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];}
    else if (char === 'b') {return [[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,1,1,0]];}
    else if (char === 'c') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,0],[0,1,0,0,1],[0,0,1,1,0]];}
    else if (char === 'd') {return [[0,0,0,0,0],[0,0,0,0,1],[0,0,0,0,1],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];} 
    else if (char === 'e') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,1,1,1],[0,1,0,0,1],[0,0,1,1,0]];}
    else if (char === 'f') {return [[0,0,0,0,0,0],[0,0,1,1,0,0],[0,1,0,0,0,0],[0,1,1,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0]];}
    else if (char === 'g') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];}
    else if (char === 'h') {return [[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1]];}
    else if (char === 'i') {return [[0,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0]];}
    else if (char === 'j') {return [[0,0,0,0,0],[0,1,1,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0],[0,0,1,0,0]];}
    else if (char === 'k') {return [[0,0,0,0,0],[0,1,0,0,0],[0,1,0,0,0],[0,1,0,0,1],[0,1,1,1,0],[0,1,1,1,0],[0,1,0,0,1]];}
    else if (char === 'l') {return [[0,0,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0]];}
    else if (char === 'm') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,0,0,1,0],[1,0,0,1,0],[1,0,0,1,0]];}
    else if (char === 'n') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1]];}
    else if (char === 'o') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,0]];} 
    else if (char === 'p') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,1,1,0]];}
    else if (char === 'q') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,0,0,1],[0,1,0,0,1],[0,0,1,1,1]];}
    else if (char === 'r') {return [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,1,1,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0]];}
    else if (char === 's') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,1,1,1,0],[0,1,0,1,1],[0,1,1,1,0]];}
    else if (char === 't') {return [[0,0,0,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,1,1,0,0,0],[0,1,0,0,0,0],[0,1,0,0,0,0],[0,0,1,1,0,0]];}
    else if (char === 'u') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,0,1],[0,1,0,0,1],[0,1,1,1,1]];}
    else if (char === 'v') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]];}
    else if (char === 'w') {return [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,1,0,1,0,1],[0,1,1,1,1,0],[0,1,1,1,1,0],[0,0,1,0,1,0]];}
    else if (char === 'x') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,1],[0,0,1,1,0],[0,0,1,0,0],[0,1,0,1,1]];}
    else if (char === 'y') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,0,0,1],[0,1,0,1,0],[0,1,0,1,0],[0,0,1,0,0]];}
    else if (char === 'z') {return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,1,1,1,1],[0,0,0,1,0],[0,0,1,0,0],[0,1,1,1,1]];}
}

// @ts-ignore
export const MQ = MathQuill.getInterface(2);