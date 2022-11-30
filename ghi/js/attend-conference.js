window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();

      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }
      // add the 'd-none' class to the loading icon
      const loadTag = document.getElementById('loading-conference-spinner');
      // Here, add the 'd-none' class to the loading icon
      loadTag.classList.add('d-none')
      // Here, remove the 'd-none' class from the select tag
      selectTag.classList.remove('d-none')

      const formTag = document.getElementById('create-attendee-form');
      formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const attendeeUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "POST",
            body: json,
            headers: {
            'Content-Type': 'application/json',
            },
        };
        const response = await fetch(attendeeUrl, fetchConfig);
        if (response.ok) {
            formTag.reset();
            const newConference = await response.json();
            const successTag = document.getElementById('success-message');
            successTag.classList.remove('d-none');
            formTag.classList.add('d-none');
        };
    })
    }
  });
