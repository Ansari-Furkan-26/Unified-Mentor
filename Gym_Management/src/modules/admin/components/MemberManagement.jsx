import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, set, remove, push, onValue } from 'firebase/database';
import * as XLSX from 'xlsx';
import Modal from 'react-modal';
import { FaEdit, FaTrash, FaBell } from 'react-icons/fa';

Modal.setAppElement('#root');

const AdminMemberManagement = () => {
  const db = getDatabase();

  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    gender: '',
    address: '',
    plan: '',
    price: '',
    expiryDate: '',
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const membersRef = ref(db, 'users');
    const userPlansRef = ref(db, 'userPlans');
    const plansRef = ref(db, 'subscriptions');

    // Fetch Members & Plans
    onValue(membersRef, (snapshot) => {
      const usersData = snapshot.exists() ? snapshot.val() : {};

      onValue(userPlansRef, (plansSnapshot) => {
        const userPlansData = plansSnapshot.exists() ? plansSnapshot.val() : {};

        const membersArray = Object.entries(usersData).map(([id, member]) => ({
          id,
          ...member,
          plan: userPlansData[id]?.plan || '',
          price: userPlansData[id]?.price || '',
          expiryDate: userPlansData[id]?.expiryDate || '',
        }));

        membersArray.reverse();
        setMembers(membersArray);
      });
    });

    onValue(plansRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const plansArray = Object.entries(data).map(([key, value]) => ({
          name: value.title,
          price: value.price,
        }));
        setPlans(plansArray);
      }
    });
  }, [db]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'plan') {
      const selectedPlan = plans.find((plan) => plan.name === value);
      const price = selectedPlan ? selectedPlan.price : '';
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);

      setFormData({
        ...formData,
        plan: value,
        price,
        expiryDate: expiryDate.toISOString().split('T')[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddOrUpdateMember = async () => {
    const userId = editId || push(ref(db, 'users')).key;
    const membersRef = ref(db, `users/${userId}`);
    await set(membersRef, {
      name: formData.name,
      contact: formData.contact,
      gender: formData.gender,
      address: formData.address,
    });

    const userPlansRef = ref(db, `userPlans/${userId}`);
    await set(userPlansRef, {
      plan: formData.plan,
      price: formData.price,
      expiryDate: formData.expiryDate,
      selectedAt: new Date().toISOString(),
    });

    setModalOpen(false);
    resetForm();
  };

  const handleDeleteMember = async (id) => {
    await remove(ref(db, `users/${id}`));
    await remove(ref(db, `userPlans/${id}`));
  };

  const handleEditMember = (member) => {
    setFormData(member);
    setEditId(member.id);
    setModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      gender: '',
      address: '',
      plan: '',
      price: '',
      expiryDate: '',
    });
    setEditId(null);
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(members);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
    XLSX.writeFile(workbook, 'members.xlsx');
  };

  const handleSendReminder = (member) => {
    const message = `Hello ${member.name}, your membership is about to expire on ${member.expiryDate}. Please renew it.`;
    const url = `https://api.whatsapp.com/send?phone=+91${member.contact}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, '_blank');
  };

  return (
    <div className="pt-9 min-h-screen bg-gray-50">

      <h2 className="text-2xl">Member Management</h2>
      <div className="flex gap-4 mt-2 mb-4 text-sm">
        <button onClick={() => {resetForm();
            setModalOpen(true);}}
          className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Add Member
        </button>
        <button onClick={handleExportToExcel} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3">Name</th>
              <th className="border px-4 py-3">Contact</th>
              <th className="border px-4 py-3">Gender</th>
              <th className="border px-4 py-3">Address</th>
              <th className="border px-4 py-3">Plan</th>
              <th className="border px-4 py-3">Price</th>
              <th className="border px-4 py-3">Expiry Date</th>
              <th className="border px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td className="border px-4 py-3">{member.name}</td>
                <td className="border px-4 py-3">{member.contact}</td>
                <td className="border px-4 py-3">{member.gender}</td>
                <td className="border px-4 py-3">{member.address}</td>
                <td className="border px-4 py-3">{member.plan}</td>
                <td className="border px-4 py-3">₹{member.price}</td>
                <td className="border px-4 py-3">{member.expiryDate}</td>
                <td className="border px-4 py-3 flex gap-2">
                  <button onClick={() => handleEditMember(member)} className="text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteMember(member.id)} className="text-red-600">
                    <FaTrash />
                  </button>
                  <button onClick={() => handleSendReminder(member)} className="text-green-600">
                    <FaBell />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal         isOpen={modalOpen}         onRequestClose={() => setModalOpen(false)}         className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20"         overlayClassName="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center"       >          <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Member' : 'Add Member'}</h3>         <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border p-2 w-full mb-2" />         <input name="contact" value={formData.contact} onChange={handleInputChange} placeholder="Contact" className="border p-2 w-full mb-2" />         <input name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Gender" className="border p-2 w-full mb-2" />         <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="border p-2 w-full mb-2" />         <select name="plan" value={formData.plan} onChange={handleInputChange} className="border p-2 w-full mb-2">           <option value="">Select Plan</option>           {plans.map((plan) => (             <option key={plan.name} value={plan.name}>               {plan.name} - ₹{plan.price}             </option>           ))}         </select>          <button onClick={handleAddOrUpdateMember} className="bg-green-600 text-white px-4 py-2 rounded-lg w-full">           {editId ? 'Update' : 'Add'}         </button>       </Modal>
    </div>
  );
};

export default AdminMemberManagement;
