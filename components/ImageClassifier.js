import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { load } from '@tensorflow-models/mobilenet';

const ImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const imageRef = useRef(null);

  // Load MobileNet model
  const loadModel = async () => {
    const loadedModel = await load();
    setModel(loadedModel);
  };

  // Predict image
  const classifyImage = async () => {
    if (model && imageRef.current) {
      const img = imageRef.current;
      const predictions = await model.classify(img);
      setPrediction(predictions[0].className + ' (' + (predictions[0].probability * 100).toFixed(2) + '%)');
    }
  };

  // Handle image file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      // Trigger a new image classification after image is loaded
      setTimeout(classifyImage, 100); // Delay to ensure image is rendered
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    loadModel();
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt="Upload"
            ref={imageRef}
            style={{ width: '300px', height: 'auto' }}
          />
          <h3>Prediction: {prediction}</h3>
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;

