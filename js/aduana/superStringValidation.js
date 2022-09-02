"use strict";

export default (
	{ length, contains, onlyContains, requireContains, pattern, exist },
	string
) => {
	if (length.length == 2) {
		if (string.length < length[0])
			throw new Error(` Min length ${String(length[0])}`);
		if (string.length > length[1])
			throw new Error(` Max length ${String(length[1])}`);
	}
	if (contains instanceof RegExp) {
		if (!contains.test(string))
			throw new Error(
				` Invalid string, ref. patron ${String(contains)} [${string}]`
			);
	}
	if (onlyContains instanceof RegExp) {
		if (!onlyContains.test(string))
			throw new Error(
				` Invalid string, ref. patron ${String(
					onlyContains
				)} [${string}]`
			);
	}
	if (requireContains instanceof RegExp) {
		if (!requireContains.test(string))
			throw new Error(
				` Invalid string, ref. patron ${String(
					requireContains
				)} [${string}]`
			);
	}
	if (pattern instanceof RegExp) {
		if (!pattern.test(string))
			throw new Error(
				` Invalid string, ref. patron ${String(pattern)} [${string}]`
			);
	}
	if (exist.length) {
		if ( exist.indexOf(string) == -1)
			throw new Error(
				` Not exist [${string}] in [${String(exist.join(","))}] `
			);
	}
	return true;
};
