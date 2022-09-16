import React, { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
    @media (min-width: 600px) {
        width: 50%;
    }
`;

const FileUploader = styled.div`
    position: relative;
    background-color: #e5e5f7;
    background-image: radial-gradient(#784f68 0.6px, #6cc1d0 0.6px);
    background-size: 10px 10px;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40vh;
    padding: 1em;
    border-radius: 5px;
    cursor: pointer;
    outline: 2px dashed #784f68;
    outline-offset: -7px;
    pointer-events: ${props =>
        props.isCurrentlyRecognizing ? "none" : "auto"};

    @media (min-width: 600px) {
        min-height: 400px;
    }
`;

const FileUploaderText = styled.span`
    padding: 8px;
    font-size: 1.1rem;
    font-weight: 500;
    background-color: #6cc1d0;
    color: #784f68;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
`;

const SupportedFormatsText = styled.p`
    margin: 0;
    padding: 0.5em 0.5em 0;
    font-size: 0.7rem;
    opacity: 0.5;
`;

const FileInput = styled.input`
    display: none;
`;

const ProgressOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(244, 0, 0, 0.1);
    border-radius: 5px;
    backdrop-filter: blur(2px);
`;

const Progress = styled.progress`
    direction: ltr;
`;

const ImageUploader = React.forwardRef(
    ({ onImageUpload, isCurrentlyRecognizing }, ref) => {
        const [imageName, setImageName] = useState("إضغط هنا لرفع الصورة");
        const fileInputRef = useRef();

        return (
            <Container>
                <FileUploader
                    isCurrentlyRecognizing={
                        fileInputRef.current && isCurrentlyRecognizing
                    }
                    onClick={() => fileInputRef.current.click()}
                >
                    <FileUploaderText>{imageName}</FileUploaderText>
                    {"إضغط هنا لرفع الصورة" === imageName ? null : (
                        <ProgressOverlay ref={ref}>
                            <span></span>
                            <Progress value={0} max={1}></Progress>
                        </ProgressOverlay>
                    )}
                </FileUploader>
                <SupportedFormatsText>
                    إمتدادات الصور المسموحة هي: bmp ، .pbm ، .jpg ، .png.
                </SupportedFormatsText>

                <FileInput
                    type="file"
                    name=""
                    id=""
                    accept="image/png, image/jpeg"
                    ref={fileInputRef}
                    onChange={e => {
                        const file = e.target.files[0];
                        setImageName(file.name);
                        onImageUpload(file);

                        /**
                         * reset FileInput's value to null to allow the user to select
                         * the same file in chrome browser.
                         * (in chrome the onChange event won't be called if you select the same file)
                         */
                        e.target.value = null;
                    }}
                ></FileInput>
            </Container>
        );
    }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
