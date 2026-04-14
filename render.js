const container = document.getElementById("product-list");

container.innerHTML = products.map(product => `
  <article class="group relative flex flex-col md:mt-20 cursor-pointer" onclick="window.location.href='product-detail.html?id=${product.id}'">
    
    <div class="overflow-hidden bg-surface-container mb-6 aspect-[4/5] relative">
      
      <img
        src="${product.image}"
        alt="${product.alt}"
        class="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
      />

      <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <button class="absolute bottom-6 right-6 bg-surface-container-lowest text-on-background px-6 py-3 font-label text-[10px] tracking-widest uppercase font-black opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out-expo">
        View Details
      </button>

    </div>

    <div class="flex flex-col gap-1">
      <div class="flex justify-between items-baseline">
        <h3 class="font-headline text-2xl font-bold tracking-tight">
          ${product.name}
        </h3>
        <span class="font-body font-light">
          $${product.price}
        </span>
      </div>

      <p class="font-label text-[10px] tracking-widest uppercase text-outline-variant">
        ${product.category}
      </p>
    </div>

  </article>
`).join("");