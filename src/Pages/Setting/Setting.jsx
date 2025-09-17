import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Setting = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const auth = getAuth();
  const db = getFirestore();

  // Fetch the user info from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = auth.currentUser;
      if (userData) {
        setUser(userData);
        setName(userData.displayName || '');
        setEmail(userData.email || '');
        setProfilePic(userData.photoURL || '');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [auth]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    setLoading(true);

    try {
      if (name && email) {
        // Update the Firebase Auth profile
        await updateProfile(auth.currentUser, { displayName: name, photoURL: profilePic });

        // Update the Firestore database if needed
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name, email });

        toast.success('Profile updated successfully!');
      } else {
        toast.error('Please fill in all fields.');
      }
    } catch (error) {
      toast.error('Error updating profile: ' + error.message);
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Error logging out: ' + error.message);
    }
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-xl shadow-lg md:mt-20">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate__animated animate__fadeIn animate__delay-1s">Account Settings</h1>

      {/* Profile Section */}
      <div className="flex justify-center items-center mb-8">
        <div className="relative">
          <img
            src={profilePic || 'https://www.w3schools.com/w3images/avatar2.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full mr-6 border-4 border-yellow-400 hover:scale-110 transform transition duration-500 ease-in-out shadow-xl"
          />
          <div className="absolute bottom-0 right-0 bg-yellow-400 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-500 transition duration-300">
            <span className="font-semibold">Edit</span>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{name || 'User Name'}</h2>
          <p className="text-sm text-gray-100">{email || 'user@example.com'}</p>
        </div>
      </div>

      {/* Profile Update Form */}
      <div className="space-y-6">
        <div>
          <label className="block text-white text-lg font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-300 ease-in-out"
          />
        </div>

        <div>
          <label className="block text-white text-lg font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-300 ease-in-out"
            disabled
          />
        </div>

        <div>
          <label className="block text-white text-lg font-semibold">Profile Picture URL</label>
          <input
            type="url"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition duration-300 ease-in-out"
            placeholder="Paste a URL for your profile picture"
          />
        </div>

        <div className="flex justify-center space-x-6 mt-8">
          <button
            className="bg-yellow-400 text-black px-8 py-4 rounded-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
            onClick={handleUpdateProfile}
          >
            Update Profile
          </button>
          <button
            className="bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
