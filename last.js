const FONTS = [
    'Impact',
    'Arial',
    'Comic Sans MS',
    'Helvetica',
    'Poppins',
    'Times New Roman'
];

const FONT_SIZES = [
    { value: '32', label: 'Small' },
    { value: '48', label: 'Medium' },
    { value: '64', label: 'Large' },
    { value: '80', label: 'Extra Large' }
];

const TEMPLATES = [
    { src: 'https://i.imgflip.com/4/24y43o.jpg', alt: 'Change My Mind' },
    { src: 'https://i.imgflip.com/4/9au02y.jpg', alt: 'Chill Guy' },
    { src: 'https://i.imgflip.com/1g8my4.jpg', alt: 'Two Buttons' },
    { src: 'https://i.imgflip.com/261o3j.jpg', alt: 'Buff Doge vs. Cheems' },
    { src: 'https://i.imgflip.com/3lmzyx.jpg', alt: 'Disappointed Black Guy' },
    { src: 'https://i.imgflip.com/4/43a45p.jpg', alt: 'Buff Doge vs. Cheems' },
    { src: 'https://i.imgflip.com/4t0m5.jpg', alt: 'Evil Kermit' },
    { src: 'https://i.imgflip.com/9vct.jpg', alt: 'Jack Sparrow Being Chased' },
    { src: 'https://i.imgflip.com/28j0te.jpg', alt: 'Doge' },
    { src: 'https://i.imgflip.com/1h7in3.jpg', alt: 'Rolling Eyes' },
    { src: 'https://i.imgflip.com/2wifvo.jpg', alt: 'Unsettled Tom' },
    { src: 'https://i.imgflip.com/1e7ql7.jpg', alt: 'Evil Kermit' },
    { src: 'https://i.imgflip.com/4/22bdq6.jpg', alt: 'Left Exit 12 Off Ramp' },
    { src: 'https://i.imgflip.com/4/1ur9b0.jpg', alt: 'Distracted Boyfriend' },
    { src: 'https://i.imgflip.com/4/3oevdk.jpg', alt: 'Bernie I Am Once Again Asking For Your Support' },
    { src: 'https://i.imgflip.com/1bij.jpg', alt: 'One Does Not Simply' },
    { src: 'https://i.imgflip.com/4/23ls.jpg', alt: 'Disaster Girl' },
    { src: 'https://i.imgflip.com/4/26jxvz.jpg', alt: 'Gru Plan' },
    { src: 'https://i.imgflip.com/4/9ehk.jpg', alt: 'Batman slapping robin' },
    { src: 'https://i.imgflip.com/30b1gx.jpg', alt: 'Drake' },
    { src: 'https://i.imgflip.com/4/1bhk.jpg', alt: 'Success Kid' },
    { src: 'https://i.imgflip.com/4/1b42wl.jpg', alt: 'Bike Fail' },
    { src: 'https://i.imgflip.com/4/1wz1x.jpg', alt: 'This Is Where Id Put My Trophy If I Had One' }
];

const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const imageInput = document.getElementById('imageInput');
const downloadBtn = document.getElementById('downloadBtn');
const topFont = document.getElementById('topFont');
const bottomFont = document.getElementById('bottomFont');
const topColor = document.getElementById('topColor');
const bottomColor = document.getElementById('bottomColor');
const topSize = document.getElementById('topSize');
const bottomSize = document.getElementById('bottomSize');
const canvasSection = document.getElementById('canvasSection');

canvas.width = 600;
canvas.height = 600;
let currentImage = null;

function initializeSelects() {
    [topFont, bottomFont].forEach(select => {
        FONTS.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            select.appendChild(option);
        });
    });

    [topSize, bottomSize].forEach(select => {
        FONT_SIZES.forEach(size => {
            const option = document.createElement('option');
            option.value = size.value;
            option.textContent = size.label;
            select.appendChild(option);
        });
    });
}

function initializeTemplates() {
    const templatesContainer = document.querySelector('.meme-templates');
    templatesContainer.innerHTML = '';

    TEMPLATES.forEach(template => {
        const img = document.createElement('img');
        img.src = template.src;
        img.alt = template.alt;
        img.className = 'template';
        img.crossOrigin = 'anonymous';
        templatesContainer.appendChild(img);

        img.addEventListener('click', () => {
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.onload = () => {
                currentImage = newImg;
                drawMeme();
                scrollToCanvas();
            };
            newImg.src = template.src;
        });
    });
}

imageInput.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            currentImage = img;
            drawMeme();
            scrollToCanvas();
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

function scrollToCanvas() {
    canvasSection.scrollIntoView({ behavior: 'smooth' });
}

function drawMeme() {
    if (!currentImage) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ratio = Math.min(canvas.width / currentImage.width, canvas.height / currentImage.height);
    const newWidth = currentImage.width * ratio;
    const newHeight = currentImage.height * ratio;
    const x = (canvas.width - newWidth) / 2;
    const y = (canvas.height - newHeight) / 2;

    ctx.drawImage(currentImage, x, y, newWidth, newHeight);

    drawText(topTextInput.value.toUpperCase(), canvas.width / 2, 40, {
        font: topFont.value,
        size: topSize.value,
        color: topColor.value,
        isBottom: false
    });

    drawText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 40, {
        font: bottomFont.value,
        size: bottomSize.value,
        color: bottomColor.value,
        isBottom: true
    });
}

function drawText(text, x, y, options) {
    if (!text) return;

    const { font, size, color, isBottom } = options;
    ctx.font = `bold ${size}px ${font}`;
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.textBaseline = isBottom ? 'bottom' : 'top';

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}

function addWatermark() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.textAlign = 'right';
    ctx.fillText('@Meme-O-Magic', canvas.width - 10, canvas.height - 10);
}

downloadBtn.addEventListener('click', function () {
    if (!currentImage) {
        alert('Please select an image first!');
        return;
    }

    addWatermark();

    try {
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (error) {
        alert('Unable to download. Please try again.');
    }

    drawMeme();
});

[topTextInput, bottomTextInput, topFont, bottomFont, topColor, bottomColor, topSize, bottomSize].forEach(input => {
    input.addEventListener('input', drawMeme);
});

const IMAGES_TO_SHOW_ON_MOBILE = 3;

function initializeMobileTemplates() {
    const templatesContainer = document.querySelector('.meme-templates');
    templatesContainer.innerHTML = '';

    const isMobile = window.matchMedia('only screen and (max-width: 768px)').matches;
    const imagesToShow = isMobile ? TEMPLATES.slice(0, IMAGES_TO_SHOW_ON_MOBILE) : TEMPLATES;

    imagesToShow.forEach(template => {
        const img = document.createElement('img');
        img.src = template.src;
        img.alt = template.alt;
        img.className = 'template';
        img.crossOrigin = 'anonymous';
        templatesContainer.appendChild(img);

        img.addEventListener('click', () => {
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.onload = () => {
                currentImage = newImg;
                drawMeme();
                scrollToCanvas();
            };
            newImg.src = template.src;
        });
    });

    if (isMobile) {
        const viewAllButton = document.createElement('button');
        viewAllButton.textContent = 'View All Images';
        viewAllButton.className = 'view-all-btn';
        templatesContainer.appendChild(viewAllButton);

        viewAllButton.addEventListener('click', () => {
            showAllImages();
        });
    }
}

function showAllImages() {
    const templatesContainer = document.querySelector('.meme-templates');
    templatesContainer.innerHTML = '';

    TEMPLATES.forEach(template => {
        const img = document.createElement('img');
        img.src = template.src;
        img.alt = template.alt;
        img.className = 'template';
        img.crossOrigin = 'anonymous';
        templatesContainer.appendChild(img);

        img.addEventListener('click', () => {
            const newImg = new Image();
            newImg.crossOrigin = 'anonymous';
            newImg.onload = () => {
                currentImage = newImg;
                drawMeme();
                scrollToCanvas();
            };
            newImg.src = template.src;
        });
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'close-btn';
    templatesContainer.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        initializeMobileTemplates();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSelects();
    initializeTemplates();
    initializeMobileTemplates();
});
