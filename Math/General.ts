

export function round(num : number, digits : number): number
{
    const mul = 10**digits;
    return Math.floor(num * mul) / mul;
}

export function getRandomInt(min: number, max: number): number
{
    return ~~(Math.random() * (max - min) + min)
}