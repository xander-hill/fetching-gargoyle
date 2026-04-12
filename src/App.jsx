import { useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient'

function App() {
  // State to manage form data - this is your "Data Processing" starting point
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, message } = formData;

    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Error saving data:", error.message);
      alert("System error. Workflow failed.");
    } else {
      console.log("Data structured and saved:", data);
      alert("Success! Your inquiry has been processed into the LLC dashboard.");
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="container">
      {/* 1. HERO SECTION: Professional Branding */}
      <header className="hero-section">
        <h1>Fetching Gargoyle Systems & Development</h1>
        <p>Providing high-performance software contract solutions.</p>
        <div className="badge">Available for Q3 2026 Contracts</div>
      </header>

      {/* 2. SERVICES: Responsive Grid */}
      <section className="services-grid">
        <div className="card">
          <h3>Custom Development</h3>
          <p>Full-stack applications tailored to specific business logic.</p>
        </div>
        <div className="card">
          <h3>Data Automation</h3>
          <p>Streamlining workflows and reducing manual intervention.</p>
        </div>
        <div className="card">
          <h3>System Architecture</h3>
          <p>Designing scalable, reliable infrastructure for modern web apps.</p>
        </div>
      </section>

      {/* 3. THE INQUIRY FORM: Your Backend Entry Point */}
      <section className="form-container">
        <h2>Project Inquiry</h2>
        <p>Fill out the form below to initiate a structured data workflow.</p>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <input 
            type="text" 
            name="name" 
            placeholder="Client Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <textarea 
            name="message" 
            placeholder="Briefly describe the project scope..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="submit-btn">Submit Project Request</button>
        </form>
      </section>

      <footer>
        <p>© 2026 Fetching Gargoyle. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
