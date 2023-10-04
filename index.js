document.addEventListener('DOMContentLoaded', function () {
  function createHomePageProductCard(obj) {
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('product-card');

    var productLink = document.createElement('a');
    productLink.href = 'details.html?p=' + obj.id;

    var productImage = document.createElement('img');
    productImage.classList.add('product-image');
    productImage.src = obj.preview;
    productImage.alt = obj.name + ' Pic';

    productLink.appendChild(productImage);

    var innerDiv = document.createElement('div');
    innerDiv.classList.add('product-meta');

    var productName = document.createElement('h4');
    productName.textContent = obj.name;

    var productBrand = document.createElement('h5');
    productBrand.textContent = obj.brand;

    var productPrice = document.createElement('p');
    productPrice.textContent = 'Rs ' + obj.price;

    innerDiv.appendChild(productName);
    innerDiv.appendChild(productBrand);
    innerDiv.appendChild(productPrice);

    mainDiv.appendChild(productLink);
    mainDiv.appendChild(innerDiv);

    return mainDiv;
  }

  fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].isAccessory) {
          document.getElementById('accessory-grid').appendChild(createHomePageProductCard(data[i]));
        } else {
          document.getElementById('clothing-grid').appendChild(createHomePageProductCard(data[i]));
        }
      }
    })
    .catch(function (error) {
      console.error('Error fetching data: ', error);
    });
});