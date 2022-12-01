import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="attendees/new" element={<AttendConferenceForm />} />
            <Route path="locations/new" element={<LocationForm />} />
            <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
        </Routes>
      </div >
    </BrowserRouter>

  );
}

export default App;
