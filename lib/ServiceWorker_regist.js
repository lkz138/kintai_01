// Service Worker 登録
localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ServiceWorker', JSON.stringify({token: ''}) );
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('ServiceWorker.js').then(function(registration) {
    localStorage.setItem( (btoa(location.href)).slice(0, 16) + '.ServiceWorker', JSON.stringify({token: registration.scope}) );
  }).catch(function(err) {
    console.error('ServiceWorker registration failed. ');
    console.error(err);
  });
} else {
  if (location.protocol != 'https:') {
    console.error('ServiceWorker registration failed. Not supported on http.');
  } else {
    console.error('ServiceWorker registration failed. Not supported on this browser.');
  }
}
