// Loading screen logic
const loadingScreen = document.getElementById('loadingScreen');
const startScreen = document.getElementById('startScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingPercent = document.getElementById('loadingPercent');

let loadProgress = 0;
const totalAssetsToLoad = 50; // Estimate of assets to preload
let loadedAssets = 0;

function updateLoadingProgress() {
  loadedAssets++;
  loadProgress = Math.min((loadedAssets / totalAssetsToLoad) * 100, 100);
  loadingBar.style.width = loadProgress + '%';
  loadingPercent.textContent = Math.round(loadProgress) + '%';
  
  if (loadProgress >= 100) {
    setTimeout(showStartScreen, 500);
  }
}

function showStartScreen() {
  loadingScreen.style.display = 'none';
  startScreen.style.display = 'flex';
}

// Preload critical assets
function preloadAssets() {
  const assetsToPreload = [
    '696c1346c27df162ecd95129ff4ea552.jpg',
    'nonoIcone.png',
    'Untitled video - Made with Clipchamp.mp4'
  ];
  
  assetsToPreload.forEach(src => {
    const img = new Image();
    img.onload = updateLoadingProgress;
    img.onerror = updateLoadingProgress;
    img.src = src;
  });
  
  // Simulate additional loading for other assets
  let simulatedLoads = 0;
  const simulateInterval = setInterval(() => {
    simulatedLoads += 5;
    updateLoadingProgress();
    if (simulatedLoads >= 47) {
      clearInterval(simulateInterval);
    }
  }, 100);
}

// Start preloading when page loads
window.addEventListener('load', preloadAssets);

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
      suzanne:0.01,
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

const playButton = document.getElementById('playButton');
const videoPlayer = document.getElementById('videoPlayer');
const resultOverlay = document.getElementById('resultOverlay');
const resultCardBody = document.getElementById('resultCardBody');

function start(){
  startScreen.style.display = 'none';
  videoPlayer.style.display = 'block';
  videoPlayer.play();
};

playButton.addEventListener('click', start);

document.body.addEventListener('keydown',(event) => {
  if(event.key === 'Enter' && startScreen.style.display !== 'none'){
   start();
  };
});

const main = document.getElementById("myElement");
const div = document.querySelector('.F-div');
const div2 = document.querySelector('.S-div');
const div3 = document.querySelector('.T-div');
const div4 =  document.querySelector('.five-div');
const div6 =  document.querySelector('.sex-div');
const name = document.createElement('h4');
const image = document.createElement('img');
const image2 = document.createElement('img');
const image3 = document.createElement('img');
const gifImage = document.createElement('img');
const tryAgainButton = document.createElement('button');
const videoPlayer02 = document.getElementById('videoPlayer02');
const videoPlayer03 = document.getElementById('videoPlayer03');
  
function resetGame() {
    // Clear result overlay
    resultOverlay.style.display = 'none';
    
    // Remove old elements from their containers
    if(div3.contains(image)) div3.removeChild(image);
    if(div.contains(gifImage)) div.removeChild(gifImage);
    if(document.body.contains(tryAgainButton)) document.body.removeChild(tryAgainButton);
    if(div2.contains(name)) div2.removeChild(name);
    if(div4.contains(image2)) div4.removeChild(image2);
    if(div6.contains(image3)) div6.removeChild(image3);

    // Show start screen again
    startScreen.style.display = 'flex';
    document.body.style.backgroundImage = 'url("696c1346c27df162ecd95129ff4ea552.jpg")';
    
    // Reset videos
    videoPlayer02.currentTime = 0;
    videoPlayer02.pause();
    videoPlayer02.style.visibility = 'hidden';
    videoPlayer02.style.display = 'none';
    
    videoPlayer03.currentTime = 0;
    videoPlayer03.pause();
    videoPlayer03.style.visibility = 'hidden';
    videoPlayer03.style.display = 'none';

    videoPlayer.removeEventListener('ended', handleVideoEnd);
    videoPlayer.style.display = 'none';
    videoPlayer.pause();
  };


function handleVideoEnd(){
  
    videoPlayer.style.display = 'none';

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
  
    name.textContent = `${gg}`;
    name.classList.add('wifu-name');
    name.classList.add('animate__animated', 'animate__shakeY','animate__infinite' );
  
    // Load images with error handling for missing files
    loadImage(image, `imag/${gg}/${gg}.png`);
    image.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image');

    loadImage(image2, `imag/${gg}/${gg}2.png`, () => {
      image2.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image2');
    });

    loadImage(image3, `imag/${gg}/${gg}3.png`, () => {
      image3.classList.add('animate__animated', 'animate__fadeInBottomRight', 'image3');
    });

    // Load gif/png with error handling
    const gifSrc = `gif/${gg}.gif`;
    const pngSrc = `gif/${gg}.png`;
    loadImage(gifImage, gifSrc, null, () => {
      // If gif fails, try png
      loadImage(gifImage, pngSrc, () => {
        gifImage.style.width = '300px';
        gifImage.style.padding = '0';
        gifImage.style.backgroundRepeat = 'no-repeat';
        gifImage.classList.add('animate__animated', 'animate__fadeInBottomRight');
      });
    });
    gifImage.style.width = '300px';
    gifImage.style.padding = '0';
    gifImage.style.backgroundRepeat = 'no-repeat';
    gifImage.classList.add('animate__animated', 'animate__fadeInBottomRight');

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
        setupVideoBackground(videoPlayer02);
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
        setupVideoBackground(videoPlayer03);
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
    resultCardBody.innerHTML = '';
    resultCardBody.appendChild(gifImage);
    resultCardBody.appendChild(name);
    resultCardBody.appendChild(image);
    if (image2.src) resultCardBody.appendChild(image2);
    if (image3.src) resultCardBody.appendChild(image3);

    div.appendChild(gifImage);
    div2.appendChild(name);
    div3.appendChild(image);
    div4.appendChild(image2);
    div6.appendChild(image3);

    tryAgainButton.textContent = 'Roll Again';
    tryAgainButton.classList.add('try-again-button');
    tryAgainButton.addEventListener('click',resetGame);
    
    // Show result overlay
    resultOverlay.style.display = 'flex';
    document.body.appendChild(tryAgainButton);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {resetGame()}});

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
  videoElement.style.display = 'block';
  videoElement.style.visibility = 'visible';
  videoElement.play();
}

videoPlayer.addEventListener('ended', handleVideoEnd);
