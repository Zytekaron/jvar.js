declare module 'jvar' {
	export const version: '1.5.1';
	export const identity: (value: any) => any;
	export const nil: () => null;
	export const noop: () => null;
	export const fn: {
		conform: (num: number, imin: number, imax: number, omin: number, omax: number) => number;
		constrain: (num: number, min: number, max: number) => number;
		fuzzy: (needle: string, haystack: string) => boolean;
		format: (string: string, ...args: any) => string;
		group: (arr: any[], size: number, obj: boolean) => any[] | { ignored: any[], grouped: any[] }
		inspect: (obj: object) => string;
		isEmpty: (iterable: Iterable<any>) => boolean;
		isIterable: (object: object) => boolean;
		percent: (arr: any[], int: boolean, key: string, value: string) => Array<number>;
		regexEscape: (str: string) => string;
		sameType: (...objects: any[]) => boolean;
		type: (obj: any) => string;
	};
	export const math: {
		collsions: (size: number, probability: number) => number;
		factorial: (num: number) => number;
		fibonacci: (num: number) => number;
		random: (min?: number, max?: number) => number;
		randomInt: (min?: number, max?: number) => number;
		root: (num: number, root: number) => number;
		secureRandom: (min?: number, max?: number) => number;
		secureRandomInt: (min?: number, max?: number) => number;
	};

	export class BitSet {
		constructor(bits?: number)
		private readonly _bits: number;
		public test(other: BitSet | number): boolean;
		public and(other: BitSet | number): BitSet;
		public or(other: BitSet | number): BitSet;
		public xor(other: BitSet | number): BitSet;
		public not(): number;
		public set(position: number): BitSet;
		public setMany(start?: number, count?: number): BitSet;
		public clear(position: number): BitSet;
		public clearMany(start?: number, number?: number): BitSet;
		public clearAll(): BitSet;
		public toggle(position: number): BitSet;
		public toggleMany(start?: number, count?: number): BitSet;
		public clone(): BitSet;
		public get bits(): number;
		public get number(): number;
		public get string(): string;
		public set bits(number: number);
	}

	export class Cherry<V> extends Object {
		constructor(iterable?: Iterable<V> | object);
		public each(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): Cherry<V>;
		public apply(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): Cherry<V>;
		public map(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): Array<V>;
		public get(path: string): V | undefined;
		public set(path: string, value: V): Cherry<V>;
		public delete(path: string): V;
		public pushIn(path: string, value: V): Array<V>;
		public addIn(path: string, value: V): Set<V>;
		public setIn(path: string, key: any, value: any): Map<string, V>;
		public has(path: string): boolean;
		public find(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): null | V;
		public filter(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): Cherry<V>;
		public sweep(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): Cherry<V>;
		public every(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): boolean;
		public some(fn: (value: V, key: string, Cherry: Cherry<V>) => any, thisArg?: object): boolean;
		public ensure(path: string, value: V): Cherry<V>;
		public toMap(): Map<string, V>;
		public array(): Array<V>;
		public toSet(): Set<V>;
		public entryArray(): Array<V>;
		public entrySet(): Set<V>;
		public keyArray(): Array<V>;
		public keySet(): Set<V>;
		public valueArray(): Array<V>;
		public valueSet(): Set<V>;
		public first(count?: number, keepArray?: boolean): [string, V];
		public firstKey(count?: number, keepArray?: boolean): string | Array<string>;
		public firstValue(count?: number, keepArray?: boolean): string | Array<string>;
		public last(count?: number, keepArray?: boolean):  [string, V];
		public lastKey(count?: number, keepArray?: boolean): string | Array<string>;
		public lastValue(count?: number, keepArray?: boolean): string | Array<string>;
		public random(count?: number, keepArray?: boolean): [string, V];
		public randomKey(count?: number, keepArray?: boolean): string | Array<string>;
		public randomValue(count?: number, keepArray?: boolean): string | Array<string>;
		public math(path: string, operation: string, operand: number): number;
		public inc(path: string): number;
		public dec(path: string): number;
		public add(path: string, operand: number): number;
		public sub(path: string, operand: number): number;
		public mul(path: string, operand: number): number;
		public div(path: string, operand: number): number;
		public mod(path: string, operand: number): number;
		public pow(path: string, operand: number): number;
	}

	export class Enum<T extends {}> {
		public constructor(iterable: T, fn?: () => any);
		public get<K extends keyof T>(identifier: K): T[K];
		public get(identifier: PropertyKey): undefined;
		public has(identifier: keyof T): true;
		public has(identifier: PropertyKey): false;
		public list(delimiter?: null): (keyof T)[];
		public list(delimiter: string): string;
		public get size(): number;
	}	  

	export class OneTimePad {
		constructor(characters: string, includeSpace: boolean);
		public characters: string;
		public encode(message: string, key: string | null): string | object;
		public decode(message: string, key: string | null): string | object;
		public generateKey(length?: number): string;
		private _checkIndex(letterIndex: number, keyIndex: number, index: number): number;
		private _rollover(index: number): number;
		public static get DEFAULT_CHARACTERS(): string;
	}

	export class Randomizer {
		constructor(secure?: boolean);
		public secure: boolean;
		public weights: Array<any>;
		public results: Array<any>;
		public add(weight: number, result?: number): Randomizer;
		public addArray(arrays: Array<[number, any]>): Randomizer;
		public addObject(objects: Array<object>): Randomizer;
		public prepare(): Readonly<Randomizer>;
		public sample(count?: number): any;
	}

	export class Lex {
		constructor(flags?: object, aliasFlags?: object);
		public lex: (str: string) => { args: string[], flags: object };
	}
}
