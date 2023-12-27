export async function fetchJSON(url,options= {}){
   const headers = {Accept:'applications/json',...options.headers}
    const r = await fetch(url,{...options,headers})
    if (r.ok){
        return r.json()
    }
    throw new Error('Erreur serveur',{cause: r})
}