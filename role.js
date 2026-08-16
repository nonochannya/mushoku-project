// DOM Elements
let loadingScreen, startScreen, resultOverlay, resultCardBody;
let loadingBar, loadingPercent;
let playButton, videoPlayer, videoPlayer02, videoPlayer03;
let main, div, div2, div3, div4, div6;
let name, image, image2, image3, gifImage, tryAgainButton;

let loadProgress = 0;
let isLoadingComplete = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Get all DOM elements
  loadingScreen = document.getElementById('loadingScreen');
  startScreen = document.getElementById('startScreen');
  resultOverlay = document.getElementById('resultOverlay');
  resultCardBody = document.getElementById('resultCardBody');
  loadingBar = document.getElementById('loadingBar');
  loadingPercent = document.getElementById('loadingPercent');
  
  playButton = document.getElementById('playButton');
  videoPlayer = document.getElementById('videoPlayer');
  videoPlayer02 = document.getElementById('videoPlayer02');
  videoPlayer03 = document.getElementById('videoPlayer03');
  
  main = document.getElementById('main');
  div = document.querySelector('.F-div');
  div2 = document.querySelector('.S-div');
  div3 = document.querySelector('.T-div');
  div4 = document.querySelector('.five-div');
  div6 = document.querySelector('.sex-div');
  
  // Create elements
  name = document.createElement('h4');
  image = document.createElement('img');
  image2 = document.createElement('img');
  image3 = document.createElement('img');
  gifImage = document.createElement('img');
  tryAgainButton = document.createElement('button');
  
  // Start preloading
  preloadAssets();
});

function updateLoadingProgress() {
  if (isLoadingComplete) return;
  
  // Only increment by small amounts to prevent jumping to 100% too fast
  loadProgress = Math.min(loadProgress + 2, 95);
  if (loadingBar) loadingBar.style.width = loadProgress + '%';
  if (loadingPercent) loadingPercent.textContent = Math.round(loadProgress) + '%';
}

function showStartScreen() {
  isLoadingComplete = true;
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
  if (startScreen) {
    startScreen.style.display = 'flex';
  }
}

function preloadAssets() {
  const assetsToPreload = [
    '696c1346c27df162ecd95129ff4ea552.jpg',
    'nonoIcone.png'
  ];
  
  let actualAssetsLoaded = 0;
  const totalActualAssets = assetsToPreload.length;
  
  assetsToPreload.forEach(src => {
    const img = new Image();
    img.onload = () => {
      actualAssetsLoaded++;
      updateLoadingProgress();
    };
    img.onerror = () => {
      actualAssetsLoaded++;
      updateLoadingProgress();
    };
    img.src = src;
  });
  
  // Simulate additional loading for other assets (more reliable timing)
  const simulationSteps = 20;
  let currentStep = 0;
  const stepSize = 80 / simulationSteps; // Leave room for actual assets
  
  const simulateInterval = setInterval(() => {
    currentStep++;
    loadProgress = Math.min(currentStep * stepSize, 95);
    if (loadingBar) loadingBar.style.width = loadProgress + '%';
    if (loadingPercent) loadingPercent.textContent = Math.round(loadProgress) + '%';
    
    if (currentStep >= simulationSteps) {
      clearInterval(simulateInterval);
      // Force completion after simulation
      setTimeout(() => {
        loadProgress = 100;
        if (loadingBar) loadingBar.style.width = '100%';
        if (loadingPercent) loadingPercent.textContent = '100%';
        setTimeout(showStartScreen, 300);
      }, 200);
    }
  }, 50);
}

function randomWifu() {
  const probabilities = {
      sylphiette: 0.02,
      zenith: 0.01,
      aisha: 0.01,
      ariel: 0.01,
      elinalise: 0.01,
      eris: 0.02,
      ghislaine: 0.02,
      hilda: 0.01,
      juliette: 0.01,
      kishirika: 0.01,
      linia: 0.01,
      nanahoshi: 0.01,
      norn: 0.01,
      pursena: 0.01,
      rokari: 0.01,
      roxy: 0.02,
      suzanne: 0.01,
      lilia: 0.01,
      nina: 0.02, 
      sara: 0.01, 
  };
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (const [wifuName, probability] of Object.entries(probabilities)) {
    cumulativeProbability += probability;
    if (randomNumber < cumulativeProbability) {
      return wifuName;
    }
  }
  return 'roxy'; // fallback
}

function start() {
  if (!startScreen || !videoPlayer) return;
  
  startScreen.style.display = 'none';
  videoPlayer.style.display = 'block';
  videoPlayer.play().catch(err => console.log('Video play error:', err));
}

if (document.getElementById('playButton')) {
  document.getElementById('playButton').addEventListener('click', start);
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const startScreen = document.getElementById('startScreen');
    const resultOverlay = document.getElementById('resultOverlay');
    
    if (startScreen && startScreen.style.display !== 'none') {
      start();
    } else if (resultOverlay && resultOverlay.style.display !== 'none') {
      resetGame();
    }
  }
});

function resetGame() {
  const resultOverlay = document.getElementById('resultOverlay');
  const startScreen = document.getElementById('startScreen');
  const videoPlayer = document.getElementById('videoPlayer');
  const videoPlayer02 = document.getElementById('videoPlayer02');
  const videoPlayer03 = document.getElementById('videoPlayer03');
  
  // Clear result overlay
  if (resultOverlay) resultOverlay.style.display = 'none';
  
  // Remove old elements from their containers
  const div3 = document.querySelector('.T-div');
  const div = document.querySelector('.F-div');
  const div2 = document.querySelector('.S-div');
  const div4 = document.querySelector('.five-div');
  const div6 = document.querySelector('.sex-div');
  const image = document.querySelector('.image');
  const image2 = document.querySelector('.image2');
  const image3 = document.querySelector('.image3');
  const gifImage = document.querySelector('.F-div img');
  const tryAgainButton = document.querySelector('.try-again-button');
  
  if (div3 && image) div3.removeChild(image);
  if (div && gifImage) div.removeChild(gifImage);
  if (tryAgainButton && tryAgainButton.parentNode) tryAgainButton.parentNode.removeChild(tryAgainButton);
  if (div2) {
    const nameEl = div2.querySelector('.wifu-name');
    if (nameEl) div2.removeChild(nameEl);
  }
  if (div4 && image2) div4.removeChild(image2);
  if (div6 && image3) div6.removeChild(image3);

  // Show start screen again
  if (startScreen) startScreen.style.display = 'flex';
  document.body.style.backgroundImage = 'url("696c1346c27df162ecd95129ff4ea552.jpg")';
  
  // Reset videos
  if (videoPlayer02) {
    videoPlayer02.currentTime = 0;
    videoPlayer02.pause();
    videoPlayer02.style.visibility = 'hidden';
    videoPlayer02.style.display = 'none';
  }
  
  if (videoPlayer03) {
    videoPlayer03.currentTime = 0;
    videoPlayer03.pause();
    videoPlayer03.style.visibility = 'hidden';
    videoPlayer03.style.display = 'none';
  }

  if (videoPlayer) {
    videoPlayer.removeEventListener('ended', handleVideoEnd);
    videoPlayer.style.display = 'none';
    videoPlayer.pause();
  }
}

function handleVideoEnd() {
  const videoPlayer = document.getElementById('videoPlayer');
  if (videoPlayer) videoPlayer.style.display = 'none';

  const gg = randomWifu();
  
  // Try different background formats (gif, png, mp4)
  const bgGif = `back-image/back-${gg}.gif`;
  const bgPng = `back-image/back-${gg}.png`;
  const bgMp4 = `back-image/back-${gg}.mp4`;
  
  // Check if background video exists for this character
  if (gg === 'aisha' || gg === 'nina') {
    // These use video backgrounds - handled separately below
  } else {
    // Try gif first, then png
    const bgImage = new Image();
    bgImage.onload = () => {
      document.body.style.backgroundImage = `url("${bgGif}")`;
    };
    bgImage.onerror = () => {
      // Try PNG if GIF doesn't exist
      const bgPngImage = new Image();
      bgPngImage.onload = () => {
        document.body.style.backgroundImage = `url("${bgPng}")`;
      };
      bgPngImage.onerror = () => {
        document.body.style.backgroundImage = 'none';
      };
      bgPngImage.src = bgPng;
    };
    bgImage.src = bgGif;
  }
  document.body.style.backgroundRepeat = 'no-repeat';

  // Get fresh element references
  const div2 = document.querySelector('.S-div');
  const name = document.createElement('h4');
  name.textContent = `${gg}`;
  name.classList.add('wifu-name');
  name.classList.add('animate__animated', 'animate__shakeY', 'animate__infinite');

  // Load images with error handling for missing files
  const image = document.createElement('img');
  loadImage(image, `imag/${gg}/${gg}.png`);
  image.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image');

  const image2 = document.createElement('img');
  loadImage(image2, `imag/${gg}/${gg}2.png`, () => {
    image2.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image2');
  });

  const image3 = document.createElement('img');
  loadImage(image3, `imag/${gg}/${gg}3.png`, () => {
    image3.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image3');
  });

  // Load gif/png with error handling
  const gifImage = document.createElement('img');
  const gifSrc = `gif/${gg}.gif`;
  const pngSrc = `gif/${gg}.png`;
  
  loadImage(gifImage, gifSrc, () => {
    gifImage.style.width = '300px';
    gifImage.style.padding = '0';
    gifImage.style.backgroundRepeat = 'no-repeat';
    gifImage.classList.add('animate__animated', 'animate__fadeInBottomRight');
  }, () => {
    // If gif fails, try png
    loadImage(gifImage, pngSrc, () => {
      gifImage.style.width = '300px';
      gifImage.style.padding = '0';
      gifImage.style.backgroundRepeat = 'no-repeat';
      gifImage.classList.add('animate__animated', 'animate__fadeInBottomRight');
    });
  });

  // Character-specific configurations
  const specialCases = {
    roxy: () => { clearImages([image2, image3]); },
    zenith: () => { clearImages([image2, image3]); },
    juliette: () => { clearImages([image3, gifImage]); },
    suzanne: () => { 
      gifImage.src = `gif/${gg}.png`;
      document.body.style.backgroundImage = `url("back-image/back-${gg}.png")`;
    },
    ariel: () => {
      gifImage.src = `gif/${gg}.png`;
      document.body.style.backgroundImage = `url("back-image/back-${gg}.png")`;
    },
    aisha: () => {
      clearImages([image2, image3, gifImage]);
      document.body.style.backgroundImage = '';
      setupVideoBackground(document.getElementById('videoPlayer02'));
    },
    kishirika: () => { clearImages([image2, image3]); },
    pursena: () => {
      clearImages([image, image3, gifImage]);
      document.body.style.backgroundImage = `url("back-image/back-${gg}.png")`;
    },
    norn: () => { clearImages([gifImage, image3]); },
    eris: () => { clearImages([gifImage, image3]); },
    elinalise: () => { clearImages([gifImage, image3]); },
    rokari: () => { clearImages([gifImage, image3]); },
    nanahoshi: () => { clearImages([image]); },
    linia: () => { clearImages([image3, gifImage]); },
    ghislaine: () => { clearImages([gifImage, image3]); },
    sylphiette: () => { clearImages([image3]); },
    hilda: () => {
      clearImages([image3, gifImage]);
      document.body.style.backgroundImage = `url("back-image/back-${gg}.png")`;
    },
    lilia: () => { clearImages([gifImage, image3, image2]); },
    nina: () => {
      clearImages([image3, gifImage]);
      document.body.style.backgroundImage = '';
      setupVideoBackground(document.getElementById('videoPlayer03'));
    },
    sara: () => {
      clearImages([image3, gifImage]);
      document.body.style.backgroundImage = `url("back-image/back-${gg}.png")`;
    }
  };

  if (specialCases[gg]) {
    specialCases[gg]();
  }

  // Build result card content
  const resultCardBody = document.getElementById('resultCardBody');
  if (resultCardBody) {
    resultCardBody.innerHTML = '';
    if (gifImage.src) resultCardBody.appendChild(gifImage);
    resultCardBody.appendChild(name);
    if (image.src) resultCardBody.appendChild(image);
    if (image2.src) resultCardBody.appendChild(image2);
    if (image3.src) resultCardBody.appendChild(image3);
  }

  // Append to layout divs
  const div = document.querySelector('.F-div');
  const div4 = document.querySelector('.five-div');
  const div6 = document.querySelector('.sex-div');
  const div3 = document.querySelector('.T-div');
  
  if (div) div.appendChild(gifImage);
  if (div2) div2.appendChild(name);
  if (div3) div3.appendChild(image);
  if (div4) div4.appendChild(image2);
  if (div6) div6.appendChild(image3);

  tryAgainButton = document.createElement('button');
  tryAgainButton.textContent = 'Roll Again';
  tryAgainButton.classList.add('try-again-button');
  tryAgainButton.addEventListener('click', resetGame);
  
  // Show result overlay
  const resultOverlay = document.getElementById('resultOverlay');
  if (resultOverlay) {
    resultOverlay.style.display = 'flex';
    document.body.appendChild(tryAgainButton);
  }
}

// Helper function to load images with error handling
function loadImage(imgElement, src, onLoadCallback, onErrorCallback) {
  imgElement.onload = () => {
    if (onLoadCallback) onLoadCallback();
  };
  imgElement.onerror = () => {
    imgElement.src = ''; // Clear broken image
    if (onErrorCallback) onErrorCallback();
  };
  imgElement.src = src;
  imgElement.loading = "lazy";
}

// Helper function to clear multiple images
function clearImages(elements) {
  elements.forEach(el => {
    if (el) el.src = '';
  });
}

// Helper function to setup video background
function setupVideoBackground(videoElement) {
  if (videoElement) {
    videoElement.style.display = 'block';
    videoElement.style.visibility = 'visible';
    videoElement.play().catch(err => console.log('Video play error:', err));
  }
}

const videoPlayer = document.getElementById('videoPlayer');
if (videoPlayer) {
  videoPlayer.addEventListener('ended', handleVideoEnd);
}
