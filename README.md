   Document

Aduana. Librería de validaciones
================================

Funcional tanto para backend como para frontend, esta pequeña biblioteca se enfoca en validar los parámetros que se pasan a un método o función y responder un type Error si no corresponde

Si entendemos una función como un algoritmo, todo algoritmo, tienen un inicio, proceso y un final, por lo que con validar solo el inicio, es decir, los parámetros que recibe una función es suficiente para cubrir cualquier procedimiento antes de que falle de manera imprevista

* * *

Sobre tipos
-----------

Se sirven algunos tipos por defecto, pero puede crear tantos como requiera

*   **Paso 1: Crear tipos**
    
    Cree una funcion donde realizará las validaciones correspondientes, en caso de superar todas las validaciones retornarán una nueva instancia siendo la clase con el mismo nombre de la función sin "$"
    
    Importante: la función debe contar con una condición como primer instrucción que retorne en caso de no recibir parámetros la clase que usará para generar una instancia
    
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
                        
    
*   **Paso 2: Importar**
    
    Deberá agregar las funciones que seran validadadas al archivo /aduana/index.js
    
        import { Names , Phone } from '../custom.js'
                        
    
*   **Paso 3: Uso**
    
    Asignaremos la escucha a funciones y clases, esto debe realizarse solo 1 vez Importante, los nombres de los métodos de las clases que queramos validar deben iniciar con "\_", solo aplica para la declaración, para su invocación se utilizará sin \_
    
        import { classValidation , functionValidation } from './aduana/index.js'
        
        // creando una función que deseamos que valide sus parámetros, pero crearla de esta forma pierde el listener de vscode es mejor crearla y luego reasignarla
        const getDouble = functionValidation( function (n=$Number()){
            return n \* 2
        } )
        
        // asignando a una función ya existente
        function getNext(n=$Number()){
            return n + 1
        }
        getNext = functionValidation(getNext)
        
        // para las clases solo debemos colocar el nombre de las mismas en la funcion
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
        
        classValidation( 'Phone','Names' )
    
        export { Names , Phone , getDouble }
