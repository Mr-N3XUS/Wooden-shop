 let products = JSON.parse(localStorage.getItem('products')) || [
      { id: 1, name: 'میز ناهارخوری راش', category: 'table', price: 3500000, image: 'https://images.unsplash.com/photo-1617360547704-3da8b536d754' },
      { id: 2, name: 'صندلی راحتی گردو', category: 'chair', price: 800000, image: 'https://images.unsplash.com/photo-1580480055273-228ff7f4ce69' },
      { id: 3, name: 'مبل ست 7 نفره', category: 'sofa', price: 12000000, image: 'https://images.unsplash.com/photo-1598300048795-5b6589984f8e' },
      { id: 4, name: 'رخت‌آویز دیواری', category: 'hanger', price: 250000, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
      { id: 5, name: 'راکینگ‌چر کلاسیک', category: 'rocking', price: 2000000, image: 'https://images.unsplash.com/photo-1579656592043-a3a8a4a6aa3b' }
    ];
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    let isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

    // Log initial state for debugging
    console.log('Initial isAdmin:', isAdmin);
    console.log('Initial reviews:', reviews);

    // Emoji Slider
    const emojiSlider = document.getElementById('reviewRating');
    const emojiDisplay = document.getElementById('emojiDisplay');
    const emojis = ['😕', '😐', '😊', '🌟', '🔥'];
    emojiSlider.addEventListener('input', () => {
      const value = parseInt(emojiSlider.value);
      emojiDisplay.textContent = emojis[value - 1];
      emojiDisplay.style.transform = `scale(${1 + value * 0.1})`;
      emojiDisplay.style.opacity = value / 5;
    });

    // Debug URL input fields
    const newProductImage = document.getElementById('newProductImage');
    const editProductImage = document.getElementById('editProductImage');
    newProductImage.addEventListener('input', (e) => {
      console.log('New product image URL input:', e.target.value);
    });
    editProductImage.addEventListener('input', (e) => {
      console.log('Edit product image URL input:', e.target.value);
    });

    // Inspiration Modal
    const inspirationIdeas = [
      "این میز رو با یه لامپ طلایی ست کن تا فضات لوکس بشه!",
      "صندلی‌های چوبی رو کنار یه دیوار خاکستری گرم بچین!",
      "راکینگ‌چر رو تو تراس با کوسن‌های آبی یخی جون بده!",
      "مبل‌های شاد رو با یه فرش سبز زیتونی ست کن!",
      "رخت‌آویز رو تو ورودی با یه آینه طلایی ست کن!"
    ];
    function showInspiration() {
      const randomIdea = inspirationIdeas[Math.floor(Math.random() * inspirationIdeas.length)];
      document.getElementById('inspirationText').textContent = randomIdea;
      document.getElementById('inspirationModal').style.display = 'flex';
    }
    function closeInspiration() {
      document.getElementById('inspirationModal').style.display = 'none';
    }

    // Slider Navigation
    function scrollSlider(sliderId, amount) {
      const slider = document.getElementById(sliderId);
      slider.scrollBy({ left: amount, behavior: 'smooth' });
    }

    function showNotification(message, type = 'success') {
      const div = document.createElement('div');
      div.className = `notification ${type}`;
      div.textContent = message;
      document.body.appendChild(div);
      setTimeout(() => div.remove(), 3500);
    }

    function filterByCategory(category) {
      document.getElementById('category').value = category;
      filterProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    }

    function filterProducts() {
      const search = document.getElementById('search').value.toLowerCase();
      const category = document.getElementById('category').value;
      const productList = document.getElementById('productList');
      productList.innerHTML = '';
      products.forEach(product => {
        const matchesSearch = product.name.toLowerCase().includes(search);
        const matchesCategory = category === 'all' || product.category === category;
        if (matchesSearch && matchesCategory) {
          const div = document.createElement('div');
          div.className = 'product-card';
          div.dataset.category = product.category;
          div.innerHTML = `
            <img loading="lazy" src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()} تومان</p>
            <button onclick="alert('نام: ${product.name}\\nقیمت: ${product.price.toLocaleString()} تومان')">مشاهده</button>
          `;
          productList.appendChild(div);
        }
      });
    }

    function updateProductList() {
      const productList = document.getElementById('productList');
      productList.innerHTML = '';
      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.dataset.category = product.category;
        div.innerHTML = `
          <img loading="lazy" src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price.toLocaleString()} تومان</p>
          <button onclick="alert('نام: ${product.name}\\nقیمت: ${product.price.toLocaleString()} تومان')">مشاهده</button>
        `;
        productList.appendChild(div);
      });
    }

    function validateForm() {
      const product = document.getElementById('reviewProduct').value;
      const rating = document.getElementById('reviewRating').value;
      const comment = document.getElementById('reviewComment').value;
      let isValid = true;
      document.getElementById('reviewProductError').style.display = product ? 'none' : 'block';
      document.getElementById('reviewRatingError').style.display = rating ? 'none' : 'block';
      document.getElementById('reviewCommentError').style.display = comment ? 'none' : 'block';
      if (!product || !rating || !comment) isValid = false;
      return isValid;
    }

    function submitReview() {
      if (!validateForm()) {
        showNotification('لطفاً همه فیلدها را پر کنید!', 'error');
        return;
      }
      const product = document.getElementById('reviewProduct').value;
      const rating = parseInt(document.getElementById('reviewRating').value);
      const comment = document.getElementById('reviewComment').value;
      const review = { id: Date.now(), product, rating, comment };
      reviews.push(review);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      console.log('New review added:', review);
      updateReviews();
      document.getElementById('reviewProduct').value = '';
      document.getElementById('reviewRating').value = 3;
      emojiDisplay.textContent = emojis[2];
      emojiDisplay.style.transform = 'scale(1.3)';
      emojiDisplay.style.opacity = 0.6;
      document.getElementById('reviewComment').value = '';
      showNotification('حس تو ثبت شد!');
    }

    function deleteReview(id) {
      console.log('Attempting to delete review with ID:', id, 'isAdmin:', isAdmin);
      if (!isAdmin) {
        console.error('Unauthorized attempt to delete review');
        showNotification('فقط ادمین می‌تواند نظرات را حذف کند!', 'error');
        return;
      }
      reviews = reviews.filter(review => review.id !== id);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      console.log('Reviews after deletion:', reviews);
      updateReviews();
      showNotification('نظر حذف شد!');
    }

    function updateReviews() {
      const reviewList = document.getElementById('reviewList');
      reviewList.innerHTML = '';
      const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      console.log('Updating reviews, isAdmin:', isAdmin, 'Stored reviews:', storedReviews);
      storedReviews.forEach(review => {
        const div = document.createElement('div');
        div.className = 'review-card';
        div.innerHTML = `
          ${isAdmin ? `<button class="delete-review" onclick="deleteReview(${review.id})">🗑️</button>` : ''}
          <p><strong>${review.product}</strong>: ${review.comment}</p>
          <div class="stars">${'★'.repeat(review.rating)}</div>
        `;
        reviewList.appendChild(div);
        div.style.animation = 'pop 0.5s ease';
      });
    }

    function openAdminProductModal() {
      document.getElementById('adminProductModal').style.display = 'flex';
      document.getElementById('adminProductContent').style.display = 'none';
      document.getElementById('adminProductPassword').value = '';
      document.getElementById('adminProductPasswordError').style.display = 'none';
      console.log('Admin modal opened, isAdmin:', isAdmin);
    }

    function closeAdminProductModal() {
      document.getElementById('adminProductModal').style.display = 'none';
    }

    function loginAdminProducts() {
      const password = document.getElementById('adminProductPassword').value;
      console.log('Admin login attempt, password entered:', password);
      if (!password) {
        document.getElementById('adminProductPasswordError').style.display = 'block';
        console.error('No password entered');
        return;
      }
      if (password !== 'admin123') {
        showNotification('رمز ادمین اشتباه است!', 'error');
        document.getElementById('adminProductPasswordError').style.display = 'block';
        console.error('Incorrect password');
        return;
      }
      isAdmin = true;
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      console.log('Admin logged in successfully, isAdmin:', isAdmin);
      document.getElementById('adminProductContent').style.display = 'block';
      updateAdminProductList();
      updateReviews();
      showNotification('ورود ادمین موفق!');
    }

    function validateUrl(url) {
      const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/i;
      return pattern.test(url);
    }

    function updateAdminProductList() {
      const adminProductList = document.getElementById('adminProductList');
      adminProductList.innerHTML = '';
      products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'admin-product-card';
        div.innerHTML = `
          <span>${product.name} (${product.price.toLocaleString()} تومان)</span>
          <button onclick="editProduct(${product.id})">ویرایش</button>
        `;
        adminProductList.appendChild(div);
      });
    }

    function editProduct(id) {
      const product = products.find(p => p.id === id);
      document.getElementById('editProductName').value = product.name;
      document.getElementById('editProductCategory').value = product.category;
      document.getElementById('editProductPrice').value = product.price;
      document.getElementById('editProductImage').value = product.image;
      document.getElementById('editProductModal').dataset.productId = id;
      document.getElementById('editProductModal').style.display = 'flex';
    }

    function closeEditProductModal() {
      document.getElementById('editProductModal').style.display = 'none';
    }

    function saveProductEdit() {
      const id = parseInt(document.getElementById('editProductModal').dataset.productId);
      const name = document.getElementById('editProductName').value;
      const category = document.getElementById('editProductCategory').value;
      const price = parseInt(document.getElementById('editProductPrice').value);
      const image = document.getElementById('editProductImage').value;
      if (!name || !category || !price || !image) {
        showNotification('لطفاً همه فیلدها را پر کنید!', 'error');
        return;
      }
      if (!validateUrl(image)) {
        showNotification('لطفاً یک URL معتبر وارد کنید!', 'error');
        return;
      }
      const productIndex = products.findIndex(p => p.id === id);
      products[productIndex] = { id, name, category, price, image };
      localStorage.setItem('products', JSON.stringify(products));
      updateProductList();
      updateAdminProductList();
      closeEditProductModal();
      showNotification('محصول ویرایش شد!');
    }

    function addProduct() {
      const name = document.getElementById('newProductName').value;
      const category = document.getElementById('newProductCategory').value;
      const price = parseInt(document.getElementById('newProductPrice').value);
      const image = document.getElementById('newProductImage').value;
      if (!name || !category || !price || !image) {
        showNotification('لطفاً همه فیلدها را پر کنید!', 'error');
        return;
      }
      if (!validateUrl(image)) {
        showNotification('لطفاً یک URL معتبر وارد کنید!', 'error');
        return;
      }
      const id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      products.push({ id, name, category, price, image });
      localStorage.setItem('products', JSON.stringify(products));
      updateProductList();
      updateAdminProductList();
      document.getElementById('newProductName').value = '';
      document.getElementById('newProductCategory').value = '';
      document.getElementById('newProductPrice').value = '';
      document.getElementById('newProductImage').value = '';
      showNotification('محصول جدید اضافه شد!');
    }

    // Initialize
    updateProductList();
    updateReviews();