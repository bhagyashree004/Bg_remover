const imageUpload = document.getElementById('image-upload');
const uploadedImage = document.getElementById('uploaded-image');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const removeBackgroundBtn = document.getElementById('remove-background');
const outputImage = document.getElementById('output-image');

imageUpload.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(readerEvent) {
    const image = new Image();
    image.onload = function() {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      uploadedImage.src = readerEvent.target.result;
    };
    image.src = readerEvent.target.result;
  };

  reader.readAsDataURL(file);
});

removeBackgroundBtn.addEventListener('click', function() {
  // Process the image and remove the background
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const { data, width, height } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    // Adjust the condition to customize the background removal algorithm
    if (data[i] > 100 && data[i + 1] > 100 && data[i + 2] > 100) {
      data[i + 3] = 0; // Set alpha channel to 0 for transparent pixels
    }
  }
  ctx.putImageData(imageData, 0, 0);
  outputImage.src = canvas.toDataURL();
});
