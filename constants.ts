import type { ProfileState, Theme, Font, StyleOption } from './types';

export const THEMES: Theme[] = [
  { id: 'solid-purple', name: 'Solid Purple', classes: 'bg-purple-900' },
  { id: 'solid-red', name: 'Solid Red', classes: 'bg-red-900' },
  { id: 'solid-indigo', name: 'Solid Indigo', classes: 'bg-indigo-900' },
  { id: 'solid-teal', name: 'Solid Teal', classes: 'bg-teal-900' },
  { id: 'solid-black', name: 'Solid Black', classes: 'bg-black' },
  { id: 'solid-blue', name: 'Solid Blue', classes: 'bg-blue-900' },
  { id: 'solid-cyan', name: 'Solid Cyan', classes: 'bg-cyan-800' },
  { id: 'solid-lime', name: 'Solid Lime', classes: 'bg-lime-900' },
  { id: 'solid-pink', name: 'Solid Pink', classes: 'bg-pink-900' },
  { id: 'solid-orange', name: 'Solid Orange', classes: 'bg-orange-900' },
  { id: 'solid-green', name: 'Solid Green', classes: 'bg-green-900' },
];

export const FONTS: Font[] = [
  { id: 'orbitron', name: 'Orbitron', class: 'font-orbitron' },
  { id: 'press-start', name: 'Press Start 2P', class: 'font-press-start' },
  { id: 'audiowide', name: 'Audiowide', class: 'font-audiowide' },
  { id: 'righteous', name: 'Righteous', class: 'font-righteous' },
  { id: 'major-mono', name: 'Major Mono', class: 'font-major-mono' },
  { id: 'megrim', name: 'Megrim', class: 'font-megrim' },
  { id: 'geo', name: 'Geo', class: 'font-geo' },
  { id: 'syncopate', name: 'Syncopate', class: 'font-syncopate' },
  { id: 'chakra-petch', name: 'Chakra Petch', class: 'font-chakra-petch' },
  { id: 'bungee-inline', name: 'Bungee Inline', class: 'font-bungee-inline' },
  { id: 'monoton', name: 'Monoton', class: 'font-monoton' },
  { id: 'nova-square', name: 'Nova Square', class: 'font-nova-square' },
  { id: 'vt323', name: 'VT323', class: 'font-vt323' },
  { id: 'russo-one', name: 'Russo One', class: 'font-russo-one' },
  { id: 'exo-2', name: 'Exo 2', class: 'font-exo-2' },
  { id: 'turret-road', name: 'Turret Road', class: 'font-turret-road' },
  { id: 'wallpoet', name: 'Wallpoet', class: 'font-wallpoet' },
  { id: 'black-ops-one', name: 'Black Ops One', class: 'font-black-ops-one' },
  { id: 'bruno-ace-sc', name: 'Bruno Ace SC', class: 'font-bruno-ace-sc' },
  { id: 'codystar', name: 'Codystar', class: 'font-codystar' },
  { id: 'dancing-script', name: 'Dancing Script', class: 'font-dancing-script' },
  { id: 'pacifico', name: 'Pacifico', class: 'font-pacifico' },
  { id: 'great-vibes', name: 'Great Vibes', class: 'font-great-vibes' },
  { id: 'lobster', name: 'Lobster', class: 'font-lobster' },
  { id: 'sacramento', name: 'Sacramento', class: 'font-sacramento' },
];

export const FONT_STYLES: StyleOption[] = [
  { id: 'none', name: 'Solid White', class: 'text-white', preview: 'text-white' },
  { id: 'solid-cyan', name: 'Solid Cyan', class: 'text-cyan-400', preview: 'text-cyan-400' },
  { id: 'solid-pink', name: 'Solid Pink', class: 'text-pink-400', preview: 'text-pink-400' },
  { id: 'solid-lime', name: 'Solid Lime', class: 'text-lime-400', preview: 'text-lime-400' },
  { id: 'solid-yellow', name: 'Solid Yellow', class: 'text-yellow-400', preview: 'text-yellow-400' },
  { id: 'solid-red', name: 'Solid Red', class: 'text-red-400', preview: 'text-red-400' },
  { id: 'solid-blue', name: 'Solid Blue', class: 'text-blue-400', preview: 'text-blue-400' },
  { id: 'solid-purple', name: 'Solid Purple', class: 'text-purple-400', preview: 'text-purple-400' },
  { id: 'rainbow-text', name: 'Rainbow Text', class: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text', preview: 'text-white' },
  { id: 'white-border-black', name: 'White w/ Black Border', class: 'text-white text-stroke-black', preview: 'text-white' },
  { id: 'black-border-white', name: 'Black w/ White Border', class: 'text-black text-stroke-white', preview: 'text-black' },
  { id: 'cyan-border-black', name: 'Cyan w/ Black Border', class: 'text-cyan-400 text-stroke-black', preview: 'text-cyan-400' },
  { id: 'pink-border-black', name: 'Pink w/ Black Border', class: 'text-pink-400 text-stroke-black', preview: 'text-pink-400' },
  { id: 'yellow-border-black', name: 'Yellow w/ Black Border', class: 'text-yellow-400 text-stroke-black', preview: 'text-yellow-400' },
];

export const BORDER_STYLES: StyleOption[] = [
    { id: 'none', name: 'None', class: 'bg-transparent', preview: 'border-2 border-transparent' },
    { id: 'rainbow', name: 'Rainbow', class: 'bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500', preview: 'border-2 border-purple-400' },
    { id: 'rgb-flow', name: 'RGB Flow', class: 'border-rgb-flow', preview: 'border-2 border-purple-400' },
    { id: 'solid-cyan', name: 'Solid Cyan', class: 'bg-cyan-400', preview: 'border-2 border-cyan-400' },
    { id: 'solid-pink', name: 'Solid Pink', class: 'bg-pink-400', preview: 'border-2 border-pink-400' },
    { id: 'solid-lime', name: 'Solid Lime', class: 'bg-lime-400', preview: 'border-2 border-lime-400' },
    { id: 'solid-yellow', name: 'Solid Yellow', class: 'bg-yellow-400', preview: 'border-2 border-yellow-400' },
    { id: 'solid-red', name: 'Solid Red', class: 'bg-red-500', preview: 'border-2 border-red-500' },
    { id: 'solid-blue', name: 'Solid Blue', class: 'bg-blue-500', preview: 'border-2 border-blue-500' },
    { id: 'solid-purple', name: 'Solid Purple', class: 'bg-purple-500', preview: 'border-2 border-purple-500' },
    { id: 'solid-white', name: 'Solid White', class: 'bg-white', preview: 'border-2 border-white' },
];

export const LINK_BACKGROUNDS: StyleOption[] = [
    { id: 'rectangle', name: 'Rectangle', class: 'rounded-lg', preview: 'w-full h-8 bg-gray-500 rounded-lg' },
    { id: 'pill', name: 'Pill', class: 'rounded-full', preview: 'w-full h-8 bg-gray-500 rounded-full' },
    { id: 'skew', name: 'Skew', class: '-skew-x-12', preview: 'w-full h-8 bg-gray-500 -skew-x-12' },
    { id: 'left-cut', name: 'Left Cut', class: 'rounded-r-full', preview: 'w-full h-8 bg-gray-500 rounded-r-full' },
    { id: 'right-cut', name: 'Right Cut', class: 'rounded-l-full', preview: 'w-full h-8 bg-gray-500 rounded-l-full' },
];

export const SOCIAL_ICON_NAMES = [
  'Instagram', 'X', 'Patreon', 'Youtube', 'Twitch', 'Discord', 'Github', 'Tiktok', 'Spotify', 'Link'
];

export const INITIAL_STATE: ProfileState = {
  profilePicture: 'https://picsum.photos/256/256',
  name: 'your name',
  bio: 'Welcome to my corner of the internet. Check out my links below!',
  background: {
    type: 'theme',
    value: 'solid-purple',
  },
  font: 'dancing-script',
  fontStyle: 'solid-pink',
  profileBorderStyle: 'rgb-flow',
  musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  links: [
    { id: '1', title: 'Follow me on X', url: 'https://x.com', icon: 'X', iconStyle: 'solid-cyan', backgroundStyle: 'pill', borderStyle: 'solid-blue' },
    { id: '2', title: 'Check out my GitHub', url: 'https://github.com', icon: 'Github', iconStyle: 'solid-pink', backgroundStyle: 'rectangle', borderStyle: 'solid-pink' },
    { id: '3', title: 'Support me on Patreon', url: 'https://patreon.com', icon: 'Patreon', iconStyle: 'solid-lime', backgroundStyle: 'skew', borderStyle: 'rgb-flow' },
  ],
};
