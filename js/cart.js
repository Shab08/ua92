$(document).ready(function() {
	var productItem = [{
			productName: "Jay-Z-The-Blueprint",
			price: "51$",
			photo: "R1344-050-Jay-Z-The-Blueprint.png"
		},
		{
			productName: "Marvin-Gaye-WHATS-GOING-ON",
			price: "49$",
			photo: "R1344-001-Marvin-Gaye-WHATS-GOING-ON.png"
		},
		{
			productName: "Beach-Boys-PET-SOUNDS-update",
			price: "52$",
			photo: "R1344-002-Beach-Boys-PET-SOUNDS-update.png"
		},
		{
			productName: "JoniMitchell-BLUE-HR",
			price: "47$",
			photo: "R1344-003-JoniMitchell-BLUE-HR.png"
		},
		{
			productName: "Stevie-Wonder-SONGS-IN-THE-KEY-OF-LIFE",
			price: "53$",
			photo: "R1344-004-Stevie-Wonder-SONGS-IN-THE-KEY-OF-LIFE.png"
		},
		{
			productName: "Beyonce-Lemonade",
			price: "41$",
			photo: "R1344-032-Beyonce-Lemonade.png"
		},
		{
			productName: "Paul-Simon-Graceland",
			price: "39$",
			photo: "R1344-046-Paul-Simon-Graceland.png"
		},

		{
			productName: "Ramones-Ramones",
			price: "47$",
			photo: "R1344-047-Ramones-Ramones.png"
		},
		{
			productName: "Bob-Marley-and-the-Wailers-Legend",
			price: "42$",
			photo: "R1344-048-Bob-Marley-and-the-Wailers-Legend.png"
		},
		{
			productName: "Outkast-Aquemini",
			price: "45$",
			photo: "R1344-049-Outkast-Aquemini.png"
		}];
	showProductGallery(productItem);
	showCartTable();
});

function addToCart(element) {
	var productParent = $(element).closest('div.product-item');

	var price = $(productParent).find('.price span').text();
	var productName = $(productParent).find('.productname').text();
	var quantity = $(productParent).find('.product-quantity').val();

	var cartItem = {
		productName: productName,
		price: price,
		quantity: quantity
	};
	var cartItemJSON = JSON.stringify(cartItem);

	var cartArray = new Array();
	// If javascript shopping cart session is not empty
	if (sessionStorage.getItem('shopping-cart')) {
		cartArray = JSON.parse(sessionStorage.getItem('shopping-cart'));
	}
	cartArray.push(cartItemJSON);

	var cartJSON = JSON.stringify(cartArray);
	sessionStorage.setItem('shopping-cart', cartJSON);
	showCartTable();
}

function emptyCart() {
	if (sessionStorage.getItem('shopping-cart')) {
		// Clear JavaScript sessionStorage by index
		sessionStorage.removeItem('shopping-cart');
		showCartTable();
	}
}



function removeCartItem(index) {
	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		sessionStorage.removeItem(shoppingCart[index]);
		showCartTable();
	}
}

function showCartTable() {
	var cartRowHTML = "";
	var itemCount = 0;
	var grandTotal = 0;

	var price = 0;
	var quantity = 0;
	var subTotal = 0;

	if (sessionStorage.getItem('shopping-cart')) {
		var shoppingCart = JSON.parse(sessionStorage.getItem('shopping-cart'));
		itemCount = shoppingCart.length;

		//Iterate javascript shopping cart array
		shoppingCart.forEach(function(item) {
			var cartItem = JSON.parse(item);
			price = parseFloat(cartItem.price);
			quantity = parseInt(cartItem.quantity);
			subTotal = price * quantity

			cartRowHTML += "<tr>" +
				"<td>" + cartItem.productName + "</td>" +
				"<td class='text-right'>$" + price.toFixed(2) + "</td>" +
				"<td class='text-right'>" + quantity + "</td>" +
				"<td class='text-right'>$" + subTotal.toFixed(2) + "</td>" +
				"</tr>";

			grandTotal += subTotal;
		});
	}

	$('#cartTableBody').html(cartRowHTML);
	$('#itemCount').text(itemCount);
	$('#totalAmount').text("$" + grandTotal.toFixed(2));
}


function showProductGallery(product) {
	//Iterate javascript shopping cart array
	var productHTML = "";
	product.forEach(function(item) {
		productHTML += '<div class="product-item">'+
					'<img class="album-img" src="images/' + item.photo + '">'+
					'<div class="productName">' + item.productName + '</div>'+
					'<div class="price">$<span>' + item.price + '</span></div>'+
					'<div class="cart-action">'+
						'<input type="text" class="product-quantity" name="quantity" value="1" size="2" />'+
						'<input type="submit" value="Add to Cart" class="add-to-cart" onClick="addToCart(this)" />'+
					'</div>'+
				'</div>';
				"<tr>";

	});
	$('#product-item-container').html(productHTML);
}
