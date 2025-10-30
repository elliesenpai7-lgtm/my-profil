import React, { useState, useRef } from 'react';
import type { ProfileState, Link } from '../types';
import { THEMES, FONTS, FONT_STYLES, BORDER_STYLES, LINK_BACKGROUNDS, SOCIAL_ICONS } from '../constants';
import { PlusIcon, TrashIcon } from './icons';

interface EditorPanelProps {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  onClose: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ profile, setProfile, onClose, handleImageUpload }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [copyButtonText, setCopyButtonText] = useState('Copy Code');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backgroundFileInputRef = useRef<HTMLInputElement>(null);
  const musicFileInputRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (field: keyof ProfileState, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleLinkChange = (id: string, field: keyof Link, value: any) => {
    setProfile(prev => ({
      ...prev,
      links: prev.links.map(link => link.id === id ? { ...link, [field]: value } : link)
    }));
  };
  
  const handleAddLink = () => {
    const newLink: Link = {
        id: new Date().getTime().toString(),
        title: 'New Link',
        url: 'https://example.com',
        icon: 'Link',
        iconStyle: 'none',
        backgroundStyle: 'pill',
        borderStyle: 'none'
    };
    setProfile(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  const handleDeleteLink = (id: string) => {
    setProfile(prev => ({ ...prev, links: prev.links.filter(link => link.id !== id) }));
  };

  const handleBackgroundChange = (updates: Partial<ProfileState['background']>) => {
    setProfile(prev => ({
      ...prev,
      background: {
        ...prev.background,
        ...updates,
      }
    }));
  };

  const handleBackgroundTypeChange = (type: 'theme' | 'image' | 'video') => {
    handleBackgroundChange({ type, value: type === 'theme' ? THEMES[0].id : '' });
  };
  
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleBackgroundChange({ 
          value: event.target?.result as string,
          mimeType: file.type 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        handleProfileChange('musicUrl', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const textToCopy = `export const INITIAL_STATE: ProfileState = ${JSON.stringify(profile, null, 2)};`;

  const handleExport = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy Code'), 2000);
    });
  };


  const Input = ({ label, value, onChange, type = 'text' }: {label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, type?:string}) => (
    <div className="mb-4">
      <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>
      <input type={type} value={value} onChange={onChange} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
    </div>
  );

  const Select = ({ label, value, onChange, options }: {label: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: {id: string, name: string}[]}) => (
     <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">{label}</label>
        <select value={value} onChange={onChange} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            {options.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
        </select>
    </div>
  );
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-gray-900 h-full overflow-y-auto p-6 editor-panel-glow" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white font-orbitron">Editor</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="flex border-b border-gray-700 mb-4">
          <button onClick={() => setActiveTab('profile')} className={`px-4 py-2 ${activeTab === 'profile' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Profile</button>
          <button onClick={() => setActiveTab('links')} className={`px-4 py-2 ${activeTab === 'links' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Links</button>
          <button onClick={() => setActiveTab('appearance')} className={`px-4 py-2 ${activeTab === 'appearance' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400'}`}>Appearance</button>
        </div>

        {activeTab === 'profile' && (
          <div>
            <div className="mb-6 border-b border-gray-700 pb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2">Profile Picture</label>
              <div className="flex items-center space-x-4">
                <img src={profile.profilePicture || 'https://picsum.photos/256/256'} alt="Profile Preview" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Upload New Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">Or hover over photo on main page.</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*,.gif" 
                  className="hidden" 
                />
              </div>
            </div>
            
            <Input label="Name" value={profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
            <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2">Bio</label>
                <textarea value={profile.bio} onChange={(e) => handleProfileChange('bio', e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div className="mb-4 border-b border-gray-700 pb-6">
              <label className="block text-gray-400 text-sm font-bold mb-2">Music URL (MP3)</label>
              <div className="flex items-center space-x-2">
                <input type="text" value={profile.musicUrl} onChange={(e) => handleProfileChange('musicUrl', e.target.value)} className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Paste URL or upload file" />
                <button
                  onClick={() => musicFileInputRef.current?.click()}
                  className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
                >
                  Upload
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Note: Uploaded files are stored locally. Use smaller files for best results.</p>
              <input
                type="file"
                ref={musicFileInputRef}
                onChange={handleMusicUpload}
                accept="audio/mp3,audio/mpeg"
                className="hidden"
              />
            </div>
            <div className="mt-6 p-4 rounded-lg bg-gray-800 border border-cyan-500/50">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Publish Your Changes</h3>
                <p className="text-sm text-gray-400 mb-2">
                    To make your profile public, copy the code below and replace the entire `INITIAL_STATE` object in your `constants.ts` file.
                </p>
                <textarea
                    readOnly
                    className="w-full h-48 bg-gray-900 border border-gray-700 text-white rounded px-3 py-2 font-mono text-xs"
                    value={textToCopy}
                />
                <button
                    onClick={handleExport}
                    className="w-full mt-2 bg-cyan-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-400 transition-colors"
                >
                    {copyButtonText}
                </button>
            </div>
          </div>
        )}

        {activeTab === 'links' && (
          <div>
            <button onClick={handleAddLink} className="w-full flex items-center justify-center bg-cyan-500 text-black font-bold py-2 px-4 rounded-lg hover:bg-cyan-400 mb-4">
                <PlusIcon className="w-5 h-5 mr-2" /> Add New Link
            </button>
            <div className="space-y-4">
              {profile.links.map(link => (
                <div key={link.id} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white font-bold">{link.title}</p>
                    <button onClick={() => handleDeleteLink(link.id)} className="text-red-500 hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>
                  </div>
                  <Input label="Title" value={link.title} onChange={(e) => handleLinkChange(link.id, 'title', e.target.value)} />
                  <Input label="URL" value={link.url} onChange={(e) => handleLinkChange(link.id, 'url', e.target.value)} />
                  <Select label="Icon" value={link.icon} onChange={(e) => handleLinkChange(link.id, 'icon', e.target.value)} options={Object.keys(SOCIAL_ICONS).map(name => ({id: name, name}))} />
                  <Select label="Icon Style" value={link.iconStyle} onChange={(e) => handleLinkChange(link.id, 'iconStyle', e.target.value)} options={FONT_STYLES} />
                  <Select label="Background Style" value={link.backgroundStyle} onChange={(e) => handleLinkChange(link.id, 'backgroundStyle', e.target.value)} options={LINK_BACKGROUNDS} />
                  <Select label="Border Style" value={link.borderStyle} onChange={(e) => handleLinkChange(link.id, 'borderStyle', e.target.value)} options={BORDER_STYLES.map(s => ({id: s.id, name:s.name}))} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div>
            <div className="mb-6 border-b border-gray-700 pb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2">Background</label>
                <div className="flex space-x-2 rounded-lg bg-gray-800 p-1 mb-4">
                    <button onClick={() => handleBackgroundTypeChange('theme')} className={`w-full py-2 text-sm rounded-md transition-colors ${profile.background.type === 'theme' ? 'bg-cyan-500 text-black' : 'text-gray-300 hover:bg-gray-700'}`}>Theme</button>
                    <button onClick={() => handleBackgroundTypeChange('image')} className={`w-full py-2 text-sm rounded-md transition-colors ${profile.background.type === 'image' ? 'bg-cyan-500 text-black' : 'text-gray-300 hover:bg-gray-700'}`}>Image/GIF</button>
                    <button onClick={() => handleBackgroundTypeChange('video')} className={`w-full py-2 text-sm rounded-md transition-colors ${profile.background.type === 'video' ? 'bg-cyan-500 text-black' : 'text-gray-300 hover:bg-gray-700'}`}>Video</button>
                </div>
                {profile.background.type === 'theme' && (
                    <Select 
                        label="Theme" 
                        value={profile.background.value} 
                        onChange={(e) => handleBackgroundChange({ value: e.target.value })} 
                        options={THEMES} 
                    />
                )}
                {(profile.background.type === 'image' || profile.background.type === 'video') && (
                    <div>
                      <label className="block text-gray-400 text-sm font-bold mb-2">Background URL or Upload</label>
                      <div className="flex items-center space-x-2">
                          <input 
                              type="text" 
                              value={profile.background.value} 
                              onChange={(e) => handleBackgroundChange({ value: e.target.value })}
                              className="w-full bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                              placeholder="Paste URL or upload file"
                          />
                          <button
                            onClick={() => backgroundFileInputRef.current?.click()}
                            className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors whitespace-nowrap"
                          >
                            Upload
                          </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Note: Uploaded files are stored locally. Use smaller files for best results.</p>
                      <input 
                          type="file" 
                          ref={backgroundFileInputRef} 
                          onChange={handleBackgroundUpload} 
                          accept={profile.background.type === 'image' ? 'image/*,.gif' : 'video/mp4,video/webm'}
                          className="hidden" 
                      />
                    </div>
                )}
            </div>
            <Select label="Font" value={profile.font} onChange={(e) => handleProfileChange('font', e.target.value)} options={FONTS} />
            <Select label="Font Style" value={profile.fontStyle} onChange={(e) => handleProfileChange('fontStyle', e.target.value)} options={FONT_STYLES} />
            <Select label="Profile Border" value={profile.profileBorderStyle} onChange={(e) => handleProfileChange('profileBorderStyle', e.target.value)} options={BORDER_STYLES.map(s => ({id:s.id, name:s.name}))} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;
