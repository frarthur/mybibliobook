"use client";

import { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";


export default function IsbnScanner({ onDetected }: { onDetected: (isbn: string) => void }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    if (!scanning) return;
    codeReader.current = new BrowserMultiFormatReader();
    let active = true;
    codeReader.current
      .decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, err) => {
          if (!active) return;
          if (result) {
            onDetected(result.getText());
            setScanning(false);
            setError("");
            controlsRef.current?.stop();
          } else if (err && !(err instanceof NotFoundException)) {
            setError("Erreur de scan : " + err.message);
          }
        }
      )
      .then((controls) => {
        controlsRef.current = controls;
      });
    return () => {
      active = false;
      controlsRef.current?.stop();
    };
    // eslint-disable-next-line
  }, [scanning]);

  return (
    <div className="my-4">
      {scanning ? (
        <div className="flex flex-col gap-2 items-center">
          <video ref={videoRef} className="rounded border w-64 h-48 bg-black" autoPlay muted />
          <button type="button" className="btn btn-outline" onClick={() => setScanning(false)}>
            Annuler
          </button>
        </div>
      ) : (
        <button className="btn btn-secondary" onClick={() => setScanning(true)}>
          Scanner ISBN (caméra)
        </button>
      )}
      {error && <div className="alert alert-error mt-2">{error}</div>}
    </div>
  );
}
