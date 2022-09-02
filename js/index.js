import {
	$Number,
    $Boolean,
	$Email,
    $Password,
    $FullName,
	aduanaMessages,
	functionValidation,
	classValidation,
} from "./aduana/types.js";
import { User , Phone } from './user/index.js'

// agregamos la validación a los inputs, select, textarea
aduanaMessages();

// como usar aduana en funciones
function getDouble(n = $Number()) {
	return n * 2;
}
// agregamos el observador para validar los parametros al invocarla
getDouble = functionValidation(getDouble);

// Phone no funcionará, requiere importarse en types, para usar usar aduana en clases

let phone = new Phone( 2 , true );

console.log(getDouble(2));
// use custom
document.querySelector('#createUserButton').addEventListener( 'click' , ()=>{
    let email = $Email( document.querySelector('#userEmail').value )
    // el constructor no puede devolver una instancia de Error por lo que
    // vea la clase User como esta conformada 
    let user = new User(
        email
        ,$Password( document.querySelector('#userPassword').value )
        ,$FullName( document.querySelector('#userFullName').value )
    )

    console.log( user )
    // para obtener el valor en formato string usaremos .toString() o String()
    console.log( String( user.email ) )

    setTimeout(()=>{
        // aunque los metodos deben ser creados con "_method" inicial para que sean validados
        // para su invocacion se utiliza sin "_" solo "method"
        user.setEmail($Email('learfen001@gmail.com'))
        console.log( String( user.email ) )
    }, 500 )

    setTimeout(()=>{
        user.email.set('alone@gmail.com')
        console.log( String( user.email ) )
        // cuando usamos superString para crear los modelos al setter valores 
        // son validados por ello este ejemplo responde error
        user.email.set('alone@gmail')
    }, 500 )
})
