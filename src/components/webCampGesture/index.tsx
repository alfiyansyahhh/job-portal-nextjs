'use client';

import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {
  HandLandmarker,
  FilesetResolver,
  HandLandmarkerResult,
} from '@mediapipe/tasks-vision';

export type Landmark = { x: number; y: number; z?: number };

export const HAND_CONNECTIONS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [6, 7],
  [7, 8],
  [0, 9],
  [9, 10],
  [10, 11],
  [11, 12],
  [0, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [0, 17],
  [17, 18],
  [18, 19],
  [19, 20],
];

type WebCamGestureProps = {
  width?: number;
  height?: number;
  countdownTime?: number;
  onCapture: (imageData: { img: string; file: File }) => void;
  isTriggerReset?: boolean; // Menambahkan properti isTriggerReset untuk meng-trigger reset
  onResetComplete?: () => void; // Optional callback setelah reset selesai
  onDetectGesture?: (lm: Landmark[]) => number; // Custom gesture detection function
  onDrawHandInfo?: (
    lm: Landmark[],
    pose: number,
    canvas: HTMLCanvasElement
  ) => void; // Custom draw function
  customGestureSequence?: any[]; // Menambahkan properti customGestureSequence
  keyCustomGestureSequence?: 'string' | 'number';
  withLine?: boolean;
};

export default function WebCamGesture({
  width = 640,
  height = 480,
  countdownTime = 3,
  onCapture,
  isTriggerReset = false, // Default is false
  onResetComplete,
  onDetectGesture,
  onDrawHandInfo,
  customGestureSequence = [1, 2, 3], // Default urutan gesture 1-2-3
  keyCustomGestureSequence = 'number',
  withLine = false,
}: WebCamGestureProps) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
    null
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gestureSequence, setGestureSequence] = useState<number[]>([]);

  useEffect(() => {
    if (isTriggerReset) {
      retakePicture();
      setGestureSequence([]);
      if (onResetComplete) {
        onResetComplete();
      }
    }
  }, [isTriggerReset, onResetComplete]);

  const videoConstraints = {
    width,
    height,
    facingMode: 'user',
  };

  // Initialize model
  useEffect(() => {
    const initModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      );

      const model = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });

      setHandLandmarker(model);
    };

    initModel();
  }, []);

  // Fungsi deteksi default
  const defaultDetectGesture = (lm: Landmark[]): any => {
    if (!lm || lm.length < 21) return 0;
    const isRightHand = lm[17].x < lm[5].x;
    const fingers = {
      thumb: isRightHand ? lm[4].x > lm[3].x : lm[4].x < lm[3].x,
      index: lm[8].y < lm[6].y,
      middle: lm[12].y < lm[10].y,
      ring: lm[16].y < lm[14].y,
      pinky: lm[20].y < lm[18].y,
    };

    if (
      fingers.index &&
      !fingers.middle &&
      !fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 1;
    if (
      fingers.index &&
      fingers.middle &&
      !fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 2;
    if (
      fingers.index &&
      fingers.middle &&
      fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 3;
    return null;
  };

  // Gunakan fungsi deteksi gesture yang diteruskan, jika ada
  const detectPose = onDetectGesture ? onDetectGesture : defaultDetectGesture;

  const drawHandInfo = (lm: Landmark[], pose: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Jika fungsi custom onDrawHandInfo ada, gunakan itu
    if (onDrawHandInfo) {
      onDrawHandInfo(lm, pose, canvas); // Panggil fungsi custom
    } else {
      // Logika default untuk menggambar tangan
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!lm || lm.length === 0) return;

      const offsetX = -45; // offset yang kamu pakai

      // Garis hijau (connections)
      {
        withLine &&
          HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
            const start = lm[startIdx];
            const end = lm[endIdx];

            ctx.beginPath();
            ctx.moveTo(
              start.x * canvas.width + offsetX,
              start.y * canvas.height
            );
            ctx.lineTo(end.x * canvas.width + offsetX, end.y * canvas.height);

            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2;
            ctx.stroke();
          });
      }
      {
        withLine &&
          // Titik merah (landmarks)
          lm.forEach((point) => {
            ctx.beginPath();
            ctx.arc(
              point.x * canvas.width + offsetX, // tambahkan offset!
              point.y * canvas.height,
              5,
              0,
              2 * Math.PI
            );
            ctx.fillStyle = 'red';
            ctx.fill();
          });
      }

      // Bounding box
      const xs = lm.map((p) => p.x * canvas.width);
      const ys = lm.map((p) => p.y * canvas.height);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
      const centerY = (minY + maxY) / 2;
      const boxWidth = 280;
      const boxHeight = maxY - minY + 40;
      const boxX = centerX - boxWidth / 2;
      const boxY = centerY - boxHeight / 2;

      const boxColor = pose > 0 ? '#008343' : '#E11428';
      ctx.beginPath();
      ctx.rect(boxX, boxY, boxWidth, boxHeight);
      ctx.strokeStyle = boxColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Pose text
      const fontSize = 14;
      ctx.font = `${fontSize}px Arial`;
      const text = pose > 0 ? `Pose: ${pose}` : 'Undetected';
      const textPadding = 6;
      const textWidth = ctx.measureText(text).width;
      const textHeight = fontSize;
      const bgX = boxX - 1;
      const bgY = boxY - textHeight - textPadding * 1.5 - 4;
      const bgWidth = textWidth + textPadding * 2;
      const bgHeight = textHeight + textPadding * 2;

      ctx.fillStyle = boxColor;
      ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
      ctx.strokeStyle = boxColor;
      ctx.strokeRect(bgX, bgY, bgWidth, bgHeight);
      ctx.fillStyle = 'white';
      ctx.textBaseline = 'top';
      ctx.fillText(text, bgX + textPadding, bgY + textPadding);
    }
  };

  useEffect(() => {
    if (!handLandmarker || !webcamRef.current?.video || capturedImage) return;

    let animationFrameId: number;

    const detectHands = async () => {
      const video = webcamRef.current?.video;
      if (!video || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(detectHands);
        return;
      }

      const result: HandLandmarkerResult = handLandmarker.detectForVideo(
        video,
        performance.now()
      );

      if (result.landmarks && result.landmarks.length > 0) {
        const pose = detectPose(result.landmarks[0]);
        drawHandInfo(result.landmarks[0], pose);

        if (!isDetecting) {
          if (keyCustomGestureSequence === 'number') {
            // === cegah pose duplikat dalam sequence ===
            let newSequence = gestureSequence;
            if (pose && !gestureSequence.includes(pose)) {
              newSequence = [...gestureSequence, pose];
            }

            // === logic original tapi cek duplikasi ===
            if (pose && !gestureSequence.includes(pose)) {
              setGestureSequence(newSequence);

              if (newSequence.join('') === customGestureSequence.join('')) {
                startCountdown();
              }
            } else if (!pose) {
              newSequence = [1];
              setGestureSequence([1]);
            }
          }

          if (keyCustomGestureSequence === 'string') {
            const lastPoseIndex = customGestureSequence.indexOf(
              gestureSequence[gestureSequence.length - 1]
            );

            let newSequence = [...gestureSequence, pose];

            if (
              lastPoseIndex !== -1 &&
              customGestureSequence[lastPoseIndex + 1] === pose
            ) {
              setGestureSequence(newSequence);

              if (newSequence.join('') === customGestureSequence.join('')) {
                startCountdown();
              }
            } else {
              if (pose === customGestureSequence[0]) {
                newSequence = [customGestureSequence[0]];
                setGestureSequence([customGestureSequence[0]]);
              }
            }
          }
        }
      } else {
        canvasRef.current?.getContext('2d')?.clearRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(detectHands);
    };

    detectHands();

    return () => cancelAnimationFrame(animationFrameId);
  }, [handLandmarker, isDetecting, gestureSequence, capturedImage]);

  const startCountdown = () => {
    setIsDetecting(true);
    let counter = countdownTime;
    setCountdown(counter);
    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takePicture();
        setGestureSequence([]);
        setIsDetecting(false);
      }
    }, 1000);
  };

  const takePicture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      const file = dataURLToFile(imageSrc, 'gesture_capture.png');
      onCapture({ img: imageSrc, file });
    }
  };

  const dataURLToFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setGestureSequence([]);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/png'
        videoConstraints={videoConstraints}
        width={width}
        height={height}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />
      {countdown !== null && (
        <div
          className='absolute inset-0 flex flex-col items-center justify-center text-white text-3xl font-bold'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderRadius: 8,
          }}
        >
          <div>Capturing photo in</div>
          <div>{countdown}</div>
        </div>
      )}
    </div>
  );
}
