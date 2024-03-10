import {useState, useEffect} from 'react';
import { loadModules } from 'esri-loader';

const MapComponent = () => {
    useEffect(() => {
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer'], { css: true })
        .then(([Map, MapView, FeatureLayer]) => {
          const map = new Map({
            basemap: 'topo-vector'
          });
  
          const view = new MapView({
            container: 'viewDiv',
            map: map,
            
            center: [35, 31], 
            zoom: 7
          });
  
          const citiesLayer = new FeatureLayer({
            url: 'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0',
            outFields: ['CITY_NAME', 'POPULATION'],
            popupTemplate: {
              title: '{CITY_NAME}',
              content: 'Population: {POP}',
              
            },
            renderer: {
              type: 'simple',
              symbol: {
                type: 'simple-marker',
                style: 'circle',
                color: [255, 0, 0], 
                size: 5
              }
            }
          });
          console.log(citiesLayer);
          map.add(citiesLayer);
        })
        .catch((err) => console.error(err));
    }, []);
  
    return <div id="viewDiv" style={{ height: '100vh', width: '100%' }} />;
  };
  
  export default MapComponent;