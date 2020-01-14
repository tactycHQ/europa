import DataFormatter from "excel-style-dataformatter";

const dataFormatter = new DataFormatter()

export const convert_format = (fmt, value) => {
    // let temp_format = dataFormatter.format(value, 'Number', fmt).value.replace(' ', ',')
    let temp_format = dataFormatter.format(value, 'Number', fmt).value

    // Fixing SSF formatter
    if (temp_format.substr(-1) === ',') {
        temp_format = temp_format.slice(0, -1)
    }

    //Remove trailing and leading white space
    temp_format = temp_format.trim()

    //Remove any white space in the middle
    temp_format = temp_format.replace(' ',',')

    return temp_format
}

export const getAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

export const getDomains = (xmin, xmax) => {
    const cushion = 1.2

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
    const sums = list.reduce((acc, data) => data[key]+acc,0)
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