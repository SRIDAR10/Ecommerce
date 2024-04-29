import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./Contact.css";
function Contact() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_0w41lul', 'template_0kaoz0q', form.current, 'mVHQhJi8-3UWaQuva')
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className='contact-container'>
      <h1 className='contact-heading'>Contact Us</h1>
      <div className='form-container'>
        <form ref={form} onSubmit={sendEmail} action='' className='form-control'>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input name='name' placeholder='Name' type='text' required/>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input name='email' placeholder='abc@gmail.com' type='text' required/>
          </div>
          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea
              name='message'
              cols={70}
              rows={5}
              placeholder='Type a Message...'
              required
            ></textarea>
          </div>
          <div className='flex justify-center'>
            <button className='btn-send'>Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
