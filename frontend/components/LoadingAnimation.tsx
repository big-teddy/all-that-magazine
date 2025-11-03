'use client';

import Lottie from 'lottie-react';

// Simple loading animation data (inline JSON)
const loadingAnimation = {
  "v": "5.7.4",
  "fr": 60,
  "ip": 0,
  "op": 60,
  "w": 200,
  "h": 200,
  "nm": "Loading",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "o": { "a": 0, "k": 100 },
        "r": {
          "a": 1,
          "k": [
            { "t": 0, "s": [0], "e": [360] },
            { "t": 60, "s": [360] }
          ]
        },
        "p": { "a": 0, "k": [100, 100, 0] },
        "a": { "a": 0, "k": [0, 0, 0] },
        "s": { "a": 0, "k": [100, 100, 100] }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": { "a": 0, "k": [80, 80] },
              "p": { "a": 0, "k": [0, 0] },
              "r": { "a": 0, "k": 10 }
            },
            {
              "ty": "st",
              "c": { "a": 0, "k": [0.102, 0.161, 0.184, 1] },
              "o": { "a": 0, "k": 100 },
              "w": { "a": 0, "k": 8 },
              "lc": 2,
              "lj": 2
            },
            {
              "ty": "tr",
              "p": { "a": 0, "k": [0, 0] },
              "a": { "a": 0, "k": [0, 0] },
              "s": { "a": 0, "k": [100, 100] },
              "r": { "a": 0, "k": 0 },
              "o": { "a": 0, "k": 100 }
            }
          ]
        }
      ],
      "ip": 0,
      "op": 60,
      "st": 0,
      "bm": 0
    }
  ]
};

interface Props {
  size?: number;
  className?: string;
}

export default function LoadingAnimation({ size = 80, className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        style={{ width: size, height: size }}
      />
    </div>
  );
}
