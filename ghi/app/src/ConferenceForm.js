import React from 'react';

class ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            start: '',
            end: '',
            description: '',
            presentations: '',
            attendees: '',
            location: '',
            locations: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePresentationsChange = this.handlePresentationsChange.bind(this);
        this.handleAttendeesChange = this.handleAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        const locationObject = this.state.locations.find(
            location => location.id === parseInt(data.location)
          );
        data.max_presentations = data.presentations;
        data.max_attendees = data.attendees;
        data.starts = data.start;
        data.ends = data.end;
        delete data.presentations;
        delete data.attendees;
        delete data.start;
        delete data.end;
        delete data.locations;
        console.log(data);

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json()
            console.log(newConference);

            const cleared = {
                name: '',
                start: '',
                end: '',
                description: '',
                presentations: '',
                attendees: '',
                location: '',

              };
              this.setState(cleared);
        }

    }


    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleStartChange(event) {
        const value = event.target.value;
        this.setState({start: value});
    }

    handleEndChange(event) {
        const value = event.target.value;
        this.setState({end: value});
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value});
    }

    handlePresentationsChange(event) {
        const value = event.target.value;
        this.setState({presentations: value});
    }

    handleAttendeesChange(event) {
        const value = event.target.value;
        this.setState({attendees: value});
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }

    async componentDidMount() {
        const url = 'http://localhost:8000/api/locations/';

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          this.setState({locations: data.locations});
        }
      }


    render() {
    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new conference</h1>
              <form onSubmit={this.handleSubmit} id="create-conference-form">
                <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleStartChange} value={this.state.start} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control"/>
                  <label htmlFor="room_count">Starts</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleEndChange} value={this.state.end} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control"/>
                  <label htmlFor="city">Ends</label>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea onChange={this.handleDescriptionChange} value={this.state.description} className="form-control" required type="text" name="description" id="description" rows="3"></textarea>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handlePresentationsChange} value={this.state.presentations} placeholder="Max Presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control"/>
                      <label htmlFor="max_presentations">Max Presentations</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={this.handleAttendeesChange} value={this.state.attendees} placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control"/>
                  <label htmlFor="max_attendees">Max Attendees</label>
                </div>
                <div className="mb-3">
                  <select onChange={this.handleLocationChange} value={this.state.location} required id="location" name="location" className="form-select">
                    <option value="">Choose a location</option>
                    {this.state.locations.map(location => {
                        return (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConferenceForm;
