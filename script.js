/* ==========================================================================
   LOGIKA UTAMA WEBSITE & AUDIO XII.4
   ========================================================================== */

// 1. Fungsi Mengontrol Menu Hamburger (Buka-Tutup)
function toggleMenu() {
    var menu = document.getElementById("menuLinks");
    var toggle = document.querySelector(".menu-toggle");
    
    if (menu && toggle) {
        menu.classList.toggle("active");
        toggle.classList.toggle("active");
    }
}

// 2. Fungsi Tombol Welcome Screen & Mengaktifkan Musik
function bukaWebsiteDanMusik() {
    var audio = document.getElementById("laguKelas");
    var welcome = document.getElementById("welcome-screen");
    
    // Putar musik secara otomatis lewat pancingan klik user
    if (audio) {
        audio.play().then(function() {
            localStorage.setItem("musikBerjalan", "true");
        }).catch(function(error) {
            console.log("Browser memblokir autoplay, mencoba metode cadangan...", error);
            audio.muted = false;
            audio.play();
            localStorage.setItem("musikBerjalan", "true");
        });
    }

    // Animasi menghilangkan Welcome Screen secara halus
    if (welcome) {
        welcome.style.opacity = "0";
        setTimeout(function() { 
            welcome.style.display = "none"; 
        }, 400); // Hilang total dalam 0.4 detik
    }
}

// 3. Menjaga Musik Tetap Menyala Saat Pindah Halaman
document.addEventListener("DOMContentLoaded", function() {
    var audio = document.getElementById("laguKelas");
    var welcome = document.getElementById("welcome-screen");

    // Jika user sudah klik "Buka Kenangan" sebelumnya, welcome screen tidak muncul lagi
    if (localStorage.getItem("musikBerjalan") === "true") {
        if (welcome) {
            welcome.style.display = "none";
        }
        // Lanjutkan putar musik di halaman baru jika sempat terhenti
        if (audio && audio.paused) {
            audio.play().catch(function(e) {
                console.log("Gagal melanjutkan musik otomatis:", e);
            });
        }
    }
});
