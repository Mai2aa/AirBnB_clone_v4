$(document).ready(function() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function(data) {
        if (data.status === 'OK') {
          $('#api_status').addClass('available');
        } else {
          $('#api_status').removeClass('available');
        }
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: function(data) {
      $('.places').empty();
      data.forEach(function(place) {
        let placeHTML = `
          <article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)</div>
              <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;
        $('.places').append(placeHTML);
      });
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
;
$('button').click(function() {
    let selectedAmenities = [];
    $('input[type="checkbox"]').each(function() {
      if ($(this).is(':checked')) {
        selectedAmenities.push($(this).data('id'));
      }
    });
    fetchPlaces(selectedAmenities);
  });

  // Fetch places initially
  fetchPlaces();
;