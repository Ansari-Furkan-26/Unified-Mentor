import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../contexts/authContext';
import { getDatabase, ref, get, set } from 'firebase/database';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaEdit, FaInfoCircle } from 'react-icons/fa';

const MembershipDetails = () => {
  const { currentUser } = useAuth();
  const db = getDatabase();
  const billRef = useRef();

  const [userDetails, setUserDetails] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = ref(db, `users/${currentUser.uid}`);
      const planRef = ref(db, `userPlans/${currentUser.uid}`);

      const userSnap = await get(userRef);
      const planSnap = await get(planRef);

      if (userSnap.exists()) {
        setUserDetails(userSnap.val());
      } else {
        setUserDetails({
          name: currentUser.email.split('@')[0],
          contact: '',
          gender: '',
          address: '',
        });
      }

      if (planSnap.exists()) {
        setPlanDetails(planSnap.val());
      } else {
        setPlanDetails({
          plan: 'None',
          price: 'N/A',
          expiryDate: 'N/A',
        });
      }
    };

    fetchUserData();
  }, [db, currentUser]);

  const handleUpdate = async () => {
    const updatedDetails = {
      name,
      contact,
      gender,
      address,
    };

    await set(ref(db, `users/${currentUser.uid}`), updatedDetails);
    setUserDetails(updatedDetails);
    setIsEditing(false);
  };

  const downloadReceipt = () => {
    html2canvas(billRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save('membership_receipt.pdf');
    });
  };

  return (
    <div className='mt-16 flex flex-wrap gap-10'>
      {/* Left Section */}
      <div className='hidden md:flex flex-col justify-between items-center text-center bg-gray-100 p-6 rounded-lg flex-grow'>
        <h1 className='text-gray-100'>.</h1>
        <div>
          <p className='text-gray-400'>Exceed standards in Elite Strength</p>
          <h1 className='text-5xl md:text-7xl font-extrabold leading-tight'>Your Future, Our Mission</h1>
        </div>

        <div className='flex justify-between items-center mt-10 w-full'>
          <a href="#membership"><button className='text-white rounded-xl bg-black px-4 py-2 flex items-center gap-2'>
            <FaInfoCircle /> Learn More
          </button></a>
          <a href="https://frontendgenie.netlify.app/" target="_blank" rel="noopener noreferrer">
            <div className='flex items-center gap-3'>
              <p className='font-semibold'>FrontendGenie</p>
              <img src="https://i.pinimg.com/736x/be/1e/01/be1e01355047c14c41241186eb8690f4.jpg" alt="Furqan Profile" className='w-12 h-12 rounded-full' />
            </div>
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div ref={billRef} className="p-6 bg-white shadow-md rounded-lg w-full relative md:max-w-md lg:max-w-lg">
        <h2 className="text-2xl text-center font-bold mb-4">Membership Details</h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmMX0XrBnk9GaRXGzYxEQG4QP2DU_z5Wncdg&s"
            alt="Profile"
            className="w-32 h-32 rounded-full mb-3 md:w-24 md:h-24"
          />
          <p className="text-lg font-semibold">{userDetails?.name}</p>
        </div>

        <div className="space-y-3">
          {isEditing ? (
            <>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full rounded" />
              <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} className="border p-2 w-full rounded" />
              <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} className="border p-2 w-full rounded" />
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="border p-2 w-full rounded" />
            </>
          ) : (
            <div className="pt-4 px-4">
              <p><strong>Contact:</strong> {userDetails?.contact || 'N/A'}</p>
              <p><strong>Gender:</strong> {userDetails?.gender || 'N/A'}</p>
              <p><strong>Address:</strong> {userDetails?.address || 'N/A'}</p>
            </div>
          )}

          <div className="bg-gray-100 p-4 rounded shadow">
            <p><strong>Current Plan:</strong> {planDetails?.plan || 'None'}</p>
            <p><strong>Price:</strong> {planDetails?.price || 'N/A'}</p>
            <p><strong>Expiry Date:</strong> {planDetails?.expiryDate || 'N/A'}</p>
          </div>

          {planDetails?.plan && (
            <button onClick={downloadReceipt} className="bg-green-500 text-white px-4 py-2 rounded w-full flex justify-center gap-2 items-center">
              <FaDownload /> Download Receipt
            </button>
          )}

          <button
            onClick={() => {
              if (isEditing) handleUpdate();
              else {
                setName(userDetails?.name || '');
                setContact(userDetails?.contact || '');
                setGender(userDetails?.gender || '');
                setAddress(userDetails?.address || '');
                setIsEditing(true);
              }
            }}
            className="bg-indigo-500 text-white px-4 py-2 rounded w-full flex justify-center gap-2 items-center"
          >
            <FaEdit /> {isEditing ? 'Update' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipDetails;
