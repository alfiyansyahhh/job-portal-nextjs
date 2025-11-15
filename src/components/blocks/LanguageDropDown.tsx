'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageDropdown = () => {
  type Lang = 'INA' | 'ENG';
  type LangProp = { code: Lang; label: string; flag: string };
  const language: LangProp[] = [
    { code: 'INA', label: 'Indonesia', flag: '/icons/Group 24.svg' },
    { code: 'ENG', label: 'English', flag: 'icons/Group 27.svg' },
  ];

  const { i18n } = useTranslation();
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);

  const handleLanguageChange = (lang: any) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    localStorage.setItem('appLanguage', lang);

    setIsOpen(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className='relative text-left justify-end flex'
      ref={dropdownRef}
    >
      <button
        className='inline-flex items-center cursor-pointer gap-2 px-4 py-2 border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-50 focus:outline-none'
        onClick={toggleDropdown}
      >
        <img
          src={
            selectedLanguage === 'ENG'
              ? '/icons/Group 27.svg'
              : '/icons/Group 24.svg'
          }
          alt='Flag'
          className={'w-8 h-8 rounded-full object-contain border-2'}
        />
        <svg
          className={`w-5 h-5 text-[#21AF7D]`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <div className='origin-top-right absolute right-0 mt-2  rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {language.map((language) => (
              <button
                key={language.code}
                onClick={() =>
                  handleLanguageChange(language.code as 'ENG' | 'INA')
                }
                className='block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              >
                {language.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default LanguageDropdown;
