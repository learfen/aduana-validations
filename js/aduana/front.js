import * as typesList from './types.js'

function aduanaMessages (){
    let style = document.createElement('style')
    style.innerHTML='.alertCustom{box-sizing:border-box;z-index:1000;position:fixed;left:0;top:0;width:100%;background:orange;color:white;padding:1rem}[isvalid=valid]{ border:5px green solid } [isvalid=invalid]{ border:5px red solid }'
    document.body.appendChild(style)
    function alertCustom( error , id=Date.now()){
        let miAlert = document.createElement('div')
        miAlert.className ='alertCustom alert-'+ id 
        document.querySelector('body').prepend( miAlert )
        miAlert.innerHTML = error
        return id
    }

    HTMLElement.prototype.validate = function(){
        if(this.attributes.validation){
            console.clear()
            let result 
            eval(`result = typesList.${this.getAttribute('validation')}( this.value )`)
            if(result instanceof Error) {
                console.log('Error in nodo' , this, this.value)
                if(this.getAttribute('validation'))
                    result['alertId'] = alertCustom(result.message , this.id)
                this.setAttribute('isvalid','invalid')
                return result
            }
            for(let alert of document.querySelectorAll('.alert-'+this.id)){
                alert.remove()
            }
            this.setAttribute('isvalid','valid')
            return true
        }
    }
    const observer = new MutationObserver( mutationList => {
        Array.from(mutationList[0].addedNodes).map( item => {
            if(item.localName == 'input' && item.getAttribute('validation') != undefined && item.getAttribute('validationListen') == undefined){
                item.setAttribute('validationListen',true)
                item.addEventListener('input' , event => event.target.validate() )
            }
        } )
    })
    observer.observe(document.querySelector('body'),{ subtree:true , childList:true })
    for(let item of document.querySelectorAll('[validation]')){
        item.setAttribute('validationListen',true)
        item.addEventListener('input' , event =>{
            console.log( event.target.validate() )
        })
    }
}

export { aduanaMessages }