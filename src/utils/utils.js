// import DataFormatter from "excel-style-dataformatter";
// const dataFormatter = new DataFormatter()
import SSF from "ssf/ssf"


export const convert_format = (fmt, value) => {

    if (typeof(fmt) === 'undefined') {
        return SSF.format('General', value).trim()
    }

    //--------DATA FORAMTTER
    // let temp_format = dataFormatter.format(value, 'Number', fmt).value

    // Fixing data formatter
    // if (temp_format.substr(-1) === ',') {
    //     temp_format = temp_format.slice(0, -1)
    // }

    //Remove trailing and leading white space
    // temp_format = temp_format.trim()

    //Remove any white space in the middle
    // temp_format = temp_format.replace(' ',',')
    // return temp_format

    //USING FIXED SSF INSTEAD
    try {
        return SSF.format(fmt, value).trim()
    } catch {
        return SSF.format('General', value).trim()
    }
}

export const fixFormat = (ws) => {
    Object.keys(ws).forEach(function (address) {
        if (ws[address].hasOwnProperty('z') && ws[address].hasOwnProperty('v')) {
            ws[address].w = convert_format(ws[address].z, ws[address].v)
        }
    })
    return ws
}

export const getAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

export const getDomains = (xmin, xmax) => {
    const cushion = 1.1

    if (xmax < 0 && xmax < 0) {
        return [xmin * cushion, 0]
    } else if (xmin < 0 && xmax > 0) {
        return [xmin * cushion, xmax * cushion]
    } else if (xmin > 0 && xmax > 0) {
        return [0, xmax * cushion]
    }
}

export const getAvgfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return getAvg(values)
}

export const getSumfromKey = (list, key) => {
    const sums = list.reduce((acc, data) => data[key] + acc, 0)
    return sums
}


export const getMaxfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return Math.max(...values)
}

export const getMinfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return Math.min(...values)
}

export function between(x, min, max) {
    return x >= min && x <= max;
}

export function myRound(value) {
    const dp = 5
    try {
        return parseFloat(value.toFixed(dp))
    } catch {
        return value
    }

}

export function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export function addAndSort(arr, val) {
    arr.push(val);
    for (let i = arr.length - 1; i > 0 && arr[i] < arr[i - 1]; i--) {
        var tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
    }
    return arr;
}

export const createBounds = (value, lb_ratio, ub_ratio) => {
    let _lb
    let _ub
    if (value < 0) {
        _lb = myRound(ub_ratio * value)
        _ub = myRound(lb_ratio * value)
    } else if (value === 0) {
        _lb = 0
        _ub = 1
    } else {
        _lb = myRound(lb_ratio * value)
        _ub = myRound(ub_ratio * value)
    }
    return [_lb, _ub]
}

export const computeSteps = (value, lb, ub, n_steps) => {
    if (n_steps === 1) {
        return [value]
    }
    const steps = (ub - lb) / (n_steps - 1)
    const index = range(0, n_steps - 1)
    const incr = index.map((i) => {
            return myRound(lb + steps * i)
        }
    )
    if (incr.includes(value)) {
        return incr
    } else {
        return addAndSort(incr, value)
    }
}

export function ascending(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

export function hasNumber(myString) {
    return !isNaN(myString);
}

export function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

export function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


export function omitKeys(obj, keys) {
        var target = {};

        for (var i in obj) {
            if (keys.indexOf(i) >= 0) continue;
            if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;

            target[i] = obj[i];
        }

        return target;
    }

export const arrSum = arr => arr.reduce((a,b) => a + b, 0)

