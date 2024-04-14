import axios from 'axios';
import React, { useState, useEffect } from 'react';


export default function HeroSection() {
  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    // Fetch data from API
    axios.get('http://localhost:8000/api/personal-information')
      .then(response => {
        console.log(response.data); 
        setPersonalInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  if (!personalInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section id="heroSection" className="hero--section">
      {personalInfo.map((item) => (
        <div key={item._id} className="hero--section--content--box">
          <div className="hero--section--content">
            <p className="section--title">Hey, {item.first_name} {item.last_name}</p>
            <h1 className="hero--section--title">
              <span className="hero--section-title--color">Full Stack</span>{" "}
              <br />
              Developer
            </h1>
            <p className="hero--section-description">
              I am a Full Stack Developer with a passion for building
              beautiful and functional websites. I have a strong background
              in web development and I am always looking for opportunities to
              improve my skills.
            </p>
          </div>

          <button type="button" className="btn btn-primary">Get In Touch</button>
        </div>
      ))}

      <div className="hero--section--img" style={{ marginTop: '60px' }}>
        {personalInfo.map((item) => (
          <img key={item._id} src={`http://localhost:8000/${item.images}`} alt="Hero Section" style={{ borderRadius: '80%', width: '50%', height: '80%',marginLeft:'30%' }} />

          // <Avatar key={item._id} alt={`${item.first_name} ${item.last_name}`} src={`http://localhost:8000/${item.images}`} sx={{ width: 300, height: 300 }} />
        ))}
      </div>

    </section>
  );
}
