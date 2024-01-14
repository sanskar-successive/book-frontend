export const transformFormData = (obj) => {
    const result = {};

    for (const key in obj) {
        const keys = key.split(".");
        let currentObj = result;

        for (let i = 0; i < keys.length - 1; i++) {
            currentObj[keys[i]] = currentObj[keys[i]] || {};
            currentObj = currentObj[keys[i]];
        }

        currentObj[keys[keys.length - 1]] = obj[key];
    }

    return result;
}
