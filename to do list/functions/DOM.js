/**
 * 
 * @param {string} type 
 * @param {object} attributes 
 * @return {HTMLElement}
 */
export function createElement(type,attributes = {}){
    const element = document.createElement(type)
     for (const [attribute,value] of Object.entries(attributes)){
        if(value !== null ){
            element.setAttribute(attribute,value)
        }

     }
  return element
}