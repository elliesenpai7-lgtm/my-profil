import React, { useState, useEffect, useCallback } from 'react';
import ProfileSection from './components/ProfileSection';
import LinkCard from './components/LinkCard';
import EditorPanel from './components/EditorPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { ProfileState, Background as BackgroundType } from './types';
import { INITIAL_STATE, THEMES, FONTS } from './constants';
import { EditIcon } from './components/icons';

const Background: React.FC<{ background: BackgroundType }> = ({ background }) => {
  if (background.type === 'video' && background.value) {
    return (
      <video key={background.value} autoPlay loop muted playsInline className="background-video">
        <source src={background.value} type={background.mimeType || 'video/mp4'} />
        Your browser does not support the video tag.
      </video>
    );
  }
  
  if (background.type === 'image' && background.value) {
    return (
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${background.value})` }}
      ></div>
    );
  }
  
  const themeClass = THEMES.find(t => t.id === background.value)?.classes || 'bg-gray-900';
  return (
    <div className={`fixed inset-0 w-full h-full -z-10 transition-colors duration-500 ${themeClass}`}></div>
  );
};

const App: React.FC = () => {
  const [profile, setProfile] = useLocalStorage<ProfileState>('neon-profile', INITIAL_STATE);
  const [isEditing, setIsEditing] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const fontClass = FONTS.find(f => f.id === profile.font)?.class || 'font-sans';
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile(prev => ({...prev, profilePicture: event.target?.result as string}));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleUserInteraction = useCallback(() => {
    if (!isReady) {
        setIsReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    // This effect ensures that the audio element re-renders if the URL changes.
    // The key prop on the audio element achieves this.
  }, [profile.musicUrl]);

  return (
    <div className="min-h-screen w-full" onClick={handleUserInteraction}>
      <Background background={profile.background} />
      
      <main className="container mx-auto px-4 py-8 relative">
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-all duration-300"
            aria-label="Edit Profile"
          >
            <EditIcon className="w-6 h-6"/>
          </button>
        </div>

        <ProfileSection profile={profile} isEditing={isEditing} handleImageUpload={handleImageUpload} />
        
        <div className="mt-8 space-y-4 flex flex-col items-center">
          {profile.links.map(link => (
            <LinkCard key={link.id} link={link} fontClass={fontClass} />
          ))}
        </div>
        
        {isReady && profile.musicUrl && (
          <audio src={profile.musicUrl} autoPlay loop key={profile.musicUrl} />
        )}
      </main>

      {isEditing && (
        <EditorPanel 
          profile={profile} 
          setProfile={setProfile}
          onClose={() => setIsEditing(false)}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default App;
