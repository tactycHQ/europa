

export const getRefreshOutputsEager = async () => {
        console.log("Getting API...");
        const api_url = "http://localhost:5000/refreshOutputsEager"
        let dash_id = 5
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({dash_id: dash_id})
        }
        let result
        try {
            const response = await fetch(api_url, headers)
            const response_JSON = await response.json()
            result = response_JSON.message
        } catch (error) {
            result = "Server not responsive"
        }
        return result
    }