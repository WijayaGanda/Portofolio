// ========== Navigation Menu Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== Navbar Scroll Effect ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ========== Profile Image Upload ==========
const imageUpload = document.getElementById('imageUpload');
const profileImage = document.getElementById('profileImage');

imageUpload?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            profileImage.src = event.target.result;
            // Save to localStorage
            localStorage.setItem('profileImage', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved profile image on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
    
    // Load portfolio items
    loadPortfolioItems();
});

// ========== Portfolio Data Management ==========
let portfolioItems = [
    {
        id: 1,
        title: "Wargaku Surabaya",
        description: "Aplikasi mobile untuk layanan publik warga Surabaya",
        details: "Aplikasi Wargaku Surabaya adalah platform mobile yang memudahkan warga Surabaya dalam mengakses berbagai layanan publik. Aplikasi ini dikembangkan menggunakan Flutter untuk antarmuka mobile yang responsif dan Laravel untuk backend API. Aplikasi ini menyediakan fitur pelaporan masalah kota, informasi layanan pemerintah, dan akses ke berbagai fasilitas publik.",
        tags: ["Flutter", "Dart", "Laravel", "REST API", "MySQL"],
        image: "assets/portfolio-placeholder.jpg"
    }
];

// Load from localStorage if available
const savedPortfolio = localStorage.getItem('portfolioItems');
if (savedPortfolio) {
    portfolioItems = JSON.parse(savedPortfolio);
}

function savePortfolioItems() {
    localStorage.setItem('portfolioItems', JSON.stringify(portfolioItems));
}

function loadPortfolioItems() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach((item, index) => {
        const portfolioCard = createPortfolioCard(item, index);
        portfolioGrid.insertAdjacentHTML('beforeend', portfolioCard);
    });
    
    // Add "Add Portfolio" card
    portfolioGrid.insertAdjacentHTML('beforeend', `
        <div class="portfolio-item add-portfolio">
            <div class="add-portfolio-content" onclick="openAddPortfolioModal()">
                <i class="fas fa-plus"></i>
                <p>Tambah Proyek</p>
            </div>
        </div>
    `);
}

function createPortfolioCard(item, index) {
    const tagsHTML = item.tags.map(tag => `<span>${tag}</span>`).join('');
    return `
        <div class="portfolio-item">
            <div class="portfolio-image">
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <button class="btn-view" onclick="viewPortfolio(${index})">Lihat Detail</button>
                    <button class="btn-view" onclick="editPortfolio(${index})" style="background: #10b981; margin-left: 0.5rem;">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="portfolio-tags">
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;
}

// ========== Portfolio Modal ==========
function viewPortfolio(index) {
    const item = portfolioItems[index];
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    
    const tagsHTML = item.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
    const linkHTML = item.link ? `
        <div style="margin-top: 1.5rem;">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: var(--primary-color); color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; transition: var(--transition);">
                <i class="fas fa-external-link-alt"></i> Lihat Proyek
            </a>
        </div>
    ` : '';
    
    modalBody.innerHTML = `
        <h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}" style="width: 100%; border-radius: 8px; margin: 1rem 0;">
        <p style="color: #6b7280; line-height: 1.8; margin-bottom: 1rem;">${item.details}</p>
        <div style="margin-top: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem;">Teknologi yang Digunakan:</h4>
            <div class="tech-stack">${tagsHTML}</div>
        </div>
        ${linkHTML}
    `;
    
    modal.style.display = 'block';
}

// Close modal when clicking the X
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    };
});

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// ========== Add Portfolio Modal ==========
function openAddPortfolioModal() {
    const modal = document.getElementById('addPortfolioModal');
    document.getElementById('modalTitle').textContent = 'Tambah Proyek Baru';
    document.getElementById('submitBtn').textContent = 'Tambah Proyek';
    document.getElementById('editIndex').value = '-1';
    document.getElementById('deleteBtn').style.display = 'none';
    document.getElementById('currentImageText').style.display = 'none';
    document.getElementById('addPortfolioForm').reset();
    modal.style.display = 'block';
}

function editPortfolio(index) {
    const item = portfolioItems[index];
    const modal = document.getElementById('addPortfolioModal');
    
    // Update modal title and button
    document.getElementById('modalTitle').textContent = 'Edit Proyek';
    document.getElementById('submitBtn').textContent = 'Simpan Perubahan';
    document.getElementById('deleteBtn').style.display = 'inline-block';
    document.getElementById('currentImageText').style.display = 'block';
    
    // Fill form with existing data
    document.getElementById('editIndex').value = index;
    document.getElementById('projectTitle').value = item.title;
    document.getElementById('projectDescription').value = item.description;
    document.getElementById('projectDetails').value = item.details;
    document.getElementById('projectTags').value = item.tags.join(', ');
    document.getElementById('projectLink').value = item.link || '';
    
    modal.style.display = 'block';
}

function closeAddPortfolioModal() {
    const modal = document.getElementById('addPortfolioModal');
    modal.style.display = 'none';
    document.getElementById('addPortfolioForm').reset();
}

// Handle Add Portfolio Form Submit
document.getElementById('addPortfolioForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const editIndex = parseInt(document.getElementById('editIndex').value);
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const details = document.getElementById('projectDetails').value;
    const tagsInput = document.getElementById('projectTags').value;
    const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    const link = document.getElementById('projectLink').value;
    const imageFile = document.getElementById('projectImage').files[0];
    
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            if (editIndex >= 0) {
                updatePortfolioItem(editIndex, title, description, details, tags, link, event.target.result);
            } else {
                addNewPortfolioItem(title, description, details, tags, link, event.target.result);
            }
        };
        reader.readAsDataURL(imageFile);
    } else {
        if (editIndex >= 0) {
            // Keep existing image when editing
            const existingImage = portfolioItems[editIndex].image;
            updatePortfolioItem(editIndex, title, description, details, tags, link, existingImage);
        } else {
            addNewPortfolioItem(title, description, details, tags, link, 'assets/portfolio-placeholder.jpg');
        }
    }
});

function addNewPortfolioItem(title, description, details, tags, link, image) {
    const newItem = {
        id: portfolioItems.length + 1,
        title,
        description,
        details,
        tags,
        link,
        image
    };
    
    portfolioItems.push(newItem);
    savePortfolioItems();
    loadPortfolioItems();
    closeAddPortfolioModal();
    
    // Show success message
    showNotification('Proyek berhasil ditambahkan!');
}

function updatePortfolioItem(index, title, description, details, tags, link, image) {
    portfolioItems[index] = {
        id: portfolioItems[index].id,
        title,
        description,
        details,
        tags,
        link,
        image
    };
    
    savePortfolioItems();
    loadPortfolioItems();
    closeAddPortfolioModal();
    
    // Show success message
    showNotification('Proyek berhasil diupdate!');
}

function deletePortfolio() {
    const editIndex = parseInt(document.getElementById('editIndex').value);
    if (editIndex >= 0 && confirm('Apakah Anda yakin ingin menghapus proyek ini?')) {
        portfolioItems.splice(editIndex, 1);
        savePortfolioItems();
        loadPortfolioItems();
        closeAddPortfolioModal();
        showNotification('Proyek berhasil dihapus!');
    }
}

// ========== Notification ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .timeline-item, .portfolio-item, .contact-card');
    animateElements.forEach(el => observer.observe(el));
});

console.log('Portfolio Website Loaded Successfully! 🚀');
