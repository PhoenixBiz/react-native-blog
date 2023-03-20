export function parseSrcSet(srcset: string) {
  const sources = srcset.split(",");
  const result = {};

  sources.forEach((source) => {
    const [url, width] = source.trim().split(" ");

    result[width] = url || "";
  });

  return result;
}
