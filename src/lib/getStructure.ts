type DataStructure =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined"
  | "array"
  | "object";

type Structure<T> = T extends Array<infer U>
  ? Structure<U>[]
  : T extends object
  ? { [K in keyof T]: Structure<T[K]> }
  : DataStructure;

export function getStructure<T>(obj: T): Structure<T> {
  const getType = (value: unknown): DataStructure => {
    if (Array.isArray(value)) return "array";
    if (value === null) return "null";
    return typeof value as DataStructure;
  };

  const traverse = (data: unknown): unknown => {
    if (Array.isArray(data)) {
      // Handle empty array case correctly
      return data.length > 0 ? [traverse(data[0])] : [];
    } else if (typeof data === "object" && data !== null) {
      const structure = {} as Record<string, unknown>;
      for (const key in data) {
        structure[key] = traverse((data as Record<string, unknown>)[key]);
      }
      return structure;
    } else {
      return getType(data);
    }
  };

  return traverse(obj) as Structure<T>;
}
