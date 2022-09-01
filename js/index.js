import { Names , Phone , getDouble } from './typesCustom.js'

let name = new Names()
// si deseas ver fallar envia algo que no sea un string
name.setValue('a')
/* 
    Puedes ver que parametros y tipos corresponden a al metodo,
    agregando _ al inicio del nombre y colocando el mouse encima
*/ 
name.setValue('dani')

let phone = new Phone();
phone.setValue(2, true);
phone.setValue(2, true);

console.log( getDouble( 2 ) )