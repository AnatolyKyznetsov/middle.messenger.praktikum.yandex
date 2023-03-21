type Indexed<T = any> = {
    [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const key in rhs) {
        try {
            if (rhs[key].constructor === Object) {
                rhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
            } else {
                lhs[key] = rhs[key];
            }
        } catch {
            lhs[key] = rhs[key];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}

export function localDate(date: string): string {
    return new Date(date).toLocaleString()
}
