import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ConferenceColumn(props) {
  const [selectedConference, setSelectedConference] = useState(undefined);

  function openModal(conference) {
    setSelectedConference(conference);
  }

  return (
    <div className="col">
      {props.list.map(data => {
        const conference = data.conference;
        const weather = data.weather;
        return (
          <div key={conference.href} className="card mb-3 shadow">
            <img src={conference.location.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{conference.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {conference.location.name}
              </h6>
              <p className="card-text">
                {conference.description}
              </p>
              <button className="btn btn-primary" onClick={() => openModal(conference)}>View details</button>
            </div>
            <div className="card-footer">
              {new Date(conference.starts).toLocaleDateString()}
              -
              {new Date(conference.ends).toLocaleDateString()}
            </div>
            {selectedConference && <ConferenceModal conference={selectedConference} weather={weather} setIsOpen={setSelectedConference} />}
          </div>
        );
      })}
    </div>
  );
}

function ConferenceModal(props) {
  const [isOpen, setIsOpen] = useState(false);
  const conference = props.conference;
  const modalId = `modal-${conference.href}`;

  useEffect(() => {
    setIsOpen(true);
  }, []);

  function toggleModal() {
    setIsOpen(!isOpen);
    props.setIsOpen(undefined);
  }

  const weather = props.weather;

  return (
    <>
      {isOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog" role="dialog" aria-labelled by={modalId}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={modalId}>{conference.name}</h5>
                <button type="button" className="btn-close" onClick={toggleModal}></button>
              </div>
              <div className="modal-body">
                <p>Conference Description: {conference.description}</p>
                <p>Location: {conference.location.name}</p>
                <p>Dates: {new Date(conference.starts).toLocaleDateString()} - {new Date(conference.ends).toLocaleDateString()}</p>
                <p>Max attendees: {conference.max_attendees}</p>
                <p>Max presentations: {conference.max_presentations}</p>
                <p>The weather: {weather.description}</p>
                <p>The temperature: {weather.temp} degrees</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={toggleModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conferenceColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();

        const requests = [];
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          requests.push(fetch(detailUrl));
        }

        const responses = await Promise.all(requests);

        const conferenceColumns = [[], [], []];

        let i = 0;
        for (const conferenceResponse of responses) {
          if (conferenceResponse.ok) {
            const details = await conferenceResponse.json();
            conferenceColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(conferenceResponse);
          }
        }

        this.setState({ conferenceColumns: conferenceColumns });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="main-page">
        <div className="header">
          <div className="px-4 py-5 my-5 mt-0 text-center">
            <h1 className="display-5">Welcome to Conference GO!</h1>
            <h5 className="lead mb-4">The only resource you'll ever need to plan and run your in-person or virtual conference.</h5>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/attendees/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a conference</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Upcoming conferences</h2>
          <div className="row">
            {this.state.conferenceColumns.map((conferenceList, index) => {
              return (
                <ConferenceColumn key={index} list={conferenceList} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
