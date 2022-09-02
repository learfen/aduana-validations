import * as all from './types.js'

function getArgs(fn){
    fn = fn.toString() 
    let start = fn.split('(')[0].length + 1
    let end = fn.split('{')[0].length - 1
    return fn.slice(start,end)
}

function interfaceParams( interfaces , args , parent){
    let keys = interfaces.map( item => (typeof item == 'string') ? item : item.name )
    let data = {}
    for(let i in args){
        data[keys[i]] = args[i]
    }
    let params = "let {"+keys.map(item => item.split('=')[0]).join(',')+"} = data ;"
    let result = false
    for(let r of interfaces){
        result = false
        if( typeof r == 'object' ) {
            eval( params+r.fn )
            if( result instanceof Error ) {
                return result
            }
        }
    }
    return result
}

function getMethods(toCheck) {
    const props = Object.getOwnPropertyNames(toCheck.prototype);
    let obj = toCheck;
    let ignore = ['hasOwnProperty', 'constructor',     
    'isPrototypeOf',       
    'propertyIsEnumerable',
    'toLocaleString',      
    'toString','valueOf']
    try {
        
        return props.sort().filter((e, i, arr) => { 
            if (e!=arr[i+1] && e.search('__') != 0 && ignore.indexOf(e) == -1 ) return true;
        }).map( item => item.split('=')[0]);
    } catch (error) {
        return []
    }
}

Object.prototype.assignInterface = function ( fn, parent ){
    let fnName = String( fn ).split('(')[0].split(' ').join('').replace('function','')
    let interfaces = {}
    let args = getArgs(fn).split(',')
    fn.interface = args.map( item => {
        // y = Code(1)
        if(item.split('=').length == 1) return item 
        item = item.split('(')[0]
        let interfaceFind = false;
        let classFind = false;
        let varName =  item.split('=')[0].trim()
        let className = item.split(' ').join('').split('=')[1].replace(')','').replace('(','')
        let interfaceName = className.replace(')','').replace('(','')
        eval( `
            try{
                interfaceFind = all['${interfaceName}'] ?? ${interfaceName}; 
                classFind = all['${interfaceName.replace('$','')}'] ?? ${interfaceName.replace('$','')}
            }catch( error ){
                console.log(error)
            }
            `)

        let typeClass 
        eval(`typeClass = typeof all.${className}()`)
        if(typeClass != 'function'){
            let types = {string:'$String' ,boolean:'$Boolean' , number:'$Number', object:'$Object', function:'$Function'}
            className= typeof classFind == 'function' ? className : types[typeClass]
            eval(`classFind = all['${interfaceName.replace('$','')}']`)
            typeClass='function'
        }
        if( !classFind || !interfaceName ) return item
        return { name:varName , fn:( `
            let typeValue = null;
            typeValue = typeof ${varName}
            let primitives = ['string', 'number','boolean']
            try{
                if(typeValue == 'function') typeValue = typeof typeValue()
            }catch( error ){
                console.log('error in function', error)
            }
            try{
                result = ${varName}
                if(primitives.indexOf(typeValue) > -1){
                    let inputParse = all.${className}(${varName})
                    if( inputParse instanceof Error ) {
                        result = new Error('Type from function param: ${varName} expect ${className} '+inputParse.message)
                    }else{
                        if (typeof inputParse != typeValue ) result = new Error('Type from function param: ${varName} expect ${className} ')
                    }
                }else{
                    if( ${varName} instanceof Error ) {
                        result = new Error('Instance from function param: ${varName} expect ${className} : ' + ${varName}.message)
                    }else{
                        if (!${varName} instanceof all.${className + '()' } ) result = new Error('Instance from function param: ${varName} expect ${className} ')
                    }
                }
            }catch( error){
                result = new Error('Instance from function param: ${varName} expect ${className} '+error.message)
            }
        ` ) }
    })
    return function( ...args ){
            let evalInterface = interfaceParams( fn.interface , [...args])
            if( evalInterface instanceof Error)
                throw evalInterface
            else {
                let paramsString = String(fn).split('){')[0]
                paramsString = paramsString.replace( paramsString.split('(')[0] + '(' , '' )
                let result 
                eval(` result = this[fnName]( ...arguments )`)
                return result
            }
        }
}

function classValidation( names ){
    if( typeof names == 'function'){}
    let response = {}
    for(let classObject in names ){
        try {
            window[classObject] = names[classObject]
        } catch (error) {
            
        }
        eval(`
        getMethods( names.${classObject} ).forEach( item => {
            names.${classObject}.prototype[item.replace('_','')] = names.${classObject}.assignInterface( names.${classObject}.prototype[item] )
        })
        `)
    }
}


function functionValidation( fn=function(){}){let fnName = String( fn ).split('(')[0].split(' ').join('').replace('function','')
let interfaces = {}
let args = getArgs(fn).split(',')
fn.interface = args.map( item => {
    // y = Code(1)
    if(item.split('=').length == 1) return item 
    item = item.split('(')[0]
    let interfaceFind = false;
    let classFind = false;
    let varName =  item.split('=')[0].trim()
    let className = item.split(' ').join('').split('=')[1].replace(')','').replace('(','')
    let interfaceName = className.replace(')','').replace('(','')
    eval( `
        try{
            interfaceFind = all['${interfaceName}']; 
            classFind = all['${interfaceName.replace('$','')}']
        }catch( error ){}
        `)

    let typeClass 
    eval(`typeClass = typeof all.${className}()`)
    if(typeClass != 'function'){
        let types = {string:'$String' ,boolean:'$Boolean' , number:'$Number', object:'$Object', function:'$Function'}
        className= typeof classFind == 'function' ? className : types[typeClass]
        eval(`classFind = all['${interfaceName.replace('$','')}']`)
        typeClass='function'
    }
    if( !classFind || !interfaceName ) return item
    return { name:varName , fn:( `
        let typeValue = null;
        typeValue = typeof ${varName}
        let primitives = ['string', 'number','boolean']
        try{
            if(typeValue == 'function') typeValue = typeof typeValue()
        }catch( error ){
            console.log('error in function', error)
        }
        try{
            result = ${varName}
            if(primitives.indexOf(typeValue) > -1){
                let inputParse = ${className}(${varName})
                if( inputParse instanceof Error ) {
                    result = new Error('Type from function param: ${varName} expect ${className} '+inputParse.message)
                }else{
                    if (typeof inputParse != typeValue ) result = new Error('Type from function param: ${varName} expect ${className} ')
                }
            }else{
                if( ${varName} instanceof Error ) {
                    result = new Error('Instance from function param: ${varName} expect ${className} : ' + ${varName}.message)
                }else{
                    if (!${varName} instanceof ${className + '()' } ) result = new Error('Instance from function param: ${varName} expect ${className} ')
                }
            }
        }catch( error){
            result = new Error('Instance from function param: ${varName} expect ${className} '+error.message)
        }
    ` ) }
})
    let r = {
        [fnName]( ...args ) {
            let evalInterface = interfaceParams( fn.interface , [...args] )
            if( evalInterface instanceof Error)
                throw evalInterface
            else return fn(...args)
        }
    }
    return r[fnName]
}

export { classValidation , functionValidation }