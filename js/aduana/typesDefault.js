
import { SuperString } from "./superString.js";

class Integer{
    constructor( n ){ this.n = n } 
    toNumber(){ return +this.n }
    toString(){ return +this.n }
}
class Password extends SuperString {
    #string = "";
    constructor(string = "") {
        super({
            onlyContains: "a-zA-Z0-9",
            requireContains: "a-z,A-Z,0-9",
            length: [6, 10],
        });
        this.set(string);
    }
    generate(string) {
        this.#string = this.generate()(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        throw new Error(`Invalid value [${val}]`);
    }
    toString() {
        return this.#string;
    }
}
class Email extends SuperString {
    #string = "";
    constructor(string = "") {
        super({
            pattern:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        });
        this.set(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        throw new Error(`No se pudo setear el valor [${val}]`);
    }
    toString() {
        return this.#string;
    }
}
class Name extends SuperString {
    #string = "";
    constructor(string = "") {
        super({
            onlyContains: "a-zA-Z",
            length: [3, 12],
        });
        this.set(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        throw new Error(`No se pudo setear el valor [${val}]`);
    }
    toString() {
        return this.#string;
    }
}
class Title extends SuperString {
    #string = "";
    constructor(string="") {
        super({
            length: [5, 60],
        });
        this.set(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        this.#string = `No se pudo setear el valor [${val}]`
    }
    toString() {
        return this.#string;
    }
}
class Message extends SuperString {
    #string = "";
    constructor(string = "") {
        super({
            length: [10,254],
        });
        this.set(string);
    }
    set(val) {
        if (this.validation(val)) {
            this.#string = val;
            return true;
        }
        throw new Error(`No se pudo setear el valor [${val}]`);
    }
    toString() {
        return this.#string;
    }
}
function $Integer(n) {
    if(n == undefined) return Integer
    if( typeof n != 'number' || !Number.isInteger(+n) ) 
    if( typeof n != 'boolean' ) {
        console.log({ valueFromError : n })
        return new Error( ' No es un Entero ')
    }
    return Integer( n )
}
function $Boolean( n ){
    if(n == undefined) return Boolean
    if( typeof n != 'boolean' ) {
        console.log({ valueFromError : n })
        return new Error( ' No es un Booleano ')
    }
    return Boolean(n)
}
function $Object( n ){
    if(n == undefined) return Object
    if(typeof n != 'object'){
        console.log({ valueFromError : n })
        return new Error( ' No es un numero ')
    }
    return new Object( n )
}
function $Function( n ){
    if(n == undefined) return Function
    if(typeof n != 'function'){
        console.log({ valueFromError : n })
        return new Error( ' No es un numero ')
    }
    return new Function( n )
}
function $Number( n ){
    if(n == undefined) return Number()
    if( typeof +n != 'number' || isNaN(+n) ){
        console.log({ valueFromError : n })
        return new Error( ' No es un numero ')
    }
    return Number(n)
}
function $String( n ){
    if(n == undefined) return String()
    if( typeof n != 'string' ) return new Error(String(n)+' : No es un texto ')
    return String(n)
}
function $URL( n ) {
    if( n == undefined ) return new URL
    var regexp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if(!regexp.test(value)) return new Error('No es una url valida')
    return new URL(n)
}
function $Eval( className , string ){
	try {
        if(string == undefined) return className
        // if (string == undefined) return new Error("Inspect params  : "+className.name+" : No puede estar vacio " );;
        let instance = new className(string);
		if (String(string) != String(instance))
			throw new Error("Inspect params  : "+String(string) );
		return instance;
	} catch (error) {
		return error;
	}
}
function $Password(string) {
	return $Eval(Password , string)
}
function $Email(string) {
	return $Eval(Email , string)
}
function $Name(string) {
	return $Eval(Name , string)
}
function $Title(string) {
	return $Eval(Title , string)
}
function $Message(string) {
	return $Eval(Message , string)
}

export {
    $Eval
    ,$Password 
    ,$Email 
    ,$Name 
    ,$Title 
    ,$Message 
    ,$Number
    ,$String
    ,$URL
    ,$Integer
    ,$Boolean
    ,$Object
    ,$Function
    ,Password 
    ,Email 
    ,Name 
    ,Title 
    ,Message
}