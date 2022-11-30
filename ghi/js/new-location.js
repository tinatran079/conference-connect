window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/states/'

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("there has been an error")
        } else {
            const data = await response.json();
            const selectTag = document.getElementById('state');
            console.log(data.states)

            for (let state of data.states) {
                let option = document.createElement('option');
                option.value = Object.values(state);
                option.innerHTML = Object.keys(state);
                selectTag.appendChild(option);
            }

            const formTag = document.getElementById('create-location-form');
            formTag.addEventListener('submit', async event => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const json = JSON.stringify(Object.fromEntries(formData));
                const locationUrl = 'http://localhost:8000/api/locations/';
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const response = await fetch(locationUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newLocation = await response.json()
                }
            });
        }
    } catch (e) {
        console.error("There has been an error")
    }
});
