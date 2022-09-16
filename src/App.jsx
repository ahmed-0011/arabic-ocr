import React, { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import TesseractRecognizer from "./components/TesseractRecognizer";

const ref = React.createRef();
function App() {
    const [imageFile, setImageFile] = useState();
    const [isCurrentlyRecognizing, setIsCurrentlyRecognizing] = useState(true);

    return (
        <div className="App">
            <ImageUploader
                ref={ref}
                isCurrentlyRecognizing={isCurrentlyRecognizing}
                onImageUpload={image => {
                    setIsCurrentlyRecognizing(true);
                    setImageFile(image);
                }}
            />
            <TesseractRecognizer
                ref={ref}
                isCurrentlyRecognizing={isCurrentlyRecognizing}
                onRecognitionComplete={() => {
                    setIsCurrentlyRecognizing(false);
                }}
                imageFile={imageFile}
            />
        </div>
    );
}

export default App;
