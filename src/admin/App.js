import React from "react";
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";
import './style.scss';

import Footer from './Organisms/Footer';
import Header from './Organisms/Header';
import Home from './Pages/Home';
import NotFound from "./Pages/NotFound";
import Settings from "./Pages/Settings";

import { useEffect, useState } from '@wordpress/element';
// const NotFound = () => <div>Its 404</div>;

export default function App() {
  
  const [options, setOptions] = useState({});
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    /**
     * Initialize the options fields with the data received from the REST API
     * endpoint provided by the plugin.
     */
    wp.apiFetch({path: '/plugin_starter/v1/options'}).
    then(data => {
            let options = {};
            //Set the new values of the options in the state
            // setOption1(data['plugin_option_1'])
            // setOption2(data['plugin_option_2'])
            setOptions(data['plugin_starter_options'])
        },
      );
  }, []);
  useEffect(() => {
      if (Object.keys(options).length) {
          setLoading(false);
      }
  }, [options]);
  
  return (
    <Router basename='/wp-admin/admin.php'>
      
    {!loading &&
      <>
      <Header />
      <LoadSettingsPages data={options} setData={setOptions}/>
      <Footer />
      </>
    }
    </Router>
  );
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function LoadSettingsPages({data, setData}) {
  let query = useQuery();
  if (query.get("path")){
    if(
      query.get("path") === 'settings'
      || query.get("path") === 'elements'
      || query.get("path") === 'image'
      || query.get("path") === 'posts'
      || query.get("path") === 'draft-posts'
      || query.get("path") === 'trash-posts'
      || query.get("path") === 'scheduled-posts'
    ) {return <Settings data={data} setData={setData} />;} 
    // else if(query.get("path") === 'elements') {return <Elements /> ;}
    // else if(query.get("path") === 'image') {return <Image onSelectImage={(image) => console.log(image)} /> ;}
    else {return <NotFound/>;}
  }
  else {return <Home />;} 
}