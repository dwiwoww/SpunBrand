const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
  });
});

const toast = document.getElementById('toast');
let toastTimer;
document.querySelectorAll('.quick-add').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    toast.textContent = `${product} dipilih. Hubungi kami untuk cek harga dan pemesanan.`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
    const message = encodeURIComponent(`Halo SpunBrand, saya tertarik dengan ${product}. Mohon info harga dan cara pemesanannya.`);
    setTimeout(() => { window.open(`https://wa.me/6281316705180?text=${message}`, '_blank', 'noopener'); }, 450);
  });
});

const modal = document.getElementById('shippingModal');
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
document.getElementById('shippingBtn').addEventListener('click', () => {
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
});
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
