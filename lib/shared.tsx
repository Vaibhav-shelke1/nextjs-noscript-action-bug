// Bug 4: this module is loaded by /bug-4-stale-export.
// While `next dev` is running, add a new export below (see README) and use it from a new page.
export const STYLE_A: Record<string, string> = { new: "red", old: "blue" };
