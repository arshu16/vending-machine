var myHeaders = new Headers();

myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Accept', 'application/json');


export function getState() {
    return fetch('http://localhost:8080/', {
        method: "GET",
        mode: "cors", 
        headers: myHeaders,
    })
    .then(async response => {
        const result = await response.json();
        return result;
    });
}

export function insertCoin(amount) {
    return fetch('http://localhost:8080/insert', {
        method: "POST",
        mode: "cors", 
        headers: myHeaders,
        body: JSON.stringify({amount}),
    })
    .then(async response => {
        const result = await response.json();
        return result[0].money;
    });
}

export function getItem(id) {
    return fetch('http://localhost:8080/item/get', {
        method: "POST",
        mode: "cors", 
        headers: myHeaders,
        body: JSON.stringify({id})
    })
    .then(async response => {
        const result = await response.json();
        return result[0];
    });
}

export function returnChange() {
    return fetch('http://localhost:8080/return', {
        method: "GET",
        mode: "cors", 
        headers: myHeaders,
    })
    .then(async response => {
        const result = await response.json();
        return result[0].change;
    });
}

export function addChange(amount) {
    return fetch('http://localhost:8080/change/add', {
        method: "POST",
        mode: "cors", 
        headers: myHeaders,
        body: JSON.stringify({amount}),
    })
    .then(async response => {
        const result = await response.json();
        return result[0].change;
    });
}

export function collectChange() {
    return fetch('http://localhost:8080/change/collect', {
        method: "GET",
        mode: "cors", 
        headers: myHeaders
    })
    .then(async response => {
        const result = await response.json();
        return result;
    });
}

export function collectItem() {
    return fetch('http://localhost:8080/item/collect', {
        method: "GET",
        mode: "cors", 
        headers: myHeaders
    })
    .then(async response => {
        const result = await response.json();
        return result;
    });
}