import React, { useState, useEffect } from 'react';
import { FaTrash, FaEllipsisV } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';
import { Sidebar } from '../components/Sidebar';
import Suggestions from './Suggestions';
import Profile from './Profile';
import Reel from './Reel';
import { FaRegHeart } from "react-icons/fa";
import Messages from './Messages';
import Search from './Search';

function Home() {
    const [selectedMenuItem, setSelectedMenuItem] = useState('Home');
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });
    const [stories, setStories] = useState(() => {
        const savedStories = localStorage.getItem('stories');
        return savedStories ? JSON.parse(savedStories) : [];
    });
    const [selectedStory, setSelectedStory] = useState(null);
    const [followStatus, setFollowStatus] = useState({
        officel_Kunu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWBwS10Rq-_Huyc449gljfAm088EG8XNiog&s' },
        kavbya_007: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP059lc6iDmN4G4lHXG1yQGS4bhlJUHeuWaw&s' },
        NotGamer_Fleet: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJqypyYsjRrcAZlRKc-zAjeENINffo7EN2Pw&s' },
        Pinki_shidhu: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODEJ7TOuaO5wmqmQj7Y3aYpu0nHUJ7sxQAg&s' },
        rakhi_Moni: { followed: false, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJBFx3frl4NbdX5VJbn7FpawQoXxH2vYCfA&s' }
    });

    const [showPostOptions, setShowPostOptions] = useState(null);
    const [likedPosts, setLikedPosts] = useState(() => {
        const savedLikes = localStorage.getItem('likedPosts');
        return savedLikes ? new Set(JSON.parse(savedLikes)) : new Set();
    });
    const [editingPost, setEditingPost] = useState(null);
    const [newCaption, setNewCaption] = useState('');
    const [newImage, setNewImage] = useState(null);

    const [comments, setComments] = useState(() => {
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : {};
    });
    const [showComments, setShowComments] = useState(null);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    useEffect(() => {
        localStorage.setItem('likedPosts', JSON.stringify(Array.from(likedPosts)));
    }, [likedPosts]);

    useEffect(() => {
        localStorage.setItem('stories', JSON.stringify(stories));
    }, [stories]);

    const handleLike = (id) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === id) {
                    const newLikeCount = likedPosts.has(id) ? post.likeCount - 1 : post.likeCount + 1;
                    return { ...post, likeCount: newLikeCount };
                }
                return post;
            });
        });
        setLikedPosts(prev => {
            const newLikes = new Set(prev);
            if (newLikes.has(id)) {
                newLikes.delete(id);
            } else {
                newLikes.add(id);
            }
            return newLikes;
        });
    };
    const likeCount = (postId) => {
        return likedPosts.has(postId) ? 1 : 0;
    };
    const handleStoryUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStories(prevStories => [
                    ...prevStories,
                    { id: Date.now(), src: reader.result, type: file.type.includes('video') ? 'video' : 'image', uploaderName: generateRandomName() }
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileSelect = () => {
        document.getElementById('fileInput').click();
    };
    const [progress, setProgress] = useState(0);
    const [timer, setTimer] = useState(null);
    const openStory = (story) => {
        setSelectedStory(story);
        setProgress(0);
        setTimer(setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + (100 / (story.duration / 100));
            if (newProgress >= 100) {
              clearInterval(timer);
              setSelectedStory(null);
              return 100;
            }
            return newProgress;
          });
        }, 100));
      };

    const closeStory = () => {
        setSelectedStory(null);
    };

    const deleteStory = () => {
        setStories(prevStories => {
            const updatedStories = prevStories.filter(story => story.id !== selectedStory.id);
            return updatedStories;
        });
        closeStory();
    };

    const generateRandomName = () => {
        const names = ['JohnDoe', 'JaneSmith', 'AliceJohnson', 'BobBrown', 'CharlieDavis'];
        return names[Math.floor(Math.random() * names.length)];
    };

    const toggleFollow = (user) => {
        setFollowStatus(prevStatus => ({
            ...prevStatus,
            [user]: { ...prevStatus[user], followed: !prevStatus[user].followed }
        }));
    };

    const handlePostUpload = (newPost) => {
        setPosts(prevPosts => [...prevPosts, { id: prevPosts.length + 1, likeCount: 0, ...newPost }]);
    };

    const handlePostOptionsClick = (id) => {
        setShowPostOptions(id === showPostOptions ? null : id);
    };

    const handleEditPost = (post) => {
        setEditingPost(post);
        setNewCaption(post.caption);
        setNewImage(null);
        handlePostOptionsClick(post.id);
    };

    const handleDeletePost = () => {

        setPosts(prevPosts => prevPosts.filter(post => post.id !== showPostOptions));
        setShowPostOptions(null);

    };

    const handleEditCaptionChange = (event) => {
        setNewCaption(event.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveEdit = () => {
        if (editingPost) {
            setPosts(prevPosts => prevPosts.map(post =>
                post.id === editingPost.id
                    ? { ...post, caption: newCaption, imageUrl: newImage || post.imageUrl }
                    : post
            ));
            setEditingPost(null);
        }
    };
    const saveCommentsToLocalStorage = (comments) => {
        localStorage.setItem('comments', JSON.stringify(comments));
    };
    const handleCommentSubmit = (postId) => {
        if (newComment.trim()) {
            setComments(prevComments => {
                const updatedComments = { ...prevComments };
                if (!updatedComments[postId]) {
                    updatedComments[postId] = [];
                }
                // Check if the last comment added is the same as the new comment to avoid duplicates
                const lastComment = updatedComments[postId][updatedComments[postId].length - 1];
                if (lastComment && lastComment.text === newComment) {
                    return prevComments; // Avoid adding the same comment twice
                }
                updatedComments[postId].push({
                    id: Date.now(),
                    username: generateRandomName(),
                    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
                    text: newComment
                });
                saveCommentsToLocalStorage(updatedComments); // Save to localStorage
                return updatedComments;
            });
            setNewComment('');
        }
    };


    const toggleCommentSection = (postId) => {
        setShowComments(showComments === postId ? null : postId);
    };


    const commentCount = (postId) => {
        return comments[postId] ? comments[postId].length : 0;
    };
    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);
    const handleCloseStory = () => {
        clearInterval(timer);
        setSelectedStory(null);
      };
    
      useEffect(() => {
        return () => clearInterval(timer); // Clean up timer on unmount
      }, [timer]);
    
    return (
        <div className="flex bg-gray-50 min-h-screen">
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleStoryUpload}
                accept="image/*, video/*"
            />
            <input
                type="file"
                id="editImageInput"
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                accept="image/*"
            />
            <Sidebar setSelectedMenuItem={setSelectedMenuItem} selectedMenuItem={selectedMenuItem} handlePostUpload={handlePostUpload} />

            <div className="w-3/5 p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>

                {selectedMenuItem === 'Profile' &&
                    <Profile />
                }
                {selectedMenuItem === 'Reels' &&
                    <Reel />
                }
                {selectedMenuItem === 'Messages' &&
                    <Messages />
                }
                {selectedMenuItem === 'Search' &&
                    <Search />
                }
                {selectedMenuItem === 'Home' &&
                    <>
                        <div className="flex space-x-4 overflow-x-auto mb-8">
                            <div>
                                <li className="flex flex-col items-center space-y-1">
                                    <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                                        <a onClick={triggerFileSelect} className="block bg-white p-1 rounded-full transform transition hover:-rotate-6 cursor-pointer">
                                            <img className="h-[65px] w-[65px] rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s" />
                                        </a>
                                        <button onClick={triggerFileSelect} className="absolute bg-blue-500 text-white text-2xl font-medium w-8 h-8 rounded-full bottom-0 right-1 border-4 border-white flex justify-center items-center font-mono hover:bg-blue-700 focus:outline-none">
                                            <div className="transform -translate-y-px">+</div>
                                        </button>
                                    </div>
                                    <h1>azevde_dd</h1>
                                </li>
                            </div>
                            {stories.map((story) => (
                                <div key={story.id}>
                                    <li className="flex flex-col items-center space-y-1">
                                        <div className="relative bg-gradient-to-tr from-yellow-400 to-purple-600 p-1 rounded-full">
                                            <a onClick={() => openStory(story)} className="block bg-white p-1 rounded-full transform transition hover:-rotate-6 cursor-pointer">
                                                <div>
                                                    {story.type === 'video' ? (
                                                        <video className="h-[65px] w-[65px] rounded-full" src={story.src} alt="Story" />
                                                    ) : (
                                                        <img className="h-[65px] w-[65px] rounded-full" src={story.src} alt="Story" />
                                                    )}
                                                </div>
                                            </a>
                                        </div>
                                        <h1>{story.uploaderName}</h1>
                                    </li>
                                </div>
                            ))}
                        </div>

                        {posts.map((post) => (
                            <div key={post.id} className="mb-8 bg-white rounded-lg shadow-sm p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center space-x-4">
                                        <img className="h-12 w-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s" alt="azevde_ddr" />
                                        <div>
                                            <div className="font-bold">azevde_ddr</div>
                                            <div className="text-gray-500 text-sm">2d</div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button onClick={() => handlePostOptionsClick(post.id)}>
                                            <FaEllipsisV />
                                        </button>
                                        {showPostOptions === post.id && (
                                            <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                                                <button
                                                    onClick={() => handleEditPost(post)}
                                                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                >
                                                    Edit Post
                                                </button>
                                                <button
                                                    onClick={handleDeletePost}
                                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                                >
                                                    Delete Post
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {editingPost?.id === post.id ? (
                                    <div className="mb-4">
                                        <textarea
                                            value={newCaption}
                                            onChange={handleEditCaptionChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                                        />
                                        <div className="flex justify-between items-center">
                                            <input type="file" id="editImageInput" onChange={handleImageUpload} />
                                            <button
                                                onClick={handleSaveEdit}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <img className="w-full rounded-lg mb-4" src={post.imageUrl} alt={post.caption} />
                                        <p className="mb-4">{post.caption}</p>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => handleLike(post.id)}>
                                            {likedPosts.has(post.id) ? <FcLike size={28} /> : <FaRegHeart size={26} />}
                                        </button>
                                        <span className="text-gray-500 text-sm">1{likeCount(post.id)} likes</span>
                                        <button onClick={() => toggleCommentSection(post.id)}>
                                            <svg aria-label="Comment" className="x1lliihq x1n2onr6 x5n08af"
                                                fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24">
                                                <title>Comment</title>
                                                <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                                                    fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                            </svg>
                                        </button>
                                        <span className="text-gray-500 text-sm">{commentCount(post.id)} comments</span>
                                    </div>
                                </div>

                                {showComments === post.id && (
                                    <div className="mt-4">
                                        {comments[post.id] && comments[post.id].map(comment => (
                                            <div key={comment.id} className="flex items-center space-x-4 mb-2">
                                                <div className='flex items-center space-x-4 mb-2'>
                                                <img className="h-8 w-8 rounded-full" src={comment.avatar} alt={comment.username} />
                                                <div>
                                                    <div className="font-bold">{comment.username}</div>
                                                    <div>{comment.text}</div>
                                                </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setComments((prevComments) => {
                                                            const updatedComments = { ...prevComments };
                                                            updatedComments[post.id] = updatedComments[post.id].filter((c) => c.id !== comment.id);
                                                            return updatedComments;
                                                        });
                                                    }}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        ))}
                                        <input
                                            type="text"
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            placeholder="Add a comment..."
                                        />
                                        <button
                                            onClick={() => handleCommentSubmit(post.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
                                        >
                                            Post
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </>
                }
            </div>
            {/* Story Modal */}
            {selectedStory && (
                <div onClick={closeStory} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="w-[400px] h-[510px]">
                        <div className="relative">
                            {selectedStory.type === 'video' ? (
                                <video className="h-[500px] w-[500px] object-cover rounded-lg" src={selectedStory.src} autoPlay controls />
                            ) : (
                                <img className="h-[500px] w-[500px] object-cover rounded-lg" src={selectedStory.src} alt="Story" />
                            )}
                            <button
                                onClick={closeStory}
                                className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 p-2 rounded-full"
                            >
                                &times;
                            </button>
                            <button
                                onClick={deleteStory}
                                className="absolute top-2 left-2 text-white text-2xl font-bold bg-red-600 bg-opacity-50 p-2 rounded-full flex items-center"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedMenuItem !== 'Profile' &&
                <div className="w-1/5 p-4 border-l bg-white">
                    <div className="mb-8">
                        <div className="flex items-center space-x-4">
                            <img className="w-16 h-16 rounded-full" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ718nztPNJfCbDJjZG8fOkejBnBAeQw5eAUA&s' />
                            <div>
                                <p className="font-semibold">azevde_ddr</p>
                                <p className="text-sm text-gray-500">Azevedo</p>
                            </div>
                            <button className="text-blue-500 text-sm font-semibold">Switch</button>
                        </div>
                    </div>
                    <Suggestions />
                </div>
            }
        </div>
    );
}

export default Home;
