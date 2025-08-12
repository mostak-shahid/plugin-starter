import { __ } from "@wordpress/i18n";
import "./App.css";
import Header from "./layouts/Header/Header";
// import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import ImportExport from "./pages/ImportExport";
import More from "./pages/More";
import Feedback from "./pages/Feedback";
import Footer from "./layouts/Footer/Footer";
const NotFound = () => (
  <div>
    <h2>{__("404 - Page Not Found", "plugin-starter")}</h2>
    <p>{__("The page you are looking for does not exist.", "plugin-starter")}</p>
    <Link to="/">{__("Go back to Home", "plugin-starter")}</Link>
  </div>
);
function App() {

  return (
    <div className="plugin-starter-settings-container">
      <Header />
      <Routes>
        {/* <Route path="/" element={<RestrictionsSettings handleChange={handleChange} />} /> */}
        {/* <Route path="/"  element={<Navigate to="/restrictions/settings" />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Navigate to="/settings/base_input" />} />
        <Route path="/settings/components/basic" element={<ComponentsBasic />} />
        <Route path="/settings/components/advanced" element={<ComponentsAdvanced />} />
        <Route path="/settings/base_input" element={<BaseInput />} />
        <Route path="/settings/array_input" element={<ArrayInput />} />
        <Route path="/page" element={<Page />} />
        <Route path="/settings/import_export" element={<ImportExport />} />
        <Route path="/settings/more" element={<More />} />
        <Route path="/settings/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
