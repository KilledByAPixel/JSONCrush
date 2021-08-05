// Typescript type definition for JSONCrush
export type JSONCrush = {
  crush(input: string, maxSubstringLength?: number): string;
  uncrush(input: string): string;
};