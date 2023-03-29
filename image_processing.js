// Import relevant functions and variables from caption handling file
import { handleCaptionText } from './caption_processing.js';

// Create canvas and get 2D context
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Create image element for template
const template = new Image();
template.src = 'template.png';

// When the template image is loaded, set canvas dimensions, draw template, and display result
template.onload = function () {
  canvas.width = template.width;
  canvas.height = template.height;
  ctx.drawImage(template, 0, 0);
  const resultContainer = document.getElementById('result-container');
  const resultImg = document.createElement('img');
  resultImg.src = canvas.toDataURL('image/jpeg');
  resultContainer.appendChild(resultImg);

  // Add event listener to confirm button
  const confirmButton = document.getElementById('confirm-button');
  confirmButton.addEventListener('click', function () {
    // Clear canvas and draw template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0);

    // Get caption text and image input
    const captionInput = document.getElementById('caption-input');
    const imageInput = document.getElementById('image-input');

    // Create image element for selected picture
    const picture = new Image();
    picture.src = URL.createObjectURL(imageInput.files[0]);

    // When the picture image is loaded, draw it on the canvas, save result, and display/download
    picture.onload = function () {
      ctx.drawImage(picture, 0, 0, picture.width, picture.height, 29, 83, 616, 596);

      // Add caption
      handleCaptionText(ctx, template, picture, captionInput.value);

      const done = new Image();
      done.src = canvas.toDataURL('image/jpeg');
      done.onload = function () {
        resultImg.src = done.src;
        const downloadBtn = document.createElement('button');
        downloadBtn.innerText = 'Download Image';

        // Add event listener to download button to create link and trigger download
        downloadBtn.addEventListener('click', function () {
          const link = document.createElement('a');
          link.download = 'done.jpg';
          link.href = done.src;
          link.click();
        });
        resultContainer.appendChild(downloadBtn);
      }
    }
  });
};

// Export relevant functions and variables for caption handling file
export { canvas, ctx, template };