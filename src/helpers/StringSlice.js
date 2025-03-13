export default function StringSlice(text, textLength = 12) {
  return text.length > textLength
    ? text.slice(0, textLength - 1) + "..."
    : text;
}
