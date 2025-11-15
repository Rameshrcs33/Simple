// Map utility function to generate HTML for WebView-based map
export const getMapHTML = () => {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8' />
    <title>Interactive Map</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      html, body, #map {
        height: 100%;
        width: 100%;
      }
      .info {
        position: absolute;
        top: 10px;
        left: 10px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px;
        border-radius: 4px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        z-index: 10;
      }
    </style>
  </head>
  <body>
    <div id='map'></div>
    <div class='info'>
      <p><strong>Interactive Map</strong></p>
      <p>Zoom: <span id='zoom'>12</span></p>
      <p>Lat: <span id='lat'>0</span></p>
      <p>Lng: <span id='lng'>0</span></p>
    </div>
    <script>
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycW1nMGtjeGt4YTIifQ.rJcFIG214AriISLbB6B6HA';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [0, 0],
        zoom: 12
      });

      map.on('move', () => {
        document.getElementById('zoom').textContent = map.getZoom().toFixed(2);
        document.getElementById('lat').textContent = map.getCenter().lat.toFixed(4);
        document.getElementById('lng').textContent = map.getCenter().lng.toFixed(4);
      });

      // Add a marker at the center
      const marker = new mapboxgl.Marker()
        .setLngLat([0, 0])
        .addTo(map);

      map.on('click', (e) => {
        marker.setLngLat(e.lngLat);
      });
    </script>
  </body>
</html>
  `;
};
