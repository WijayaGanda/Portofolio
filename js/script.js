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
// Data portfolio sudah di-hardcode agar tampil di semua device
let portfolioItems = [
    {
        id: 1,
        title: "Wargaku Surabaya",
        description: "Aplikasi mobile untuk layanan publik warga Surabaya",
        details: "Aplikasi Wargaku Surabaya adalah platform mobile yang memudahkan warga Surabaya dalam mengakses berbagai layanan publik. Aplikasi ini dikembangkan menggunakan Flutter untuk antarmuka mobile yang responsif dan Laravel untuk backend API. Aplikasi ini menyediakan fitur pelaporan masalah kota, informasi layanan pemerintah, dan akses ke berbagai fasilitas publik.",
        tags: ["Flutter", "Dart", "Laravel", "REST API", "MySQL"],
        link: "https://apps.apple.com/id/app/wargaku-surabaya/id6753699265?l=id",
        image: "assets/wargaku.png"
    },
    {
        id: 2,
        title: "Aplikasi Rental Camera",
        description: "Final Project mata kuliah pengembangan aplikasi mobile menggunakan react native",
        details: "Pada final project rentcamera saya dan kelompok saya mengembangkan aplikasi rental kamera yang terhubung dengan firebase dan integrasi API menggunakan react native.",
        tags: ["React Native", "Expo Go", "Firebase", "REST API"],
        link: "https://github.com/WijayaGanda/rentcamera.git",
        image: "assets/rentcamera.png"
    },
    {
        id: 3,
        title: "Sistem Monitoring Kualitas Air lobster Air Tawar Berbasis Mobile",
        description: "Sistem yang memonitor kualitas air berdasarkan sensor IoT",
        details: "Sistem ini menampilkan grafik suhu, ph, do, tds secara realtime sesuai dengan sensor IoT yang sudah dibuat. Aplikasi dan sensor IoT berkomunikasi melalui API dengan interval 2 detik. Hasil dari sensor akan disimpan di database dan diklasifikasi menggunakan algoritma decision tree untuk menentukan kualitas air.",
        tags: ["Flutter", "Dart", "Laravel", "REST API"],
        link: "",
        image: "assets/fullobstermobile.png"
    },
    {
        id: 4,
        title: "Sistem Monitoring Kualitas Air lobster Air Tawar Berbasis Web",
        description: "Sistem yang memonitor kualitas air berdasarkan sensor IoT",
        details: "Sistem ini menampilkan grafik suhu, ph, do, tds secara realtime sesuai dengan sensor IoT yang sudah dibuat. Web dan sensor IoT berkomunikasi melalui API dengan interval 2 detik. Hasil dari sensor akan disimpan di database dan diklasifikasi menggunakan algoritma decision tree untuk menentukan kualitas air.",
        tags: ["Laravel", "MySQL", "JavaScript", "REST API"],
        link: "http://195.88.211.90/~fullobst/dashboard",
        image: "assets/fullobsterweb.png"
    },
    {
        id: 5,
        title: "Sistem Pelayanan Bengkel Berbasis Mobile App (ONGOING)",
        description: "Project ini sedang dalam pengerjaan dan diperuntukkan untuk kebutuhan Skripsi/tugas akhir",
        details: "Project ini merupakan project tugas akhir yang memiliki fitur-fitur untuk menjembatani kebutuhan pelanggan dan juga pihak bengkel yaitu Speedlab Racing. Bengkel ini merupakan bengkel khusus moge > 400 CC.",
        tags: ["Flutter", "Dart", "MongoDB", "REST API", "Express.js"],
        link: "",
        image: "assets/bengkel.png"
    },
];

// Backup: Load from localStorage if available (for future additions)
const savedPortfolio = localStorage.getItem('portfolioItems');
if (savedPortfolio) {
    try {
        const parsed = JSON.parse(savedPortfolio);
        // Merge with hardcoded data, preferring localStorage for images if available
        if (parsed.length > 0) {
            parsed.forEach(item => {
                const existing = portfolioItems.find(p => p.id === item.id);
                if (existing && item.image && item.image.startsWith('data:image')) {
                    // Update image from localStorage if it's base64
                    existing.image = item.image;
                } else if (!existing) {
                    // Add new item if not in hardcoded list
                    portfolioItems.push(item);
                }
            });
        }
    } catch (e) {
        console.error('Error parsing portfolio data:', e);
    }
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

// ========== Download Portfolio as PDF ==========
function downloadPortfolioPDF() {
    // Show loading notification
    showNotification('Membuat PDF... Mohon tunggu');
    
    // Create PDF content
    const pdfContent = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #2563eb; padding-bottom: 20px;">
                <h1 style="color: #2563eb; font-size: 32px; margin: 0 0 10px 0;">Wijaya Ganda Prasetyo</h1>
                <h2 style="color: #6b7280; font-size: 18px; margin: 0 0 15px 0; font-weight: normal;">Mobile & Full-Stack Developer</h2>
                <p style="color: #1f2937; font-size: 14px; margin: 0;">📧 wijayaganda879@gmail.com | 📱 081818455048 | 📍 Surabaya, Indonesia</p>
            </div>
            
            <!-- About -->
            <div style="margin-bottom: 35px;">
                <h3 style="color: #2563eb; font-size: 20px; margin: 0 0 15px 0; border-left: 4px solid #2563eb; padding-left: 12px;">Tentang Saya</h3>
                <p style="color: #4b5563; font-size: 13px; line-height: 1.8; margin: 0; text-align: justify;">Saya adalah seorang Mobile & Full-Stack Developer yang passionate dalam menciptakan aplikasi mobile yang berkualitas tinggi. Dengan spesialisasi dalam Flutter dan Dart untuk mobile development, serta keahlian dalam web development dan backend menggunakan Laravel dan Express.js, saya berkomitmen untuk menghadirkan solusi teknologi end-to-end yang dapat meningkatkan pengalaman pengguna.</p>
            </div>
            
            <!-- Skills -->
            <div style="margin-bottom: 35px;">
                <h3 style="color: #2563eb; font-size: 20px; margin: 0 0 15px 0; border-left: 4px solid #2563eb; padding-left: 12px;">Keahlian</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #2563eb;">
                        <strong style="color: #1f2937; font-size: 14px; display: block; margin-bottom: 5px;">🚀 Flutter & Dart</strong>
                        <span style="color: #6b7280; font-size: 12px;">Mobile development cross-platform</span>
                    </div>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #2563eb;">
                        <strong style="color: #1f2937; font-size: 14px; display: block; margin-bottom: 5px;">💻 Web Development</strong>
                        <span style="color: #6b7280; font-size: 12px;">HTML, CSS, JavaScript</span>
                    </div>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #2563eb;">
                        <strong style="color: #1f2937; font-size: 14px; display: block; margin-bottom: 5px;">🔧 Laravel Backend</strong>
                        <span style="color: #6b7280; font-size: 12px;">REST API & Backend sistem (PHP)</span>
                    </div>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 3px solid #2563eb;">
                        <strong style="color: #1f2937; font-size: 14px; display: block; margin-bottom: 5px;">⚙️ Express.js</strong>
                        <span style="color: #6b7280; font-size: 12px;">Node.js server-side development</span>
                    </div>
                </div>
            </div>
            
            <!-- Experience -->
            <div style="margin-bottom: 35px;">
                <h3 style="color: #2563eb; font-size: 20px; margin: 0 0 15px 0; border-left: 4px solid #2563eb; padding-left: 12px;">Pengalaman</h3>
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 3px solid #10b981;">
                    <div style="margin-bottom: 10px;">
                        <strong style="color: #1f2937; font-size: 15px; display: block;">Mobile Developer Intern</strong>
                        <span style="color: #2563eb; font-size: 13px; display: block; margin-top: 3px;">Aplikasi Wargaku Surabaya - Magang</span>
                    </div>
                    <p style="color: #4b5563; font-size: 12px; line-height: 1.7; margin: 10px 0; text-align: justify;">Berkontribusi dalam pengembangan aplikasi Wargaku Surabaya, sebuah aplikasi mobile untuk memudahkan warga Surabaya dalam mengakses layanan publik dan informasi kota.</p>
                    <ul style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 10px 0; padding-left: 20px;">
                        <li>Pengembangan fitur-fitur aplikasi mobile</li>
                        <li>Implementasi UI/UX design yang user-friendly</li>
                        <li>Integrasi dengan backend API</li>
                        <li>Testing dan debugging aplikasi</li>
                    </ul>
                    <div style="margin-top: 12px;">
                        <span style="background: white; color: #2563eb; padding: 4px 12px; border-radius: 12px; font-size: 11px; display: inline-block; margin-right: 6px; border: 1px solid #2563eb;">Flutter</span>
                        <span style="background: white; color: #2563eb; padding: 4px 12px; border-radius: 12px; font-size: 11px; display: inline-block; margin-right: 6px; border: 1px solid #2563eb;">Dart</span>
                        <span style="background: white; color: #2563eb; padding: 4px 12px; border-radius: 12px; font-size: 11px; display: inline-block; margin-right: 6px; border: 1px solid #2563eb;">Laravel</span>
                        <span style="background: white; color: #2563eb; padding: 4px 12px; border-radius: 12px; font-size: 11px; display: inline-block; margin-right: 6px; border: 1px solid #2563eb;">REST API</span>
                    </div>
                </div>
            </div>
            
            <!-- Portfolio -->
            <div style="margin-bottom: 35px;">
                <h3 style="color: #2563eb; font-size: 20px; margin: 0 0 15px 0; border-left: 4px solid #2563eb; padding-left: 12px;">Portofolio</h3>
                ${portfolioItems.map(item => `
                    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 3px solid #3b82f6; page-break-inside: avoid;">
                        ${item.image ? `
                            <div style="margin-bottom: 15px; text-align: center;">
                                <img src="${item.image}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-height: 300px; object-fit: cover;" />
                            </div>
                        ` : ''}
                        <strong style="color: #1f2937; font-size: 15px; display: block; margin-bottom: 8px;">${item.title}</strong>
                        <p style="color: #4b5563; font-size: 12px; line-height: 1.7; margin: 0 0 10px 0; text-align: justify;">${item.details || item.description}</p>
                        ${item.link ? `<p style="color: #2563eb; font-size: 11px; margin: 8px 0 0 0;">🔗 Link: ${item.link}</p>` : ''}
                        <div style="margin-top: 12px;">
                            ${item.tags.map(tag => `<span style="background: white; color: #2563eb; padding: 4px 12px; border-radius: 12px; font-size: 11px; display: inline-block; margin-right: 6px; margin-bottom: 4px; border: 1px solid #2563eb;">${tag}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Social Links -->
            <div style="margin-top: 35px; text-align: center; border-top: 2px solid #e5e7eb; padding-top: 25px;">
                <h3 style="color: #2563eb; font-size: 16px; margin: 0 0 15px 0;">Hubungi Saya</h3>
                <div style="color: #6b7280; font-size: 12px; line-height: 1.8;">
                    <p style="margin: 5px 0;">🔗 LinkedIn: linkedin.com/in/wijaya-ganda-prasetyo-9a4402358</p>
                    <p style="margin: 5px 0;">💻 GitHub: github.com/WijayaGanda</p>
                    <p style="margin: 5px 0;">📷 Instagram: @wijayaganda_7</p>
                </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 11px; margin: 0;">© 2026 Wijaya Ganda Prasetyo. All rights reserved.</p>
                <p style="color: #9ca3af; font-size: 10px; margin: 5px 0 0 0;">Generated on ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
        </div>
    `;
    
    // Create temporary element
    const element = document.createElement('div');
    element.innerHTML = pdfContent;
    
    // PDF options
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `Portfolio_Wijaya_Ganda_Prasetyo_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate PDF
    html2pdf().set(opt).from(element).save().then(() => {
        showNotification('✅ PDF berhasil didownload!');
    }).catch(err => {
        console.error('Error generating PDF:', err);
        showNotification('❌ Terjadi kesalahan saat membuat PDF');
    });
    
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
