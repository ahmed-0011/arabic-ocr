import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as Clipboard } from "../assets/clipboard.svg";

const Container = styled.div`
    display: grid;
    grid-template-columns: 15% auto;
    @media (min-width: 600px) {
        width: 40%;
    }
`;

const Textarea = styled.textarea`
    grid-area: 1 / 1 / -1 / -1;
    width: 100%;
    min-height: 250px;
    padding: 3.3em 1em 1em;
    font-family: "Tajawal", sans-serif;
    font-size: 1rem;
    font-weight: 700;
    resize: none;

    @media (min-width: 600px) {
        min-height: 400px;
        font-size: 1.2rem;
    }
`;

const ClipboardButton = styled.button`
    grid-area: 1 / 1 / span 1 / span 1;
    justify-self: start;
    align-self: start;
    padding: 0.9em;
    margin-top: 0.5em;
    margin-right: 0.5em;
    border: none;
    font-size: 0.8rem;
    font-weight: 700;
    background-color: #e1e1e1;
    border-radius: 5px;
    line-height: 0;
    cursor: pointer;
`;

const ExtractedText = ({ recognitionResult, isCurrentlyRecognizing }) => {
    const [text, setText] = useState("");
    const [isTextCopied, setIsTextCopied] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (isCurrentlyRecognizing) {
            setText("");
        }
    }, [isCurrentlyRecognizing]);

    useEffect(() => {
        ref.current.focus();
        setText(recognitionResult.text);
    }, [recognitionResult]);

    return (
        <Container>
            <Textarea
                ref={ref}
                placeholder={isCurrentlyRecognizing ? "جارٍ التعرف..." : null}
                value={text}
                readOnly={isCurrentlyRecognizing}
                spellCheck="false"
                onChange={e => {
                    setText(e.target.value);
                }}
            ></Textarea>
            <ClipboardButton
                onClick={() => {
                    navigator.clipboard.writeText(text);
                    setIsTextCopied(true);
                    setTimeout(() => {
                        setIsTextCopied(false);
                    }, 2000);
                }}
            >
                {isTextCopied ? "Copied" : <Clipboard />}
            </ClipboardButton>
        </Container>
    );
};

export default ExtractedText;
