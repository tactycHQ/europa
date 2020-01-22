//API Functions
const dash_id=9

export const getSolutions = async () => {
    console.log("Getting Solutions...");
    const api_url = "http://localhost:5000/getSolutions"

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
    let result
    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            dash_id: dash_id,
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
    let dash_id = 9
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