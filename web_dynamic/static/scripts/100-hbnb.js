$(document).ready(function() {
    // Check API status
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
  
    // Store selected state and city IDs
    let selectedStateIDs = [];
    let selectedCityIDs = [];
  
    // Fetch places
    function fetchPlaces(amenities = [], stateIDs = [], cityIDs = []) {
      $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        data: JSON.stringify({ amenities: amenities, states: stateIDs, cities: cityIDs }),
        contentType: 'application/json',
        success: function(data) {
          $('.places').empty();
          data.forEach(function(place) {
            let stateCheckboxHTML = `<input type="checkbox" style="margin-right: 10px;" data-id="${place.state.id}" data-name="${place.state.name}">`;
            let cityCheckboxHTML = `<input type="checkbox" style="margin-right: 10px;" data-id="${place.city.id}" data-name="${place.city.name}">`;
            let placeHTML = `
              <article>
                <div class="title">
                  ${stateCheckboxHTML}<h2>${place.state.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  ${cityCheckboxHTML}<div class="name">${place.city.name}</div>
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
    }
  
    // Handle checkbox changes
    $('input[type="checkbox"]').change(function() {
      let id = $(this).data('id');
      let name = $(this).data('name');
  
      if ($(this).is(':checked')) {
        if ($(this).data('type') === 'state') {
          selectedStateIDs.push(id);
        } else {
          selectedCityIDs.push(id);
        }
      } else {
        if ($(this).data('type') === 'state') {
          selectedStateIDs = selectedStateIDs.filter(function(stateID) {
            return stateID !== id;
          });
        } else {
          selectedCityIDs = selectedCityIDs.filter(function(cityID) {
            return cityID !== id;
          });
        }
      }
  
      // Update the Locations heading
      let locationsText = '';
      if (selectedStateIDs.length > 0) {
        locationsText += `States: ${selectedStateIDs.join(', ')}`;
      }
      if (selectedCityIDs.length > 0) {
        if (locationsText !== '') {
          locationsText += ', ';
        }
        locationsText += `Cities: ${selectedCityIDs.join(', ')}`;
      }
      if (locationsText === '') {
        locationsText = 'All';
      }
      $('#locations h4').text(locationsText);
    });
  
    // Fetch places when button is clicked
    $('button').click(function() {
      let selectedAmenities = [];
      $('input[type="checkbox"]').each(function() {
        if ($(this).is(':checked') && $(this).data('type') === 'amenity') {
          selectedAmenities.push($(this).data('id'));
        }
      });
      fetchPlaces(selectedAmenities, selectedStateIDs, selectedCityIDs);
    });
  
    // Fetch places initially
    fetchPlaces();
  });