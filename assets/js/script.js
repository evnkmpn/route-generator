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
              destination.textContent = "Go these coordinates: "
                  + toLat + ", " + toLon + ". About " + distance + " away on foot if you follow these instructions.";
              route.instructions.forEach(function (instr, i) {
                  const item = document.createElement('li');
                  item.textContent = formatter.formatInstruction(instr, i) +
                      (instr.distance ? ' (' + formatter.formatDistance(instr.distance) + ')' : '');
                  list.appendChild(item);
              });

          });
      }
      direct(52.0818079834121, 4.319349355087131, getRandomArbitrary(52.08, 52.09), getRandomArbitrary(4.310, 4.30));