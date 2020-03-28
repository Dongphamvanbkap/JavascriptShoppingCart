// show cart
(function() {
	const cartInfo = document.getElementById('cart-info');
	const cart = document.getElementById('cart');

	cartInfo.addEventListener('click', function() {
		cart.classList.toggle('show-cart');
	})
})();

//remove cart
window.addEventListener('load', removeItem);

//clear cart
const clearBtn = document.getElementById('clear-cart');
clearBtn.addEventListener('click', clearCart);

// clear cart
function clearCart() {
	const cart = document.getElementById('cart');
	const cartItems = document.querySelectorAll('.cart-item');
	cartItems.forEach( function(cartItem) {
		cart.removeChild(cartItem)
	});
	showTotal();
}


// remove item function
function removeItem(){
	const trashBtn = document.querySelectorAll('.cart-item-remove');
	// console.log(trashBtn);

	trashBtn.forEach(function(btn){
		btn.addEventListener('click', function(event){
			if (event.target.parentElement.classList.contains('cart-item-remove')){
				const removeElement = event.target.parentElement.parentElement;
				const cart = event.target.parentElement.parentElement.parentElement;
				cart.removeChild(removeElement);
				showTotal();
			}
		})
	})
};

// add item to the cart
(function() {
	const cartBtn = document.querySelectorAll('.store-item-icon');

	cartBtn.forEach( function(btn) {
		btn.addEventListener('click', function(event) {
			if (event.target.parentElement.classList.contains('store-item-icon')) {
				let fullPath = event.target.parentElement.previousElementSibling.src;
				let pos = fullPath.indexOf('img/') + 3;
				let partPath = fullPath.slice(pos);

				let item = {};
				item.img = 'img-cart' + partPath;
				let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
				let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent.slice(1).trim();
				item.name = name;
				item.price = price;
				// console.log(item);

				const cartItem = document.createElement('div');
				cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');
				cartItem.innerHTML = '<img src=' + item.img + ' class="img-fluid rounded-circle" id="item-img" alt=""><div class="item-text"><p id="cart-item-title" class="font-weight-bold mb-0">' + item.name + '</p><span>$ </span><span id="cart-item-price" class="cart-item-price" class="mb-0">' + item.price + '</span></div><a href="#" id="cart-item-remove" class="cart-item-remove"><i class="fas fa-trash"></i></a>'

				// select cart
				const cart = document.getElementById('cart');
				const total = document.querySelector('.cart-total-container');

				cart.insertBefore(cartItem, total);
				// alert('Item added to the cart');
				showTotal();
				removeItem();

			}
		});
	});
	
})();


// show total
function showTotal() {
	const total = [];
	const items = document.querySelectorAll('.cart-item-price');

	items.forEach( function(item) {
		total.push(parseFloat(item.textContent));
	});

	const totalMoney = total.reduce(function(total, item){
		total += item;
		return total;
	}, 0);

	document.getElementById('item-count').textContent = total.length;
	document.querySelector('.item-total').textContent = totalMoney;
	document.getElementById('cart-total').textContent = totalMoney;


}