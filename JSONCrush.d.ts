// Typescript type definition for JSONCrush
declare const JSONCrush: {
  crush(input: string, maxSubstringLength?: number): string,
  uncrush(input: string): string
};
export default JSONCrush;