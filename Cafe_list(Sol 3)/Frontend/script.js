document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const cafeList = document.getElementById('cafeList');

    // Fetch cafes and places data
    fetchCafesAndPlaces();

    // Function to fetch cafes and places data
    function fetchCafesAndPlaces() {
        Promise.all([
            fetch('http://localhost:3000/cafes').then(response => response.json()),
            fetch('http://localhost:3000/places').then(response => response.json())
        ]).then(data => {
            const cafes = data[0];
            const places = data[1];
            displayCafes(cafes, places);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    // Function to display cafes
    function displayCafes(cafes, places) {
        cafeList.innerHTML = ''; // Clear previous data

        cafes.forEach(cafe => {
            const place = places.find(place => place.id == cafe.location_id);
            const location = place ? `${place.street_no}, ${place.locality}` : 'Unknown';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cafe.name}</td>
                <td>${location}</td>
            `;
            cafeList.appendChild(row);
        });
    }

    // Function to display filtered cafes
    function displayCafe(cafes) {
        fetch('http://localhost:3000/places')
            .then(response => response.json())
            .then(data => {
                places = data;
                cafeList.innerHTML = '';
        
                cafes.forEach(cafe => {
                    const place = places.find(place => place.id == cafe.location_id);
                    const location = place ? `${place.street_no}, ${place.locality}` : 'Unknown';
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${cafe.name}</td>
                        <td>${location}</td>
                    `;
                    cafeList.appendChild(row);
            })
       
        })
    }

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            fetchCafesAndPlaces(); // If search box is empty, fetch all cafes
        } else {
            filterCafes(searchTerm);
        }
    });

    // Function to filter cafes by name
    function filterCafes(searchTerm) {
        fetch('http://localhost:3000/cafes')
            .then(response => response.json())
            .then(cafes => {
                const filteredCafes = cafes.filter(cafe =>
                    cafe.name.toLowerCase().includes(searchTerm)
                );
                displayCafe(filteredCafes);
            })
            .catch(error => {
                console.error('Error fetching filtered cafes:', error);
            });
    }
});
