export function toSentenceCase(value: string): string {
  if (!value) return "";
  const stringWithoutSpecialChars = value
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .replace(/_/g, " ");
  const firstChar = stringWithoutSpecialChars.charAt(0);
  const restOfString = stringWithoutSpecialChars.slice(1);
  return `${firstChar.toUpperCase()}${restOfString.toLowerCase()}`;
}
