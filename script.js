                            document.addEventListener("DOMContentLoaded", () => {

                            const bgm = document.getElementById("bgm");
                            bgm.volume = 0.2; // volume 40%


                                            (function () {
                                    const fab = document.getElementById('fab');
                                    const menu = document.getElementById('fabMenu');
                                    let isOpen = false;

                                    function openMenu() {
                                        menu.classList.add('open');
                                        fab.setAttribute('aria-expanded', 'true');
                                        menu.setAttribute('aria-hidden', 'false');
                                        isOpen = true;
                                        // focus first item for keyboard navigation
                                        const first = menu.querySelector('.fab-item');
                                        if (first) first.focus();
                                    }

                                    function closeMenu() {
                                        menu.classList.remove('open');
                                        fab.setAttribute('aria-expanded', 'false');
                                        menu.setAttribute('aria-hidden', 'true');
                                        isOpen = false;
                                        fab.focus();
                                    }

                                    function toggleMenu() {
                                        isOpen ? closeMenu() : openMenu();
                                    }

                                    fab.addEventListener('click', function (e) {
                                        e.stopPropagation();
                                        toggleMenu();
                                    });

                                    // keyboard support: open by Enter/Space when fab focused
                                    fab.addEventListener('keydown', function (e) {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        toggleMenu();
                                        } else if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        openMenu();
                                        }
                                    });

                                    // close on Escape
                                    document.addEventListener('keydown', function (e) {
                                        if (e.key === 'Escape' && isOpen) closeMenu();
                                    });

                                    // close when clicking outside
                                    document.addEventListener('click', function (e) {
                                        if (!menu.contains(e.target) && e.target !== fab && isOpen) closeMenu();
                                    });

                                    // handle menu item clicks
                                    menu.addEventListener('click', function (e) {
                                        const btn = e.target.closest('.fab-item');
                                        if (!btn) return;
                                        const action = btn.getAttribute('data-action');
                                        handleAction(action);
                                    });

                                    // handle keyboard navigation inside menu
                                    menu.addEventListener('keydown', function (e) {
                                        const items = Array.from(menu.querySelectorAll('.fab-item'));
                                        const idx = items.indexOf(document.activeElement);
                                        if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        const next = items[(idx + 1) % items.length];
                                        next.focus();
                                        } else if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        const prev = items[(idx - 1 + items.length) % items.length];
                                        prev.focus();
                                        } else if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        document.activeElement.click();
                                        }
                                    });

        // Action handlers
        function handleAction(action) {
            switch(action) {
            // case 'buy':
                // ganti link berikut dengan link pembelianmu
                // window.open('https://linktr.ee/gamesspeedshopp', '_blank');
                // closeMenu();
                // break;

            case 'wa':
                // open mailto (ganti email)
                window.location.href = 'https://linktr.ee/gamesspeedshopp';
                break;

            case 'music':
                // kontrol audio jika ada <audio id="bgm">
                const audio = document.getElementById('bgm');
                if (audio) {
                if (audio.paused) {
                    audio.volume = audio.volume || 0.5;
                    audio.play().catch(()=>{ /* auto-play blocked */ });
                } else {
                    audio.pause();
                }
                } else {
                // fallback: notifikasi singkat
                flashFeedback('Audio tidak ditemukan');
                }
                break;

            case 'saluran':
                // open mailto (ganti email)
                window.location.href = 'https://www.whatsapp.com/channel/0029VailYTWL7UVbHGSsjM2B';
                break;

            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeMenu();
                break;

            default:
                closeMenu();
            }
        }

                                    // small visual feedback in case needed
                                    function flashFeedback(text) {
                                        const el = document.createElement('div');
                                        el.textContent = text;
                                        Object.assign(el.style, {
                                        position: 'fixed',
                                        right: '18px',
                                        bottom: '90px',
                                        background: 'rgba(0,0,0,0.6)',
                                        color: '#fff',
                                        padding: '8px 12px',
                                        borderRadius: '8px',
                                        zIndex: 10000,
                                        fontSize: '13px',
                                        opacity: 0,
                                        transition: 'opacity .18s ease'
                                        });
                                        document.body.appendChild(el);
                                        requestAnimationFrame(()=> el.style.opacity = 1);
                                        setTimeout(()=> {
                                        el.style.opacity = 0;
                                        setTimeout(()=> el.remove(), 220);
                                        }, 1400);
                                    }

                                            })();


                                    const canvas = document.getElementById("particles");
                                    const ctx = canvas.getContext("2d");

                                    let particles = [];

                                    function resizeCanvas() {
                                        canvas.width = window.innerWidth;
                                        canvas.height = window.innerHeight;
                                    }
                                    resizeCanvas();
                                    window.onresize = resizeCanvas;

                                    class Particle {
                                        constructor() {
                                            this.reset();
                                        }

                                reset() {
                                    this.x = Math.random() * canvas.width;
                                    this.y = canvas.height + Math.random() * 100;
                                    this.size = Math.random() * 3 + 1;
                                    this.speedY = Math.random() * 1 + 0.5;
                                    this.speedX = (Math.random() - 0.5) * 0.4;
                                    this.alpha = Math.random() * 0.6 + 0.4;
                                    this.color = `rgba(170, 0, 255, ${this.alpha})`; // ungu neon
                                }

                                update() {
                                    this.x += this.speedX;
                                    this.y -= this.speedY;

                                    if (this.y < -50) {
                                        this.reset();
                                    }
                                }

                                draw() {
                                    ctx.beginPath();
                                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                                    ctx.shadowBlur = 15;
                                    ctx.shadowColor = "rgba(200, 80, 255, 0.9)";
                                    ctx.fillStyle = this.color;
                                    ctx.fill();
                                }
                            }

                                    function initParticles() {
                                        particles = [];
                                        for (let i = 0; i < 120; i++) {
                                            particles.push(new Particle());
                                        }
                                    }

                                    function animate() {
                                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                                        particles.forEach(particle => {
                                            particle.update();
                                            particle.draw();
                                        });
                                        requestAnimationFrame(animate);
                                    }

                                    initParticles();
                                    animate();




                                        // =========================
                                        // PROTEKSI KONTEN WEBSITE
                                        // =========================

                                        // Cegah klik kanan
                                        document.addEventListener("contextmenu", e => e.preventDefault());

                                        // Cegah klik + tahan di HP
                                        document.addEventListener("touchstart", e => {
                                            if (e.touches.length > 1) e.preventDefault();
                                        }, {passive: false});

                                        // Cegah drag (ambil gambar/teks)
                                        document.addEventListener("dragstart", e => e.preventDefault());

                                        // Cegah select teks
                                        document.addEventListener("selectstart", e => e.preventDefault());

                                        // Cegah copy / cut / paste
                                        ["copy", "cut", "paste"].forEach(evt => {
                                            document.addEventListener(evt, e => e.preventDefault());
                                        });

                                        // Cegah shortcut keyboard
                                        document.addEventListener("keydown", function(e) {
                                            // F12
                                            if (e.key === "F12") return e.preventDefault();

                                            // Ctrl+Shift+I/J/C
                                            if (e.ctrlKey && e.shiftKey) {
                                                if (["I","J","C"].includes(e.key.toUpperCase()))
                                                    return e.preventDefault();
                                            }

                                            // Ctrl+U (view-source)
                                            if (e.ctrlKey && e.key.toLowerCase() === "u")
                                                return e.preventDefault();

                                            // Ctrl+S (save halaman)
                                            if (e.ctrlKey && e.key.toLowerCase() === "s")
                                                return e.preventDefault();
                                        });

                                    (function () {
                                    // cegah klik kanan
                                    document.addEventListener('contextmenu', function (e) {
                                        e.preventDefault();
                                    }, { capture: true });

                                    // cegah select/drag/copy/paste/cut
                                    document.addEventListener('selectstart', function (e) { e.preventDefault(); }, { capture: true });
                                    document.addEventListener('dragstart', function (e) { e.preventDefault(); }, { capture: true });
                                    document.addEventListener('copy', function (e) { e.preventDefault(); }, { capture: true });
                                    document.addEventListener('cut', function (e) { e.preventDefault(); }, { capture: true });
                                    document.addEventListener('paste', function (e) { e.preventDefault(); }, { capture: true });

                                    // cegah beberapa shortcut keyboard umum (view-source, devtools, save)
                                    document.addEventListener('keydown', function (e) {
                                        // F12
                                        if (e.key === 'F12') {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return false;
                                        }

                                        // Ctrl/Meta + Shift + I / J / C  (devtools)
                                        if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
                                        const blockKeys = ['I','J','C'];
                                        if (blockKeys.includes(e.key.toUpperCase())) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            return false;
                                        }
                                        }

                                        // Ctrl/Meta + U (view-source), Ctrl+S (save)
                                        if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.key === 's' || e.key === 'S')) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        return false;
                                        }
                                    }, { capture: true });

                                    // cegah long-press context menu di mobile (beberapa browser)
                                    document.addEventListener('touchstart', function (e) {
                                        if (e.touches && e.touches.length > 1) {
                                        e.preventDefault();
                                        }
                                    }, { passive: false });

                                    // restore bila elemen ditambahkan dinamis (mutation observer)
                                    const observer = new MutationObserver(function(muts){
                                        muts.forEach(function(m){
                                        if (m.addedNodes && m.addedNodes.length) {
                                            // pastikan listener tetap aktif (tidak wajib, tapi aman)
                                        }
                                        });
                                    });
                                    observer.observe(document.documentElement || document, { childList: true, subtree: true });

                                    // Minimal UX notice (opsional): tampilkan toast atau console message
                                    console.log('Proteksi klik-kanan aktif — ingat ini bukan proteksi 100% (client-side only).');
                                    })();

                                    });

                                    // ================= PREMIUM LOADING SCRIPT =================
                                    window.addEventListener("load", () => {
                                        const loader = document.getElementById("loading");

                                        // sedikit delay biar elegan
                                        setTimeout(() => {
                                            loader.style.opacity = "0";

                                            // Setelah animasi hilang selesai
                                            setTimeout(() => {
                                                loader.remove(); // lebih bersih daripada display:none
                                            }, 800); // match dengan CSS transition
                                        }, 700); // waktu sebelum fade-out mulai
                                    });



window.addEventListener("load", function() {
    // Tandai pertama kali load
    if (!sessionStorage.getItem("loadedBefore")) {
        sessionStorage.setItem("loadedBefore", "true");
    }
});

// Fungsi menampilkan popup loading profesional
function showLoadingPopup(message = "Halaman diperbarui otomatis...") {
    // Cek apakah popup sudah ada
    if (document.getElementById("auto-refresh-popup")) return;

    const popup = document.createElement("div");
    popup.id = "auto-refresh-popup";
    popup.style.position = "fixed";
    popup.style.top = 0;
    popup.style.left = 0;
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.background = "rgba(0,0,0,0.85)";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";
    popup.style.zIndex = 9999;

    // Konten popup
    popup.innerHTML = `
        <div class="loader"></div>
        <p style="color: #fff; font-size: 1.2rem; margin-top: 20px;">${message}</p>
    `;
    document.body.appendChild(popup);

    // Tambahkan style loader
    const style = document.createElement("style");
    style.innerHTML = `
    .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #4a00ff;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`;
    document.head.appendChild(style);
}

// Fungsi refresh halaman dengan delay
function refreshPageWithPopup() {
    showLoadingPopup();
    setTimeout(function() {
        location.reload();
    }, 2000); // refresh setelah 2 detik
}

// Event detect user kembali ke tab
document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === "visible") {
        refreshPageWithPopup();
    }
});

(function () {
    // Cek apakah sudah pernah refresh di sesi ini
    if (sessionStorage.getItem('alreadyRefreshed')) return;

    // Fungsi refresh 1x
    function refreshOnce() {
        sessionStorage.setItem('alreadyRefreshed', 'true');
        location.reload();
    }

    // Tangkap SEMUA klik di halaman
    document.addEventListener('click', refreshOnce, { once: true });

    // Opsional: tangkap sentuhan di HP
    document.addEventListener('touchstart', refreshOnce, { once: true });
})();
