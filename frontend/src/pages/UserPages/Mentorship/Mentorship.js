import React, { useState, useEffect } from 'react';
import './Mentorship.css';
import UserNavbar from '../../../components/UserNavbar/usernavbar';

// Sample mentor data
const mentorsData = [
    {
        id: 1,
        name: "John Doe",
        expertise: "Web Development",
        bio: "5 years of experience in full stack web development.",
        availability: true,
        slots: ["2024-09-20 10:00 AM", "2024-09-22 02:00 PM"]
    },
    {
        id: 2,
        name: "Jane Smith",
        expertise: "Data Science",
        bio: "Expert in data analysis and machine learning.",
        availability: true,
        slots: ["2024-09-19 03:00 PM", "2024-09-23 01:00 PM"]
    }
];

const MentorshipApp = () => {
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        setMentors(mentorsData);
    }, []);

    const handleMentorSelect = (mentor) => {
        setSelectedMentor(mentor);
        setSuccessMessage('');
    };

    const handleSubmitRequest = () => {
        if (!selectedMentor) return;

        const requests = JSON.parse(localStorage.getItem('counselingRequests')) || [];
        const selectedSlot = document.getElementById('slot-select').value;

        requests.push({
            mentorId: selectedMentor.id,
            userId: "user123",
            mentorName: selectedMentor.name,
            selectedSlot,
            topic: "Career Guidance",
            status: "Pending"
        });

        localStorage.setItem('counselingRequests', JSON.stringify(requests));
        setSuccessMessage('Request Submitted Successfully!');
    };

    return (
        <div  className="user-pages">
        <UserNavbar/>

        <div className="containe">
            <h1>Available Mentors</h1>
            <div id="mentor-list">
                {mentors.map(mentor => (
                    <div
                        key={mentor.id}
                        className="mentor-card"
                        onClick={() => handleMentorSelect(mentor)}
                    >
                        <h3>{mentor.name}</h3>
                        <p><strong>Expertise:</strong> {mentor.expertise}</p>
                        <p><strong>Availability:</strong> {mentor.availability ? "Available" : "Unavailable"}</p>
                    </div>
                ))}
            </div>

            {selectedMentor && (
                <div id="mentor-booking">
                    <h2>Book a Session</h2>
                    <p id="mentor-name">Name: {selectedMentor.name}</p>
                    <p id="mentor-bio">Bio: {selectedMentor.bio}</p>
                    <label htmlFor="slot-select">Select a Slot:</label>
                    <select id="slot-select">
                        {selectedMentor.slots.map((slot, index) => (
                            <option key={index} value={slot}>{slot}</option>
                        ))}
                    </select>
                    <button onClick={handleSubmitRequest}>Submit Request</button>
                    {successMessage && <p id="success-message">{successMessage}</p>}
                </div>
            )}
        </div>
        </div>
    );
};

export default MentorshipApp;
