import React from 'react';
import type { Link } from '../types';
import { SOCIAL_ICONS, FONT_STYLES, LINK_BACKGROUNDS, BORDER_STYLES } from '../constants';

interface LinkCardProps {
  link: Link;
  fontClass: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, fontClass }) => {
  const IconComponent = SOCIAL_ICONS[link.icon] || SOCIAL_ICONS['Link'];
  const iconStyleClass = FONT_STYLES.find(s => s.id === link.iconStyle)?.class || '';
  const bgStyleClass = LINK_BACKGROUNDS.find(b => b.id === link.backgroundStyle)?.class || '';
  const borderStyleClass = BORDER_STYLES.find(b => b.id === link.borderStyle)?.class || '';
  
  const iconColorClass = FONT_STYLES.find(s => s.id === link.iconStyle)?.preview || 'text-white';
  
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full max-w-lg mx-auto block group"
    >
      <div className={`relative p-0.5 my-2 transition-transform duration-300 group-hover:scale-105 ${bgStyleClass} ${borderStyleClass}`}>
        <div className={`relative flex items-center gap-4 px-4 py-3 bg-black ${bgStyleClass}`}>
          <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full">
             <IconComponent className={`w-6 h-6 transition-all duration-300 ${iconColorClass} ${iconStyleClass}`} />
          </div>
          <span className={`text-white text-lg ${fontClass} text-center flex-grow`}>
            {link.title}
          </span>
        </div>
      </div>
    </a>
  );
};

export default LinkCard;
