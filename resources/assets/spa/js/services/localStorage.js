export default {
    set(key, value){
        window.localStorage[key] = value;  //window.localStorage.setItem(key, value)
        return window.localStorage[key];   //window.localStorage.getItem(key)
    },
    get(key, defaultValue = null){
        return window.localStorage[key] || defaultValue; // se existir valor no key retorna o key se não retorna o defaultValue
    },
    setObject(key, value){
        window.localStorage[key] = JSON.stringify(value); // trasnforma o valor num json
        return this.getObject(key);
    },
    getObject(key){
        return JSON.parse(window.localStorage[key] || null)
    },
    remove(key){
        window.localStorage.removeItem(key);
    }

}