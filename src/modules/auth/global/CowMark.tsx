import React from 'react';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const green = '#2F6A4E';
const greenDeep = '#234E3A';
const amber = '#DBA646';
const amberSoft = '#E7C98A';
const cream = '#EAD9B8';
const ink = '#292D34';

// Ilustração da vaca da identidade visual (porta de ref/MilkRoute/screens/login.jsx).
export function CowMark({ size = 156 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 160 160">
      <Circle cx={80} cy={82} r={74} fill="#DCEFE3" />
      <Path
        d="M 8 130 Q 30 124 50 130 T 90 130 T 130 130 T 156 128"
        stroke={green}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        opacity={0.55}
      />

      {/* orelhas externas */}
      <Ellipse cx={36} cy={64} rx={18} ry={11} fill="#fff" stroke={greenDeep} strokeWidth={2.5} rotation={-25} originX={36} originY={64} />
      <Ellipse cx={124} cy={64} rx={18} ry={11} fill="#fff" stroke={greenDeep} strokeWidth={2.5} rotation={25} originX={124} originY={64} />
      {/* orelhas internas */}
      <Ellipse cx={36} cy={64} rx={9} ry={5} fill={amberSoft} rotation={-25} originX={36} originY={64} />
      <Ellipse cx={124} cy={64} rx={9} ry={5} fill={amberSoft} rotation={25} originX={124} originY={64} />

      {/* chifres */}
      <Path d="M 60 36 Q 56 24 50 26" stroke={amber} strokeWidth={5} fill="none" strokeLinecap="round" />
      <Path d="M 100 36 Q 104 24 110 26" stroke={amber} strokeWidth={5} fill="none" strokeLinecap="round" />

      {/* cabeça */}
      <Path
        d="M 32 70 Q 32 36 80 36 Q 128 36 128 70 L 128 96 Q 128 130 80 130 Q 32 130 32 96 Z"
        fill="#fff"
        stroke={greenDeep}
        strokeWidth={2.8}
        strokeLinejoin="round"
      />

      {/* manchas */}
      <Path d="M 50 58 Q 42 50 50 44 Q 62 42 64 52 Q 64 62 56 64 Q 48 64 50 58 Z" fill={green} />
      <Path d="M 108 96 Q 100 92 102 84 Q 108 78 116 82 Q 122 90 118 98 Q 112 102 108 96 Z" fill={green} />

      {/* olhos */}
      <Ellipse cx={62} cy={80} rx={5} ry={6} fill={ink} />
      <Ellipse cx={98} cy={80} rx={5} ry={6} fill={ink} />
      <Circle cx={60.5} cy={78} r={1.6} fill="#fff" />
      <Circle cx={96.5} cy={78} r={1.6} fill="#fff" />

      {/* focinho */}
      <Ellipse cx={80} cy={108} rx={24} ry={16} fill={cream} stroke={greenDeep} strokeWidth={2.5} />
      <Ellipse cx={71} cy={106} rx={2.4} ry={3.2} fill={greenDeep} />
      <Ellipse cx={89} cy={106} rx={2.4} ry={3.2} fill={greenDeep} />
      <Path d="M 71 117 Q 80 122 89 117" stroke={greenDeep} strokeWidth={2.2} fill="none" strokeLinecap="round" />
    </Svg>
  );
}
