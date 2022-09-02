"use strict";

import validation from "./superStringValidation.js";

class SuperString {
	#contains = "";
	#onlyContains = "";
	#requireContains = "";
	#pattern = "";
	#length = [];
	#exist = [];
	constructor(configs) {
		for (let config in configs) {
			this[config](configs[config]);
		}
	}
	contains(contains=String("")) {
		try {
			this.#contains = new RegExp(`[${contains}]`);
		} catch (error) {
			throw new Error(`Invalid contains, setter [${contains}] `);
		}
	}
	requireContains(contains=String("")) {
		if (!contains) throw new Error("Invalid contains, setter null");
		let template = "";
		for (let group of contains.split(",")) {
			template += `(?=.*[${group}])`;
		}
		try {
			this.#requireContains = new RegExp(`^${template + ".*$"}`);
		} catch (error) {
			throw new Error(`Invalid contains, setter [${contains}] `);
		}
	}
	onlyContains(contains=String("")) {
		this.#onlyContains = new RegExp("^[" + contains + "]+$");
	}
	pattern(pattern = RegExp) {
		if (pattern instanceof RegExp) {
			this.#pattern = pattern;
			return 0;
		}
		throw new Error("Pattern, invalid type Regex ");
	}
	exist(list = Array(String)) {
		this.#exist = list;
	}
	length(length) {
		let error = "Length error,";
		let format = `length : [ min : Integer(>0) , max : Integer(<255) ]`;
		if (!Array.isArray(length))
			throw new Error(`${error}. Invalid format ${format}`);
		if (length.length < 2)
			throw new Error(`${error}. Invalid params, ${format}`);

		let [min, max] = length;
		if (!isNaN(+min) && !isNaN(+max) && min < 255 && max < 255 && min > 0) {
			this.#length = length;
			return true;
		}

		throw new Error(
			`${error}. Params invalid '${length.join(",")}' ${format}`
		);
	}
	validation(string) {
		return validation(
			{
				length: this.#length,
				contains: this.#contains,
				onlyContains: this.#onlyContains,
				requireContains: this.#requireContains,
				pattern: this.#pattern,
				exist: this.#exist,
			},
			string
		);
	}
}

export { SuperString, validation };
