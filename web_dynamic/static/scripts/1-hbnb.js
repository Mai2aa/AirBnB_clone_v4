$(document).ready(function() {
  let checkedAmenities = [];

  $('input[type="checkbox"]').change(function() {
    let amenityId = $(this).data('id');
    let amenityName = $(this).data('name');

    if (this.checked) {
      checkedAmenities.push(amenityId);
      $('div.amenities h4').text(checkedAmenities.map(id => $(`input[data-id="${id}"]`).data('name')).join(', '));
    } else {
      let index = checkedAmenities.indexOf(amenityId);
      if (index !== -1) {
        checkedAmenities.splice(index, 1);
        $('div.amenities h4').text(checkedAmenities.map(id => $(`input[data-id="${id}"]`).data('name')).join(', '));
      }
    }
  });
});
