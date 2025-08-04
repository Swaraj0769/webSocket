const socket = io()

if (navigator.geolocation) {     // navigator= many operation are happen through navigator in the browser
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", { latitude, longitude })
        // marker.bindPopup("You are here!").openPopup();
    },
        (error) => {
            console.error(error);
        }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000
    }
    )

}

const map = L.map("map").setView([0, 0], 16);
// const map= L.map("map").setView([40.7128, -74.0060], 16);  

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "  Swaraj  "
}).addTo(map)

const markers = {};

socket.on("receive-location", (data) => {           //it show the coordinates
    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude]);

    // document.getElementById("coordsDisplay").innerText =`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude])
    }
    else {
        // markers[id] = L.marker([latitude, longitude]).addTo(map)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
                const address = data.display_name || "Address not found";
                const popupContent = `
            <b>Coordinates:</b><br>Lat: ${latitude.toFixed(6)}<br>Lng: ${longitude.toFixed(6)}<br>
            <b>Address:</b><br>${address}
        `;

                if (markers[id]) {
                    markers[id].setLatLng([latitude, longitude]);
                    markers[id].getPopup().setContent(popupContent);
                } else {
                    markers[id] = L.marker([latitude, longitude])
                        .addTo(map)
                        .bindPopup(popupContent)
                        .openPopup();
                }
            })
            .catch(err => {
                console.error("Failed to fetch address", err);
            });

    }
})

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id]
    }
})