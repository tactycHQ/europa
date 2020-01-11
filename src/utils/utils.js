import DataFormatter from "excel-style-dataformatter";

const dataFormatter = new DataFormatter()

export const convert_format = (fmt, value) => {
    let temp_format = dataFormatter.format(value, 'Number', fmt).value.replace(' ', ',')
    if (temp_format.substr(-1) === ',') {
        return temp_format.slice(0, -1)
    } else {
        return temp_format
    }
}

export const getAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length

export const getDomains = (xmin, xmax) => {
    if (xmax < 0 && xmax < 0) {
        return [xmin * 1.5, 0]
    } else if (xmin < 0 && xmax > 0) {
        return [xmin * 1.5, xmax * 1.5]
    } else if (xmin > 0 && xmax > 0) {
        return [0, xmax * 1.5]
    }
}

export const getAvgfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return getAvg(values)
}

export const getMaxfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return Math.max(...values)
}

export const getMinfromKey = (list, key) => {
    const values = list.map(data => data[key])
    return Math.min(...values)
}