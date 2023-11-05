function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 0) return "";
  const n = strs.length;
  let prefix = strs[0];

  for (let i = 1; i < n; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, prefix.length - 1);
      if (prefix.length === 0) {
        return "";
      }
    }
  }
  console.log(prefix);
  return prefix;
}

const strs = ["flower", "flow", "flight"];

longestCommonPrefix(strs);
export {};
