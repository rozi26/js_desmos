function runInLoop(arr: any[] | string, start: number, up: boolean, func: (i: number, v: any) => boolean | number): number {
    const adder = up ? 1 : -1;
    const blocker = up ? ((i: number) => (i < arr.length)) : ((i: number) => (i > -1));
    let i = start;
    while (blocker(i)) {
        const res = func(i, arr[i]);
        if (typeof res === 'number') i = parseInt(res.toString());
        else if (res) return i;
        i += adder;
    }
    return i;
}

function getClosersOverP(text: string, start: number, up: boolean, co: string, cc: string): number {
    let bc = 0;
    return runInLoop(text, start, up, (i, v) => {
        if (v === co) bc++;
        else if (v === cc) bc--;
        return bc === 0;
    });
}

export function isLetter(a: string): boolean {
    const asc = a.charCodeAt(0);
    return asc > 96 && asc < 123;
}

export function isDigit(a: string): boolean {
    const asc = a.charCodeAt(0);
    return asc > 47 && asc < 58;
}

export function getCloserOver(text: string, start: number, up: boolean): number {
    if (text[start] === (up ? '(' : ')')) return getClosersOverP(text, start, up, '(', ')');
    if (text[start] === (up ? '[' : ']')) return getClosersOverP(text, start, up, '[', ']');
    return start;
}

export function getLettersOver(text: string, start: number, up: boolean): number {
    return runInLoop(text, start, up, (i, v) => !isLetter(v));
}

export function findExperEnding(text: string, start: number, up: boolean): number {
    if (start === text.length) return start;
    const firstI = start + (up ? 1 : -1);
    const firstChar = text[firstI];

    if (up) {
        if (isLetter(firstChar)) {
            const te = getLettersOver(text, firstI, true);
            return getCloserOver(text, te, true);
        }
        if (firstChar === '(' || firstChar === '[') return getCloserOver(text, firstI, true) + 1;
    } else {
        if (firstChar === ')' || firstChar === ']') {
            const te = getCloserOver(text, firstI, false);
            return getLettersOver(text, te - 1, false);
        }
        if (isLetter(firstChar)) return getLettersOver(text, firstI, false);
    }

    return runInLoop(text, start, up, (i, v) => {
        if (i === start) return false;
        return !isDigit(v);
    });
}

export function splitByCommas(text: string, start: number): string[] {
    let bc = 0;
    let ps = start;
    const parts: string[] = [];
    let i = start;
    while (i < text.length) {
        if (text[i] === '(') bc++;
        else if (text[i] === ')') bc--;

        if ((bc === 0 && text[i] === ',') || (bc === -1 && text[i] === ')')) {
            parts.push(text.substring(ps, i));
            ps = i + 1;
        }
        i++;
    }
    if (ps !== i) parts.push(text.substring(ps, i));

    return parts;
}


export function getLettersInsideStr(text: string): {text: string, inx: number}[]
{
    let sentances = [];
    let builder = "";
    for (let i = 0; i <= text.length; i++)
    {
        if (i !== text.length && isLetter(text[i]))
        {
            builder += text[i];
            continue;
        }

        if (builder.length != 0)
        {
            sentances.push({text: builder, inx: i - builder.length});
            builder = "";
        }
    }
    return sentances;
}