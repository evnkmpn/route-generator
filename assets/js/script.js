function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
      }
      var direct = function(fromLat, fromLon, toLat, toLon){
          const router = L.Routing.osrmv1({
              language: 'en',
              serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1'
          });
          const formatter = new L.Routing.Formatter({ language: 'en', units: 'metric' });
          const waypoints = [
              L.Routing.waypoint(L.latLng(fromLat, fromLon)),
              L.Routing.waypoint(L.latLng(toLat, toLon))
          ];
          router.route(waypoints, function (err, routes) {
              
              const route = routes[0];
              const distance = formatter.formatDistance(routes[0].summary.totalDistance);
              const list = document.getElementById('directions');
              const destination = document.getElementById('destination');
              document.getElementById('distance').textContent = distance;
              destination.textContent = "try to get as close as possible to these coordinates with only xthese instructions: \n"
                + "\n" + toLat + ", " + toLon;
              route.instructions.forEach(function (instr, i) {
                  const item = document.createElement('li');
                  item.textContent = formatter.formatInstruction(instr, i) +
                      (instr.distance ? ' (' + formatter.formatDistance(instr.distance) + ')' : '');
                  list.appendChild(item);
              });

          });
      }
      direct(52.0818079834121, 4.319349355087131, getRandomArbitrary(52.073, 52.095), getRandomArbitrary(4.28, 4.35));