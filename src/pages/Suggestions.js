import React, { useState, useEffect } from 'react';

const Suggestions = () => {
    const [followStatus, setFollowStatus] = useState(() => {
        const savedFollowStatus = localStorage.getItem('followStatus');
        return savedFollowStatus ? JSON.parse(savedFollowStatus) : {
            officel_Kunu: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s',
                details: 'Lorem ipsum dolor sit amet',
                private: true,
                followers: ['m_kundan'],
                followedBy: 'm_kundan'
            },
            kavbya_007: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP059lc6iDmN4G4lHXG1yQGS4bhlJUHeuWaw&s',
                details: 'Consectetur adipiscing elit',
                private: false,
                followers: ['j_doe'],
                followedBy: 'j_doe'
            },
            NotGamer_Fleet: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqypyYsjRrcAZlRKc-zAjeENINffo7EN2Pw&s',
                details: 'Sed do eiusmod tempor incididunt',
                private: true,
                followers: ['x_player'],
                followedBy: 'x_player'
            },
            Pinki_shidhu: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s',
                details: 'Ut labore et dolore magna aliqua',
                private: false,
                followers: ['n_smith'],
                followedBy: 'n_smith'
            },
            rakhi_Moni: {
                followed: false,
                avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJBFx3frl4NbdX5VJbn7FpawQoXxH2vYCfA&s',
                details: 'Enim ad minim veniam',
                private: true,
                followers: ['z_queen'],
                followedBy: 'z_queen'
            }
        };
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('followStatus', JSON.stringify(followStatus));
    }, [followStatus]);

    const toggleFollow = (user) => {
        setFollowStatus((prevStatus) => {
            const newFollowStatus = {
                ...prevStatus,
                [user]: { ...prevStatus[user], followed: !prevStatus[user].followed }
            };
            const action = newFollowStatus[user].followed ? 'followed' : 'unfollowed';
            setMessage(`${user} has been ${action}.`);
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
            return newFollowStatus;
        });
    };

    return (
        <div>
            <p className="text-gray-500 font-semibold mb-4">Suggestions For You</p>
            <div className="relative space-y-4">
                {Object.entries(followStatus).map(([user, { followed, avatar, details, private: isPrivate, followedBy }]) => (
                    <div key={user} className="relative flex items-center justify-between group">
                        <div className="flex items-center space-x-4">
                            <img className="w-[64px] h-[64px] rounded-full" src={avatar} alt={user} />
                            <div>
                                <p className="font-semibold">{user}</p>
                                <p className="text-sm text-gray-500">
                                    Followed by {followedBy}
                                </p>
                            </div>
                        </div>
                        <button
                            className="text-blue-500 text-sm font-semibold"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFollow(user);
                            }}
                        >
                            {followed ? 'Unfollow' : 'Follow'}
                        </button>
                        <div className="absolute hidden group-hover:block bg-white border border-gray-300 rounded-lg shadow-lg z-10 top-[60px] left-0 transform h-[400px] p-4 w-[350px]">
                            <div className="flex items-center space-x-3">
                                <img className="w-16 h-16 rounded-full" src={avatar} alt={user} />
                                <div>
                                    <p className="font-semibold text-sm">{user}</p>
                                    <p className="text-xs text-gray-600">{details}</p>
                                    {isPrivate && (
                                        <div className="flex items-center text-gray-500 mt-2 text-xs">
                                            <svg aria-label="" className="w-8 h-8 mr-3" fill="currentColor" height="48" role="img" viewBox="0 0 96 96" width="48"><title></title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><path d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                                            <span>Private Account</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {message && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 p-3 bg-blue-500 text-white text-center rounded-md shadow-md animate-fadeInOut">
                    {message}
                </div>
            )}

        </div>
    );
};

export default Suggestions;
