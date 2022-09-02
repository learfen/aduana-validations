import { $Email , $Password , $FullName , classValidation} from '../aduana/types.js'
/**
 * los metodos a evaluar requiere iniciar el nombre con _
 */
class User {
    constructor(email, password, fullName) {
        this.setEmail(email)
        this.setPassword(password)
        this.setFullName(fullName)
    }
    _setEmail(val=$Email()){
        this.email = val
    }
    _setPassword(val=$Password()){
        this.password = val
    }
    _setFullName(val=$FullName()){
        this.fullName = val
    }
}


class Phone {
	constructor( val , cel ) {
		this.setValue( val , cel )
	}
	_setValue(val=$Number(), cel=$Boolean()) {
        console.log( { val , cel })
		this.val = val;
		this.cel = cel;
	}
}


// asignamos el listener
classValidation({ User , Phone })

export { User , Phone }