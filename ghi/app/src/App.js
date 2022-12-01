import React from 'react';
import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="locations">
          {/* <Route path="" element={<LocationList />} /> */}
          <Route path="new" element={<LocationForm />} />
        </Route>
        <Route path="conferences">
          {/* <Route path="" element={<ConferenceList />} /> */}
          <Route path="new" element={<ConferenceForm />} />
        </Route>
        <Route path="attendees">
          <Route index element={<AttendeesList />} />
          <Route path="new" element={<AttendConferenceForm />} />
        </Route>
        <Route path="presentations">
          <Route path="new" element={<PresentationForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
