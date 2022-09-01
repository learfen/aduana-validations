import { classValidation , functionValidation } from './aduana/index.js'

class Names {
    constructor() {
        this.val = ['dueño=dani'];
    }
    _setValue(val=$String()){
        this.val.push( val )
    }
}

class Phone {
    constructor() {
        this.val = 0;
        this.cel = null
    }
    _setValue(val=$Number() , cel=$Boolean()){
        this.val = val;
        this.cel = cel
    }
}


function getDouble(n=$Number()){
    return n * 2
}
getDouble = functionValidation( getDouble )


classValidation( 'Phone','Names' )
export { Names , Phone , getDouble }
