// Function to handle caption text
export function handleCaptionText(ctx, template, customImage) {

  // Clear canvas and draw template
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(template, 0, 0);

  // Draw the custom image
  ctx.drawImage(customImage, 0, 0, customImage.width, customImage.height, 29, 83, 616, 596);

  // Draw the gray box
  ctx.fillStyle = 'rgba(128, 128, 128, 0.5)';
  ctx.fillRect(0, 825, 540 * 2, 72 * 2);

  // Write the caption inside the gray box
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';

  // Get user input for caption text
  const captionInput = document.getElementById('caption-input');
  const captionText = captionInput.value;

  // Get user input for font size
  const fontSizeInput = document.getElementById('font-size-input');
  let fontSize = parseFloat(fontSizeInput.value);

  if (isNaN(fontSize)) {
    // Use default font size if input is not a valid number
    fontSize = 32;
  }

  // Check if the caption is not empty
  if (captionText.trim() !== '') {

    // Check if the caption exceeds the width of the gray box
    const captionWidth = ctx.measureText(captionText).width;
    const boxWidth = 550 * 2;
    const boxHeight = 72 * 2;
    let lines = [captionText];
    if (captionWidth > boxWidth) {
      lines = [];
      let words = captionText.split(' ');
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < boxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
    }

    // Write the lines of the caption
    let y = 825 + 40;
    while (fontSize > 30) {
      ctx.font = `${fontSize}px sans-serif`;
      let textHeight = 0;
      lines.forEach((line) => {
        textHeight += fontSize + 10;
      });
      if (textHeight < boxHeight) {
        break;
      }
      fontSize -= 1;
    }
    lines.forEach((line) => {
      // Add black border
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2.5;
      ctx.strokeText(line, boxWidth / 2, y);
      // Add yellow fill
      ctx.fillStyle = 'yellow';
      ctx.fillText(line, boxWidth / 2, y);
      y += fontSize + 10;
    });
  }
}