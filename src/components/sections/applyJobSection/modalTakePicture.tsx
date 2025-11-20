import { Button } from '@/components/ui/button';
import WebCamGesture, {
  HAND_CONNECTIONS,
  Landmark,
} from '@/components/webCampGesture';
import { ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';

const ModalTakePicture = ({
  isOpen,
  setIsOpen,
  capturedImage,
  setCapturedImage,
  handleSubmitCapture,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  capturedImage: any;
  setCapturedImage: Dispatch<SetStateAction<string | null>>;
  handleSubmitCapture: (file: File | null) => void;
}) => {
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [isRetakePicture, setIsRetakePicture] = useState(false);
  const [tempCapturedImage, setTempCapturedImage] = useState(capturedImage);

  const handleCapture = (imageData: { img: string; file: File }) => {
    setTempCapturedImage(imageData.img);
    setCapturedFile(imageData.file);
  };

  const retakePicture = () => {
    setTempCapturedImage(null);
    setIsRetakePicture(true);
  };

  const handleClose = () => {
    retakePicture();
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setCapturedImage(tempCapturedImage);
    handleSubmitCapture(capturedFile);
    retakePicture();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white  mx-5 overflow-hidden relative w-[637px] p-[24px] max-w-full rounded-lg min-h-[40vh]  '>
            <div className='font-bold text-[18px]'>
              Raise Your Hand to Capture{' '}
            </div>
            <div className='text-[14px]'>
              We’ll take the photo once your hand pose is detected.
            </div>
            <X
              className='absolute right-7 top-7 cursor-pointer'
              onClick={handleClose}
            />

            <div className='my-4'>
              {!tempCapturedImage && (
                <WebCamGesture
                  width={640}
                  height={480}
                  countdownTime={3}
                  onCapture={handleCapture}
                  isTriggerReset={isRetakePicture}
                  onResetComplete={() => setIsRetakePicture(false)}
                />
              )}

              {tempCapturedImage && (
                <img
                  src={tempCapturedImage}
                  alt='captured'
                  width={640}
                  height={480}
                  style={{ borderRadius: 8 }}
                />
              )}
            </div>

            <div className='text-[12px] mb-4'>
              To take a picture, follow the hand poses in the order shown below.
              The system will automatically capture the image once the final
              pose is detected.
            </div>

            {!capturedImage && (
              <div className='flex gap-3 my-6 w-full justify-center items-center'>
                <Image
                  src={'/img/Open-Camera1.png'}
                  width={57.255435943603516}
                  height={57.255435943603516}
                  alt={''}
                />
                <ChevronRight />
                <Image
                  src={'/img/Open-Camera2.png'}
                  width={57.255435943603516}
                  height={57.255435943603516}
                  alt={''}
                />
                <ChevronRight />

                <Image
                  src={'/img/Open-Camera3.png'}
                  width={57.255435943603516}
                  height={57.255435943603516}
                  alt={''}
                />
              </div>
            )}

            {tempCapturedImage && (
              <div className='flex gap-3 mx-auto justify-center'>
                <Button
                  variant='outline'
                  onClick={retakePicture}
                >
                  Retake Photo
                </Button>
                <Button
                  variant='primary'
                  className='rounded-[8px]'
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalTakePicture;

// Custom Gesture Detection (misalnya deteksi gesture tertentu)
const customDetectGesture = (lm: Landmark[]): any => {
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
    return 'satu';
  if (
    fingers.index &&
    fingers.middle &&
    !fingers.ring &&
    !fingers.pinky &&
    !fingers.thumb
  )
    return 'dua';
  if (
    fingers.index &&
    fingers.middle &&
    fingers.ring &&
    !fingers.pinky &&
    !fingers.thumb
  )
    return 'tiga';

  return null;
};

// Custom Drawing Function
const customDrawHandInfo = (
  lm: Landmark[],
  pose: number,
  canvas: HTMLCanvasElement
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Custom logic for drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!lm || lm.length === 0) return;

  HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
    const start = lm[startIdx];
    const end = lm[endIdx];
    ctx.beginPath();
    ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
    ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
    ctx.strokeStyle = 'purple'; // Custom color
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  lm.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x * canvas.width, point.y * canvas.height, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow'; // Custom point color
    ctx.fill();
  });
};

{
  /* <WebCamGesture
        width={640}
        height={480}
        onCapture={(imageData) => setCapturedImage(imageData.img)}
        onDetectGesture={customDetectGesture} // Fungsi deteksi gesture kustom
        onDrawHandInfo={customDrawHandInfo} // Fungsi menggambar informasi tangan kustom
        customGestureSequence={['satu', 'dua', 'tiga']} // Urutan gesture kustom
        keyCustomGestureSequence='string'
      /> */
}
