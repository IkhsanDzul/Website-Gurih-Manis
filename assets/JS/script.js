const flavors = ['Coklat', 'Vanila', 'Stroberi', 'Keju', 'Green Tea', 'Kacang', 'Mesis Coklat', 'Tiramisu', 'Almond'];
    let maxFlavors = 0;
    let selectedPackage = '';
    let selectedFlavors = {};
    let selectedDonutType = '';
    let risolCount = 0;

// Fungsi untuk membuka modal dan menampilkan rasa berdasarkan paket
function openModal(packageName, max) {
  selectedPackage = packageName;
  maxFlavors = max;
  selectedFlavors = {}; // Reset pilihan rasa
  selectedDonutType = ''; // Reset jenis donat
  document.getElementById('selectedPackage').textContent = `Paket yang dipilih: ${selectedPackage} (Maksimal ${maxFlavors} rasa)`;
  const container = document.getElementById('flavor-container');
  container.innerHTML = '';

  // Generate daftar rasa dengan input jumlah
  flavors.forEach(flavor => {
    const flavorRow = document.createElement('div');
    flavorRow.className = 'd-flex justify-content-between align-items-center mb-2';
    flavorRow.innerHTML = `
      <label>${flavor}</label>
      <input type="number" class="form-control flavor-input" style="width: 70px;" min="0" max="${maxFlavors}" 
             onchange="updateFlavor('${flavor}', this.value)">
    `;
    container.appendChild(flavorRow);
  });
}

// Fungsi untuk memperbarui jumlah rasa yang dipilih
function updateFlavor(flavor, quantity) {
  quantity = parseInt(quantity) || 0; // Ubah ke angka, default 0 jika tidak valid
  selectedFlavors[flavor] = quantity;

  // Hitung total rasa yang dipilih
  const totalSelected = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);

  // Validasi total rasa
  if (totalSelected > maxFlavors) {
    document.getElementById('warning').style.display = 'block';
    selectedFlavors[flavor] = 0; // Reset jika melebihi batas
    document.querySelectorAll('.flavor-input').forEach(input => {
      if (input.parentNode.textContent.trim() === flavor) input.value = 0;
    });
  } else {
    document.getElementById('warning').style.display = 'none';
  }
}

// Fungsi untuk membuat template WhatsApp
function generateWhatsAppTemplate() {
  const totalSelected = Object.values(selectedFlavors).reduce((a, b) => a + b, 0);
  if (totalSelected !== maxFlavors) {
    alert(`Anda harus memilih total ${maxFlavors} rasa!`);
    return;
  }

  // Validasi jenis donat
  const selectedType = document.querySelector('input[name="donutType"]:checked');
  if (!selectedType) {
    alert('Anda harus memilih jenis donat!');
    return;
  }
  selectedDonutType = selectedType.value;

  let message = `Saya mau memesan *${selectedPackage}* *${selectedDonutType}* dengan rasa :\n`;
  for (const [flavor, quantity] of Object.entries(selectedFlavors)) {
    if (quantity > 0) message += `- ${flavor}: ${quantity} pcs\n`;
  }

  const whatsappURL = `https://wa.me/6289512543086?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

function generateRisolWhatsApp() {
  if (risolCount <= 0) {
    alert('Anda harus memilih minimal 1 risol!');
    return;
  }

  const message = `Saya mau memesan risol sebanyak ${risolCount} pcs.`;
  const whatsappURL = `https://wa.me/6289512543086?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

function updateRisol(amount) {
  risolCount = Math.max(0, risolCount + amount);
  document.getElementById('risolCount').textContent = risolCount;
}