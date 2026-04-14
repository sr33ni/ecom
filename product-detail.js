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
