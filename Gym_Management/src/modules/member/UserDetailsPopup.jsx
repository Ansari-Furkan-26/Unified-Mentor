import { useEffect, useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { useAuth } from '../../contexts/authContext'

const UserDetailsPopup = () => {
    const { currentUser } = useAuth()
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPopup, setShowPopup] = useState(false)

    const db = getDatabase()

    useEffect(() => {
        const userDetailsSubmitted = localStorage.getItem(`userDetailsSubmitted_${currentUser?.uid}`)

        if (currentUser && !userDetailsSubmitted) {
            setShowPopup(true)
            // Disable body scroll when popup is open
            document.body.style.overflow = 'hidden'
        } else {
            // Reset body scroll if already submitted
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !contact || !gender || !address) {
            alert('All fields are required!')
            return
        }

        setLoading(true)
        try {
            await set(ref(db, 'users/' + currentUser.uid), {
                name,
                contact,
                gender,
                address,
                email: currentUser.email,
            })

            localStorage.setItem(`userDetailsSubmitted_${currentUser.uid}`, 'true')
            setShowPopup(false)

            // Enable body scroll after submission
            document.body.style.overflow = ''

            // Refresh the page
            window.location.reload()
        } catch (error) {
            console.error('Error saving data:', error)
            alert('Failed to save user details. Try again!')
        } finally {
            setLoading(false)
        }
    }

    if (!showPopup) return null

    return (
        <div className="fixed inset-0 px-4 bg-blue-100 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 text-center">Complete Your Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-800 font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg p-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 font-medium">Contact Number</label>
                        <input
                            type="tel"
                            className="w-full border rounded-lg p-2"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-800 font-medium">Gender</label>
                        <select
                            className="w-full border rounded-lg p-2"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-800 font-medium">Address</label>
                        <textarea
                            className="w-full border rounded-lg p-2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold disabled:bg-blue-300"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UserDetailsPopup