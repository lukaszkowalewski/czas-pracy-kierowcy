let totalMinutes = 0;
const totalEl = document.getElementById('total');
const historyEl = document.getElementById('history');

function addTime() {
  const hours = parseInt(document.getElementById('hours').value) || 0;
  const minutes = parseInt(document.getElementById('minutes').value) || 0;
  const added = hours * 60 + minutes;
  totalMinutes += added;

  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  totalEl.textContent = `${h}h ${m}m`;

  const li = document.createElement('li');
  li.textContent = `+ ${hours}h ${minutes}m`;
  historyEl.appendChild(li);
}

// Service Worker rejestracja
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js');
  });
}
