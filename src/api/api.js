//API Functions

export const getSolutions = async () => {
    console.log("Getting Solutions...");
    const api_url = "http://localhost:5000/getSolutions"
    let dash_id = 7
    let result
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({dash_id: dash_id})
    }
    try {
        const response = await fetch(api_url, headers)
        result = await response.json()

    } catch (error) {
        result = "Server not responsive"
    }
    console.log("Solutions recieved")
    return result
}

export const getMetaData = async () => {
    console.log("Getting Metadata...");
    const api_url = "http://localhost:5000/getMetaData"
    let dash_id = 7
    let result
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({dash_id: dash_id})
    }
    try {
        const response = await fetch(api_url, headers)
        result = await response.json()
    } catch (error) {
        result = "Server not responsive"
    }
    console.log("Metadata recieved")
    return result
}

export const getFormats = async () => {
    console.log("Getting formats...");
    const api_url = "http://localhost:5000/getFormats"
    let dash_id = 7
    let result
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            dash_id: dash_id,
            "address": [
                "Quarterly!E9",
                "Quarterly!E8",
                "Quarterly!E10",
                "Quarterly!E11",
                "Quarterly!E16",
                "Annual!D83",
                "Annual!E83",
                "Annual!F83",
                "Annual!G83",
                "Annual!H83",
                "Annual!U83",
                "Annual!D84",
                "Annual!E84",
                "Annual!F84",
                "Annual!G84",
                "Annual!H84",
                "Annual!U84",
                "Annual!D85",
                "Annual!D73"
            ]
        })
    }
    try {
        const response = await fetch(api_url, headers)
        result = await response.json()
    } catch (error) {
        result = "Server not responsive"
    }
    console.log("Formats recieved")
    return result
}

export const getVarianceAnalysis = async () => {
    console.log("Getting variance analysis results...");
    const api_url = "http://localhost:5000/getVarianceAnalysis"
    let dash_id = 7
    let result
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            dash_id: dash_id
        })
    }
    try {
        const response = await fetch(api_url, headers)
        result = await response.json()
    } catch (error) {
        result = "Server not responsive"
    }
    console.log("Variance analysis results recieved")
    return result
}