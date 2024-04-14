import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function AboutMe() {
  const [personalInfo, setPersonalInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    // Fetch personal information
    axios.get('http://localhost:8000/api/personal-information')
      .then(response => {
        console.log(response.data);
        setPersonalInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching personal information:', error);
      });

    // Fetch education data
    axios.get('http://localhost:8000/api/educations')
      .then(response => {
        console.log(response.data);
        setEducation(response.data);
      })
      .catch(error => {
        console.error('Error fetching education data:', error);
      });

    // Fetch experience data
    axios.get('http://localhost:8000/api/experiences')
      .then(response => {
        console.log(response.data);
        setExperience(response.data);
      })
      .catch(error => {
        console.error('Error fetching experience data:', error);
      });

  }, []);

  // Check if data is still loading
  if (!personalInfo || !education || !experience) {
    return <div>Loading...</div>;
  }

  return (
    <section id="AboutMe" className="about--section">
      <div className="about--section--img">
        {/* Display personal image */}
        {personalInfo.map((item) => (
          <img
            key={item._id}
            src={`http://localhost:8000/${item.images}`}
            alt="About Me"
            style={{ borderRadius: '50%', width: '70%', height: '70%' }}
          />
        ))}
      </div>
      <div className="hero--section--content--box about--section--box">
        <div className="hero--section--content">
          <div className="skills-section">
          {personalInfo.map((item) => (
            <p
              key={item._id}
              className="hero--section-description"
              style={{ fontSize: '40px', textAlign:"center",border:"2px solid black", lineHeight: '1.5', color: '#333' }}
            >
             <b  >{item.first_name} {item.last_name}</b> 
            </p>
          ))}
          <br />
            <h1 className="skills-section--heading">Profile</h1>
            <p>
              Full Stack Developer with a fervent enthusiasm for crafting elegant and functional websites. Equipped with a solid foundation in web development, I thrive on bringing creative ideas to life through code. With a keen eye for design and a commitment to delivering exceptional user experiences, I am dedicated to continuous learning and growth in the ever-evolving landscape of technology.
            </p>
            <h2>Key Skills:</h2>
            <ul>
              <li>Proficient in front-end technologies such as HTML, CSS, JavaScript, and React.</li>
              <li>Experienced in back-end development using Node.js, Express, and MongoDB.</li>
              <li>Skilled in database management and optimization.</li>
              <li>Familiar with Agile methodologies and collaborative development environments.</li>
              <li>Strong problem-solving abilities and a proactive approach to challenges.</li>
            </ul>
          </div>

          {/* Display personal information */}
          
          {/* Display education */}
          <h2 className="section-title">Education</h2>
          <div className="education-list">
            {education.map(edu => (
              <div key={edu.id} className="education-item">
                <p><strong>{edu.degree}</strong> - {edu.institution}</p>
                <p>{edu.start_date} - {edu.end_date}</p>
              </div>
            ))}
          </div>
          {/* Display experience */}
          <h2 className="section-title">Experience</h2>
          <div className="experience-list">
            {experience.map(exp => (
              <div key={exp.id} className="experience-item">
                <p><strong>{exp.title}</strong> - {exp.company}</p>
                <p>{exp.start_date} - {exp.end_date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
