import React from 'react';
import type { ProfileState } from '../types';
import { FONTS, FONT_STYLES, BORDER_STYLES } from '../constants';

interface ProfileSectionProps {
  profile: ProfileState;
  isEditing: boolean;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, isEditing, handleImageUpload }) => {
  const fontClass = FONTS.find(f => f.id === profile.font)?.class || 'font-sans';
  const fontStyleClass = FONT_STYLES.find(f => f.id === profile.fontStyle)?.class || '';
  const borderStyleClass = BORDER_STYLES.find(b => b.id === profile.profileBorderStyle)?.class || '';

  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className={`relative w-32 h-32 md:w-40 md:h-40 mb-4 group p-1 rounded-full ${isEditing ? 'cursor-pointer' : ''} ${borderStyleClass} transition-all duration-300`}>
        <img
          src={profile.profilePicture || 'https://picsum.photos/256/256'}
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
        {isEditing && (
          <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
          </div>
        )}
      </div>
      <h1 className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${fontClass} ${fontStyleClass}`}>
        {profile.name}
      </h1>
      <div className="mt-2 max-w-md w-full px-4">
        <p className={`${fontClass} ${fontStyleClass} transition-colors duration-300`}>
          {profile.bio}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;
