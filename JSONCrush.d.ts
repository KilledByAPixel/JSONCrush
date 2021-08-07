// Typescript type definition for JSONCrush
type JSONCrush = {
  crush(input: string, maxSubstringLength?: number): string,
  uncrush(input: string): string
};
export default JSONCrush;