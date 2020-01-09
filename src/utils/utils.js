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