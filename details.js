document.addEventListener('DOMContentLoaded', function () {
    var productId = new URLSearchParams(window.location.search).get('p');
    var currentObj = null;

    function createProductImages(url, pos) {
        var image = document.createElement('img');
        image.src = url;

        if (pos === 0) {
            image.classList.add("active-image");
        }

        image.onclick = function () {
            document.querySelectorAll('#product-images img').forEach(function (img) {
                img.classList.remove("active-image");
            });
            image.classList.add("active-image");
            document.getElementById('product-preview').src = url;
        }

        return image;
    }

    fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            currentObj = data;
            document.getElementById('product-preview').src = data.preview;
            document.getElementById('product-title').textContent = data.name;
            document.getElementById('product-brand').textContent = data.brand;
            document.getElementById('description').textContent = data.description;
            document.getElementById('product-price').textContent = data.price;

            for (var i = 0; i < data.photos.length; i++) {
                document.getElementById('product-images').appendChild(createProductImages(data.photos[i], i));
            }
        })
        .catch(function (error) {
            console.error('Error fetching data: ', error);
        });

    document.getElementById("btn-add-to-cart").addEventListener("click", function () {
        document.getElementById('btn-add-to-cart').classList.add('bigger');
        setTimeout(function () {
            document.getElementById('btn-add-to-cart').classList.remove('bigger');
        }, 200);

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : JSON.parse(productList);

        var foundAtPos = productList.findIndex(function (item) {
            return parseInt(item.id) === parseInt(currentObj.id);
        });

        if (foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
        } else {
            currentObj.count = 1;
            productList.push(currentObj);
        }

        window.localStorage.setItem('product-list', JSON.stringify(productList));

        var totalCount = productList.reduce(function (total, item) {
            return total + item.count;
        }, 0);

        document.getElementById('cart-count').textContent = totalCount;
    });
});