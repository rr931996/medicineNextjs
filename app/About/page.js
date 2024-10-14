"use client"; // Ensure this is a client-side component

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">About Me</h2>
        <p className="text-gray-600 text-center">
          Hello, I am Rishabh! 
          <br />
          <br />
          I am a frontend developer with 3.7 years of experience, including 3.2 years specializing in React development. 
          I am passionate about building interactive and user-friendly web applications using technologies like 
          JavaScript, ReactJS, Next JS, Redux, Mobx, and UI design.
        </p>
      </div>
    </div>
  );
};

export default About;
