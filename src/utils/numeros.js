import { formatearMiles } from "./formateadores";

export class IdNumber {
    static regex = /^\d*$/;

    static test(value) {
        return this.regex.test(value)
    }
    static show(value){
        return value || ''
    }
}


export class DecimalNumber {
    constructor(maxDecimals) {  
        this.maxDecimals = maxDecimals

        
        if (maxDecimals === 0) this.regex = /^\d*$/;
        else this.regex = new RegExp(`^$|^\\d+(\\.\\d{0,${maxDecimals}})?$`);
        
    }
    test(value) {
        return this.regex.test(value);
    }

    show(value) {
        return formatearMiles(value) || '';
    }
}

