

function $Number( n ){
    if(n == undefined) return Number()
    if( typeof n != 'number' || isNaN(+n) ) return new Error(String(n)+' : No es un numero ')
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
class Integer{
    constructor( n ){ this.n = n } 
    toNumber(){ return +this.n }
    toString(){ return +this.n }
}
function $Integer(n) {
    if(n == undefined) return Integer
    if( typeof n != 'number' || !Number.isInteger(+n) ) return new Error(String(n)+' : No es un entero ')
    return Integer( n )
}
function $Boolean( n ){
    if(n == undefined) return Boolean
    if( typeof n != 'boolean' ) return new Error( String(n)+' : No es un Booleano ')
    return Boolean(n)
}
function $Object( n ){
    if(n == undefined) return Object
    return new Object( n )
}
function $Function( n ){
    if(tenance == undefined) return Function
    return new Function( n )
}

export {
    $Number
    ,$String
    ,$URL
    ,$Integer
    ,$Boolean
    ,$Object
    ,$Function
}