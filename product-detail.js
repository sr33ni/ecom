// Product Detail Page Functionality

// Get URL parameters
function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Get current product ID from URL
const productId = getUrlParam('id');
let currentProduct = null;

// Find and load product
if (productId) {
  currentProduct = products.find(p => p.id === parseInt(productId));
}

// If product not found, default to first product
if (!currentProduct) {
  currentProduct = products[0];
  // Update URL to correct product
  window.history.replaceState({}, '', `product-detail.html?id=${currentProduct.id}`);
}

// Load product data into page
function loadProductData() {
  // Update product name
  const productNameEl = document.getElementById('product-name');
  if (productNameEl) productNameEl.textContent = currentProduct.name;

  // Update product price
  const productPriceEl = document.getElementById('product-price');
  if (productPriceEl) productPriceEl.textContent = `$${currentProduct.price}`;

  // Update original price if it exists
  const originalPriceEl = document.getElementById('product-original-price');
  if (originalPriceEl && currentProduct.originalPrice) {
    originalPriceEl.textContent = `$${currentProduct.originalPrice}`;
  }

  // Update product image
  const productImageEl = document.getElementById('product-image');
  if (productImageEl) {
    productImageEl.src = currentProduct.image;
    productImageEl.alt = currentProduct.alt;
  }

  // Update description
  const descriptionEl = document.getElementById('product-description');
  if (descriptionEl) descriptionEl.textContent = currentProduct.description;

  // Update specifications
  const specsListEl = document.getElementById('product-specs');
  if (specsListEl && currentProduct.specs) {
    specsListEl.innerHTML = currentProduct.specs.map(spec => `
      <li class="flex justify-between py-3 border-b border-outline-variant/20">
        <span class="text-on-surface-variant">${spec.label}</span>
        <span class="font-semibold">${spec.value}</span>
      </li>
    `).join('');
  }
}

// Load product when page is ready
loadProductData();

let quantity = 1;
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Quantity Controls
const qtyDisplay = document.getElementById('qty-display');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');

qtyMinus.addEventListener('click', () => {
  if (quantity > 1) {
    quantity--;
    qtyDisplay.textContent = quantity;
  }
});

qtyPlus.addEventListener('click', () => {
  quantity++;
  qtyDisplay.textContent = quantity;
});

// Add to Cart Button
const addToCartBtn = document.getElementById('add-to-cart');
const cartToast = document.getElementById('cart-toast');

addToCartBtn.addEventListener('click', () => {
  // Use dynamically loaded product data
  const cartItem = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    quantity: quantity,
    image: currentProduct.image,
    addedAt: new Date().toLocaleString()
  };

  // Add to cart array
  cartItems.push(cartItem);
  
  // Save to localStorage
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Update cart badge
  updateCartBadge();

  // Show toast notification
  showToast();

  // Reset quantity
  quantity = 1;
  qtyDisplay.textContent = quantity;

  console.log('Added to cart:', cartItem);
  console.log('Current cart:', cartItems);
});

function showToast() {
  cartToast.style.opacity = '1';
  
  setTimeout(() => {
    cartToast.style.opacity = '0';
  }, 2000);
}

// Tab Navigation
const tabDetails = document.getElementById('tab-details');
const tabReviews = document.getElementById('tab-reviews');
const tabShipping = document.getElementById('tab-shipping');
const tabContent = document.getElementById('tab-content');

tabReviews.addEventListener('click', () => {
  switchTab(tabReviews, 'reviews');
});

tabShipping.addEventListener('click', () => {
  switchTab(tabShipping, 'shipping');
});

tabDetails.addEventListener('click', () => {
  switchTab(tabDetails, 'details');
});

function switchTab(tabBtn, tabName) {
  // Remove active state from all tabs
  document.querySelectorAll('[id^="tab-"]').forEach(tab => {
    tab.classList.remove('border-b-2', 'border-primary', 'font-bold');
    tab.classList.add('text-outline-variant');
  });

  // Add active state to clicked tab
  tabBtn.classList.add('border-b-2', 'border-primary', 'font-bold');
  tabBtn.classList.remove('text-outline-variant');

  // Update tab content based on selected tab
  switch(tabName) {
    case 'reviews':
      tabContent.innerHTML = `
        <div class="md:col-span-2">
          <h3 class="font-headline text-2xl font-bold mb-8">Customer Reviews (24)</h3>
          <div class="space-y-8">
            <div class="border-b border-outline-variant/20 pb-8">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-primary rounded-full"></div>
                <div class="flex-1">
                  <h4 class="font-bold">Alex Johnson</h4>
                  <div class="flex gap-1 my-1">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                  </div>
                  <p class="text-xs text-on-surface-variant">Verified Purchase • 2 weeks ago</p>
                </div>
              </div>
              <p class="text-on-surface-variant leading-relaxed">
                These are absolutely incredible. I've tested dozens of running shoes and these are hands down the most responsive and comfortable. Worth every penny.
              </p>
            </div>
            <div class="border-b border-outline-variant/20 pb-8">
              <div class="flex items-start gap-4 mb-4">
                <div class="w-12 h-12 bg-secondary rounded-full"></div>
                <div class="flex-1">
                  <h4 class="font-bold">Maria Chen</h4>
                  <div class="flex gap-1 my-1">
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star</span>
                    <span class="material-symbols-outlined text-xs">star_half</span>
                  </div>
                  <p class="text-xs text-on-surface-variant">Verified Purchase • 1 month ago</p>
                </div>
              </div>
              <p class="text-on-surface-variant leading-relaxed">
                Great shoe overall. Very lightweight and the response time is excellent. Only minor issue is sizing runs a bit narrow.
              </p>
            </div>
          </div>
        </div>
      `;
      break;

    case 'shipping':
      tabContent.innerHTML = `
        <div class="md:col-span-2">
          <h3 class="font-headline text-2xl font-bold mb-8">Shipping & Returns</h3>
          <div class="space-y-8">
            <div>
              <h4 class="font-bold text-lg mb-4">Shipping Information</h4>
              <ul class="space-y-3 text-on-surface-variant">
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary">check_circle</span>
                  <span><strong>Standard Shipping:</strong> $0 (Orders over $100) • 5-7 business days</span>
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary">check_circle</span>
                  <span><strong>Express Shipping:</strong> $15 • 2-3 business days</span>
                </li>
                <li class="flex gap-3">
                  <span class="material-symbols-outlined text-primary">check_circle</span>
                  <span><strong>Overnight:</strong> $30 • Next business day</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-lg mb-4">Return Policy</h4>
              <p class="text-on-surface-variant leading-relaxed mb-4">
                We offer hassle-free returns within 30 days of purchase. Items must be in original condition with all packaging.
              </p>
              <ul class="space-y-2 text-on-surface-variant text-sm">
                <li>• Free return label included with every order</li>
                <li>• Refund processed within 5-7 business days of receipt</li>
                <li>• Size exchanges available at no extra cost</li>
              </ul>
            </div>
          </div>
        </div>
      `;
      break;

    default:
      tabContent.innerHTML = `
        <div>
          <h3 class="font-headline text-2xl font-bold mb-4">About ${currentProduct.name}</h3>
          <p class="text-on-surface-variant leading-relaxed mb-4">
            ${currentProduct.description}
          </p>
          <ul class="space-y-3 text-sm text-on-surface-variant">
            <li class="flex gap-3">
              <span class="material-symbols-outlined text-primary text-xl">check_circle</span>
              <span>Materials: ${currentProduct.material}</span>
            </li>
            <li class="flex gap-3">
              <span class="material-symbols-outlined text-primary text-xl">check_circle</span>
              <span>Technology: ${currentProduct.technology}</span>
            </li>
            <li class="flex gap-3">
              <span class="material-symbols-outlined text-primary text-xl">check_circle</span>
              <span>Warranty: ${currentProduct.warranty}</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-headline text-2xl font-bold mb-4">Product Details</h3>
          <p class="text-on-surface-variant leading-relaxed mb-4">
            Weight: <strong>${currentProduct.weight}</strong>
          </p>
          <div class="space-y-4">
            <div class="border-l-4 border-primary pl-4">
              <p class="font-bold text-sm">${currentProduct.category}</p>
              <p class="text-xs text-on-surface-variant">${currentProduct.technology}</p>
            </div>
          </div>
        </div>
      `;
  }
}

// Size Selection
document.querySelectorAll('button').forEach(btn => {
  if (btn.textContent.match(/^\d+$/)) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('button').forEach(b => {
        if (b.textContent.match(/^\d+$/)) {
          b.classList.remove('border-primary', 'bg-primary/10', 'text-primary');
          b.classList.add('border-outline-variant');
        }
      });
      this.classList.add('border-primary', 'bg-primary/10', 'text-primary');
      this.classList.remove('border-outline-variant');
    });
  }
});

// Display cart count (optional - if you have a cart icon)
function updateCartCount() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.querySelector('[href="items.html"] .material-symbols-outlined');
  if (cartIcon && totalItems > 0) {
    cartIcon.parentElement.innerHTML += `<span class="absolute -top-2 -right-2 bg-secondary text-on-secondary text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">${totalItems}</span>`;
  }
}

updateCartCount();

// ===== CART CANVAS & CHECKOUT FUNCTIONALITY =====

// Cart Canvas Elements
const cartCanvas = document.getElementById('cart-canvas');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const cartBadge = document.getElementById('cart-badge');

// Checkout Modal Elements
const checkoutModal = document.getElementById('checkout-modal');
const checkoutContent = document.getElementById('checkout-content');
const closeModalBtn = document.getElementById('close-modal');
const checkoutForm = document.getElementById('checkout-form');

// Update cart badge with item count
function updateCartBadge() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalItems;
  
  if (totalItems > 0) {
    cartBadge.classList.remove('hidden');
  } else {
    cartBadge.classList.add('hidden');
  }
}

// Initialize badge on page load
updateCartBadge();

// Toggle cart canvas
function toggleCartCanvas() {
  const isOpen = cartCanvas.classList.contains('translate-x-0');
  
  if (isOpen) {
    // Close cart
    cartCanvas.classList.remove('translate-x-0');
    cartOverlay.classList.remove('opacity-100');
    cartOverlay.classList.add('invisible');
  } else {
    // Open cart
    cartCanvas.classList.add('translate-x-0');
    cartOverlay.classList.remove('invisible');
    cartOverlay.classList.add('opacity-100');
    renderCartItems();
  }
}

// Close cart when clicking overlay
cartOverlay.addEventListener('click', (e) => {
  if (e.target === cartOverlay) {
    toggleCartCanvas();
  }
});

// Close cart button
closeCartBtn.addEventListener('click', toggleCartCanvas);

// Cart toggle button
cartToggle.addEventListener('click', toggleCartCanvas);

// Render cart items in the canvas
function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-center text-on-surface-variant py-8">Your cart is empty</p>';
    cartTotalEl.textContent = '$0';
    return;
  }

  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItemEl = document.createElement('div');
    cartItemEl.className = 'bg-surface-container rounded-lg p-4 flex gap-4 border border-outline-variant/20';
    cartItemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
      <div class="flex-1">
        <h4 class="font-bold text-sm line-clamp-2">${item.name}</h4>
        <p class="text-xs text-on-surface-variant mb-2">Qty: ${item.quantity}</p>
        <p class="font-semibold text-sm">$${itemTotal}</p>
        <button class="mt-2 text-error text-xs font-semibold flex items-center gap-1 hover:opacity-70 transition remove-item-btn" data-index="${index}">
          <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
          Remove
        </button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemEl);
  });

  // Update total
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // Add event listeners to remove buttons
  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.getAttribute('data-index');
      removeFromCart(parseInt(index));
    });
  });
}

// Remove item from cart
function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  renderCartItems();

  // Update cart badge
  updateCartBadge();

  // Show toast
  const toast = document.getElementById('cart-toast');
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 1500);
}

// Checkout Modal Functions
function openCheckoutModal() {
  checkoutModal.classList.remove('opacity-0', 'invisible');
  checkoutModal.classList.add('opacity-100');
  checkoutContent.classList.remove('scale-95');
  checkoutContent.classList.add('scale-100');
  checkoutModal.style.pointerEvents = 'auto';
  
  // Populate order summary
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 100 ? 0 : 15;
  
  document.getElementById('modal-subtotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('modal-shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping}`;
  document.getElementById('modal-total').textContent = `$${(total + shipping).toFixed(2)}`;
}

function closeCheckoutModal() {
  checkoutModal.classList.add('opacity-0', 'invisible');
  checkoutContent.classList.add('scale-95');
  checkoutContent.classList.remove('scale-100');
  checkoutModal.style.pointerEvents = 'none';
}

// Empty Cart Modal Elements
const emptyCartModal = document.getElementById('empty-cart-modal');
const emptyCartContent = document.getElementById('empty-cart-content');
const closeEmptyModalBtn = document.getElementById('close-empty-modal');

// Open empty cart modal
function openEmptyCartModal() {
  emptyCartModal.classList.remove('opacity-0', 'invisible');
  emptyCartModal.classList.add('opacity-100');
  emptyCartContent.classList.remove('scale-95');
  emptyCartContent.classList.add('scale-100');
  emptyCartModal.style.pointerEvents = 'auto';
}

// Close empty cart modal
function closeEmptyCartModal() {
  emptyCartModal.classList.add('opacity-0', 'invisible');
  emptyCartContent.classList.add('scale-95');
  emptyCartContent.classList.remove('scale-100');
  emptyCartModal.style.pointerEvents = 'none';
}

// Close button for empty cart modal
closeEmptyModalBtn.addEventListener('click', closeEmptyCartModal);

// Close empty cart modal when clicking outside
emptyCartModal.addEventListener('click', (e) => {
  if (e.target === emptyCartModal) {
    closeEmptyCartModal();
  }
});

// Checkout button click
checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    openEmptyCartModal();
    return;
  }
  openCheckoutModal();
});

// Close modal button
closeModalBtn.addEventListener('click', closeCheckoutModal);

// Close modal when clicking outside (on the modal)
checkoutModal.addEventListener('click', (e) => {
  if (e.target === checkoutModal) {
    closeCheckoutModal();
  }
});

// Handle checkout form submission
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('checkout-name').value;
  const address = document.getElementById('checkout-address').value;
  const pincode = document.getElementById('checkout-pincode').value;

  if (!name || !address || !pincode) {
    alert('Please fill in all fields');
    return;
  }

  // Create order object
  const order = {
    id: Date.now(),
    name: name,
    address: address,
    pincode: pincode,
    items: cartItems,
    total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    orderDate: new Date().toLocaleString()
  };

  // Save order to localStorage
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Clear cart
  cartItems = [];
  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Close modal
  closeCheckoutModal();

  // Close cart canvas
  cartCanvas.classList.remove('translate-x-0');
  cartOverlay.classList.remove('opacity-100');
  cartOverlay.classList.add('invisible');

  // Reset form
  checkoutForm.reset();

  // Update cart badge
  updateCartBadge();

  // Show success message
  alert(`Order placed successfully!\nOrder ID: ${order.id}\n\nThank you for your purchase!`);

  // Optionally redirect or update UI
  renderCartItems();
});
