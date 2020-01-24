// import DataFormatter from "excel-style-dataformatter";
// const dataFormatter = new DataFormatter()
import SSF from "ssf/ssf"


export const convert_format = (fmt, value) => {

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
    return parseFloat(value.toFixed(dp))
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

