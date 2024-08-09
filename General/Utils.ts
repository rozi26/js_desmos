
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