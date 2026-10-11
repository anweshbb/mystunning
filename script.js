
/* Interactive Website Runtime Script */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Accordion Toggles
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const body = parent.querySelector('.accordion-body');
      const icon = header.querySelector('.accordion-icon');
      if (body) {
        const isHidden = body.style.display === 'none' || !body.style.display;
        body.style.display = isHidden ? 'block' : 'none';
        if (icon) {
          icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // 2. Tab Navigation
  document.querySelectorAll('.builder-tabs').forEach(tabContainer => {
    const btns = tabContainer.querySelectorAll('.tab-btn');
    const panes = tabContainer.querySelectorAll('.tab-pane');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        btns.forEach(b => {
          b.style.background = 'transparent';
          b.style.color = '#94a3b8';
        });
        btn.style.background = '#3b82f6';
        btn.style.color = '#ffffff';

        panes.forEach(pane => {
          pane.style.display = pane.getAttribute('data-tab-content') === target ? 'block' : 'none';
        });
      });
    });
  });

  // 3. Countdown Timers
  document.querySelectorAll('.builder-countdown').forEach(cd => {
    const targetDateStr = cd.getAttribute('data-target') || '2026-12-31T23:59:59';
    const targetTime = new Date(targetDateStr).getTime();

    function updateCd() {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      const dEl = cd.querySelector('.cd-days');
      const hEl = cd.querySelector('.cd-hours');
      const mEl = cd.querySelector('.cd-mins');
      const sEl = cd.querySelector('.cd-secs');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }

    updateCd();
    setInterval(updateCd, 1000);
  });

  // 4. Typewriter Effect
  document.querySelectorAll('.typewriter-target').forEach(el => {
    const rawWords = el.getAttribute('data-words');
    if (!rawWords) return;
    try {
      const words = JSON.parse(rawWords);
      let wordIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function typeLoop() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
          charIdx--;
          el.textContent = currentWord.substring(0, charIdx);
        } else {
          charIdx++;
          el.textContent = currentWord.substring(0, charIdx);
        }

        let speed = isDeleting ? 40 : 100;
        if (!isDeleting && charIdx === currentWord.length) {
          speed = 2000; // Pause at end of word
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          speed = 500;
        }
        setTimeout(typeLoop, speed);
      }
      typeLoop();
    } catch(e) { console.error(e); }
  });

  // 5. Add to Cart helper & Toast
  window.addToCartNotification = function(title) {
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(b => {
      const current = parseInt(b.textContent || '0', 10);
      b.textContent = current + 1;
    });

    const toast = document.createElement('div');
    toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; background: #1e293b; border: 1px solid #3b82f6; color: #fff; padding: 12px 20px; border-radius: 8px; font-family: Inter, sans-serif; font-size: 14px; font-weight: 500; box-shadow: 0 10px 25px rgba(0,0,0,0.5); z-index: 999999; display: flex; align-items: center; gap: 10px; animation: toastSlideIn 0.3s ease;';
    toast.innerHTML = '<span style="color:#22c55e;">✓</span> Added ' + (title || 'Item') + ' to cart!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };
});
