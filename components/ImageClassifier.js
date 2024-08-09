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
      const predictions = await model.classify(imageRef.current);
      setPrediction(predictions[0].className);
    }
  };

  // Handle image file input
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      classifyImage();
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
