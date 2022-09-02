"use strict";

import {
    $Name
} from '../aduana/typesDefault.js'

// use super string

class FullName{
    constructor( n ){ this.n = n } 
    toString(){ return +this.n }
}
function $FullName(n) {
    if(n == undefined) return FullName
    let fullName = n.split(' ')
    for(let name of fullName ){
        name = $Name(name)
        if( name instanceof Error){
            return name
        }
    }
    return new FullName( n )
}

export { $FullName , FullName }