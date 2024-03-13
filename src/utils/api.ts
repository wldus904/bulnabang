export const FETCH = async ({ ENDPOINT, METHOD, HEADERS, data }) => {
    const response = await fetch(ENDPOINT, {
        method: METHOD,
        // headers: { "Content-Type": HEADERS ?? "application/json" }, // 'multipart/form-data'
        body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    if (response.status !== 200) throw { message: jsonData.message };
    else return jsonData;
};
