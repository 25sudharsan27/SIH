import React, { useState, useEffect } from 'react';
import './Community.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import post1 from './components/Images/post1.jpeg';
import post2 from './components/Images/post2.jpeg';
import post3 from './components/Images/post3.jpeg';
import post4 from './components/Images/post4.jpeg';
import post5 from './components/Images/post5.jpeg';
import post6 from './components/Images/post6.jpeg';
import UserNavbar from './components/usernavbar';

const Posts = () => {
  // Sample post data
  const samplePosts = [
    {
      "_id": "1",
      "user_id": "user1",
      "src": post1,
      "title": "The Future of Artificial Intelligence in Healthcare",
      "description": "Artificial intelligence (AI) is transforming healthcare at an unprecedented rate. From diagnostics to treatment planning, AI systems can analyze vast amounts of data and detect patterns that are impossible for humans to identify. Machine learning algorithms are now being used to predict patient outcomes, customize treatment plans, and even discover new drugs. However, the adoption of AI in healthcare comes with challenges, such as ensuring data privacy, reducing biases in algorithms, and maintaining a human touch in care. Despite these hurdles, AI holds great promise for improving healthcare delivery, reducing costs, and saving lives in the years to come.",
      "like": 42,
      "comment": [
        { "user_id": "userA", "text": "Incredible potential for AI to improve healthcare outcomes!" },
        { "user_id": "userB", "text": "Ethics and privacy will be big concerns going forward." }
      ]
    },
    {
      "_id": "2",
      "user_id": "user2",
        "src": post2,
      "title": "Blockchain: The Key to Secure Digital Transactions",
      "description": "Blockchain technology has revolutionized how we think about secure digital transactions. Originally designed for Bitcoin, blockchain is a decentralized, distributed ledger that records transactions across many computers so that the record cannot be altered retroactively. This has applications far beyond cryptocurrency, including supply chain management, secure voting systems, and digital identity verification. Businesses are increasingly adopting blockchain for its transparency, security, and efficiency. However, challenges remain in terms of scalability, regulatory hurdles, and energy consumption. As the technology matures, we may see blockchain become a standard for secure, tamper-proof transactions in many industries.",
      "like": 35,
      "comment": [
        { "user_id": "userC", "text": "Blockchain could change how we trust online systems." },
        { "user_id": "userD", "text": "Curious about how blockchain will evolve over the next decade!" }
      ]
    },
    {
      "_id": "3",
      "user_id": "user3",
        "src": post3,
      "title": "5G Technology: The Next Revolution in Connectivity",
      "description": "5G is more than just a faster version of 4G; it’s a complete transformation of how devices communicate with each other and the cloud. With speeds up to 100 times faster than 4G and latency as low as 1 millisecond, 5G technology promises to enable everything from self-driving cars to smart cities and advanced augmented reality applications. As telecom companies roll out 5G across the globe, industries like healthcare, manufacturing, and entertainment are expected to see massive innovation. However, the deployment of 5G networks faces challenges, including the need for new infrastructure, high energy consumption, and concerns over potential health impacts.",
      "like": 27,
      "comment": [
        { "user_id": "userE", "text": "Can’t wait for 5G to go mainstream, it will change everything!" },
        { "user_id": "userF", "text": "There are so many misconceptions about 5G, people need to be informed." }
      ]
    },
    {
      "_id": "4",
      "user_id": "user4",
        "src": post4,
      "title": "The Impact of Quantum Computing on Cryptography",
      "description": "Quantum computing represents a monumental leap forward in computational power, with implications for many fields, including cryptography. Classical computers use bits, which are either 0 or 1, but quantum computers use qubits, which can exist in multiple states simultaneously. This allows quantum computers to solve certain problems exponentially faster than classical computers. One of the major areas of concern is cryptography, as many of the encryption methods used today could be broken by powerful quantum algorithms. However, researchers are already developing quantum-resistant algorithms to secure our digital communications in the quantum future.",
      "like": 50,
      "comment": [
        { "user_id": "userG", "text": "Quantum computing could disrupt how we secure our data." },
        { "user_id": "userH", "text": "What can we do today to prepare for quantum threats?" }
      ]
    },
    {
      "_id": "5",
      "user_id": "user5",
        "src": post5,
      "title": "Cybersecurity in the Age of Remote Work",
      "description": "The COVID-19 pandemic has accelerated the shift to remote work, and with it, the need for robust cybersecurity measures. As employees access sensitive company data from home networks, businesses face increased risks from cyberattacks, phishing schemes, and data breaches. Traditional security perimeters no longer apply, and companies are turning to solutions like zero-trust architecture, endpoint security, and multi-factor authentication to safeguard their operations. With cybercriminals becoming more sophisticated, it’s crucial for businesses to continually update their security strategies to mitigate risks in this new era of remote work.",
      "like": 38,
      "comment": [
        { "user_id": "userI", "text": "Remote work has definitely increased the need for better security." },
        { "user_id": "userJ", "text": "Zero-trust is becoming the standard for all companies." }
      ]
    },
    
  ]
  

  // Using the samplePosts array for now
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Simulating the fetching of posts by using static data
    setPosts(samplePosts);
  }, []);

  return (
    <div>
    <UserNavbar/>

    <div className="posts-container">
      
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post._id}>
              <div className="post-image">
                {/* Assuming you have a way to include image URLs */}
                <img className="postimage" src={post.src} alt={post.title} />
              </div>
              <div className="post-content">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <div className="post-info">
                  <span>Date: 12/09/2024</span> {/* You can replace with real date */}
                  <div className="post-actions">
                    <button className="like-button">
                      <i className="fa fa-thumbs-up"></i> {post.like}
                    </button>
                    <button className="comment-button">
                      <i className="fa fa-comments"></i> {post.comment.length}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Posts;
