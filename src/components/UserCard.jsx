import React from 'react';

const UserCard = ({ user }) => {
  const { name, email, phone, location, picture, gender, nat } = user || {};
  
  const firstName = name?.first || 'N/A';
  const lastName = name?.last || '';
  const userEmail = email || 'No email';
  const userPhone = phone || 'No phone';
  const userCity = location?.city || 'Unknown';
  const userCountry = location?.country || 'Unknown';
  const userImage = picture?.large || '';
  const userGender = gender || 'other';
  const userNat = nat || '??';

  const genderColors = {
    male: 'bg-blue-100 text-blue-700',
    female: 'bg-pink-100 text-pink-700',
    other: 'bg-gray-100 text-gray-700'
  };

  const genderColor = genderColors[userGender] || genderColors.other;

  return (
    <div className="bg-white border border-[#e2e8f0] rounded-[10px] p-4 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        {userImage ? (
          <img 
            src={userImage} 
            alt={`${firstName} ${lastName}`} 
            className="w-[60px] h-[60px] rounded-full border border-gray-100"
          />
        ) : (
          <div className="w-[60px] h-[60px] rounded-full bg-gray-200 border border-gray-100 flex items-center justify-center text-gray-400">
            ?
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {firstName} {lastName}
          </h3>
          <p className="text-gray-500 text-sm flex items-center mt-1">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {userEmail}
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4 flex-grow text-sm text-gray-600">
        <p className="flex items-start">
          <svg className="w-4 h-4 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          {userPhone}
        </p>
        <p className="flex items-start">
          <svg className="w-4 h-4 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          {userCity}, {userCountry}
        </p>
      </div>

      <div className="flex gap-2">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${genderColor}`}>
          {userGender}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 uppercase">
          {userNat}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
