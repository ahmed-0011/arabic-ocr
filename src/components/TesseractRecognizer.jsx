import React, { useState, useEffect } from "react";
import { createWorker } from "tesseract.js";
import ExtractedText from "./ExtractedText";
import ExampleImage from "../assets/example.png";

const TesseractRecognizer = React.forwardRef(
    ({ imageFile, isCurrentlyRecognizing, onRecognitionComplete }, ref) => {
        const [recognitionResult, setRecognitionResult] = useState({
            status: false,
            text: ""
        });

        useEffect(() => {
            const updateProgress = ({ progress, status }) => {
                if (ref.current) {
                    const recognitionProgress = ref.current;
                    recognitionProgress.style.display = "flex";
                    const [statusEl, progressEl] =
                        recognitionProgress.querySelectorAll("span, progress");
                    statusEl.innerHTML = status;
                    progressEl.value = progress;
                }
            };

            const worker = createWorker({
                logger: data => {
                    updateProgress(data);
                },
                errorHandler: err => {
                    if (ref.current) {
                        ref.current.style.display = "none";
                    }

                    setRecognitionResult({ status: "failed", text: "" });
                    console.log(err);
                }
            });

            (async () => {
                try {
                    await worker.load();
                    await worker.loadLanguage("ara");
                    await worker.initialize("ara");
                    const {
                        data: { text }
                    } = await worker.recognize(imageFile ?? ExampleImage);

                    if (ref.current) {
                        ref.current.style.display = "none";
                    }
                    setRecognitionResult({ status: "succeed", text });

                    await worker.terminate();
                } catch (err) {
                    console.log(err);
                } finally {
                    onRecognitionComplete();
                }
            })();
        }, [imageFile]);

        return (
            <ExtractedText
                isCurrentlyRecognizing={isCurrentlyRecognizing}
                recognitionResult={recognitionResult}
            />
        );
    }
);

TesseractRecognizer.displayName = "TesseractRecognizer";

export default TesseractRecognizer;
