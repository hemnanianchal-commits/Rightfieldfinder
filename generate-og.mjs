import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCFCFB" />
      <stop offset="100%" stop-color="#F4F5F0" />
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#24408E" />
      <stop offset="100%" stop-color="#182C66" />
    </linearGradient>
    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2823C" />
      <stop offset="100%" stop-color="#C76722" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#24408E" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle ambient circles -->
  <circle cx="1100" cy="100" r="300" fill="#E2823C" fill-opacity="0.06" />
  <circle cx="100" cy="500" r="350" fill="#24408E" fill-opacity="0.05" />

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#blueGrad)" />

  <!-- Card container with subtle border -->
  <rect x="60" y="54" width="1080" height="522" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" filter="url(#shadow)" />

  <!-- Header pill -->
  <rect x="110" y="104" width="280" height="40" rx="20" fill="#24408E" fill-opacity="0.08" stroke="#24408E" stroke-opacity="0.2" stroke-width="1.5" />
  <text x="145" y="129" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#24408E" letter-spacing="1">FREE STUDENT CAREER QUIZ</text>
  <circle cx="128" cy="124" r="5" fill="#E2823C" />

  <!-- Logo Mark + Site Name -->
  <g transform="translate(110, 168)">
    <rect width="56" height="56" rx="16" fill="url(#blueGrad)" />
    <!-- Compass icon -->
    <circle cx="28" cy="28" r="16" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.4" />
    <polygon points="28,16 34,28 28,25 22,28" fill="#E2823C" />
    <polygon points="28,40 34,28 28,31 22,28" fill="#FFFFFF" fill-opacity="0.9" />
    
    <text x="76" y="41" font-family="Georgia, serif" font-size="44" font-weight="800" fill="#1A202C" letter-spacing="-0.5">RightFieldFinder</text>
  </g>

  <!-- Tagline Main Headline -->
  <text x="110" y="300" font-family="Georgia, serif" font-size="54" font-weight="800" fill="#1A202C" letter-spacing="-1">
    Find the field that fits you.
  </text>
  
  <text x="110" y="348" font-family="Georgia, serif" font-size="34" font-style="italic" font-weight="600" fill="#24408E">
    Which field is right for you? Discover your academic path.
  </text>

  <!-- Subtitle -->
  <text x="110" y="405" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="500" fill="#4A5568">
    8 simple questions • Personalized recommendations • Completable in under 90 seconds
  </text>

  <!-- Discipline Chips -->
  <g transform="translate(110, 460)">
    <g transform="translate(0, 0)">
      <rect width="140" height="42" rx="12" fill="#EFF6FF" stroke="#BFDBFE" stroke-width="1.5" />
      <text x="70" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#1D4ED8" text-anchor="middle">Computer Science</text>
    </g>
    <g transform="translate(152, 0)">
      <rect width="115" height="42" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" />
      <text x="57" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#334155" text-anchor="middle">Engineering</text>
    </g>
    <g transform="translate(279, 0)">
      <rect width="105" height="42" rx="12" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
      <text x="52" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#047857" text-anchor="middle">Medicine</text>
    </g>
    <g transform="translate(396, 0)">
      <rect width="100" height="42" rx="12" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1.5" />
      <text x="50" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#B45309" text-anchor="middle">Business</text>
    </g>
    <g transform="translate(508, 0)">
      <rect width="125" height="42" rx="12" fill="#FFF1F2" stroke="#FECDD3" stroke-width="1.5" />
      <text x="62" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#BE123C" text-anchor="middle">Design &amp; Arts</text>
    </g>
    <g transform="translate(645, 0)">
      <rect width="135" height="42" rx="12" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1.5" />
      <text x="67" y="26" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="600" fill="#4338CA" text-anchor="middle">Social Sciences</text>
    </g>
  </g>

  <!-- URL watermark -->
  <text x="1090" y="525" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#94A3B8" text-anchor="end">rightfieldfinder.com</text>
</svg>
`;

async function generate() {
  const publicDir = path.resolve('public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.join(publicDir, 'og-image.png');
  await sharp(Buffer.from(svg))
    .resize(1200, 630)
    .png({ quality: 95 })
    .toFile(outputPath);

  console.log('Successfully created og-image.png at', outputPath);
}

generate().catch(console.error);
