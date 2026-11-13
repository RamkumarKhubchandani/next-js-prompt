// Update value, count, and asOf whenever the Google Business profile changes.
export const GOOGLE_RATING = {
  value: "5.0",
  count: 24,
  asOf: "2026-11-12",
  profileUrl: "https://share.google/3mpLWkHvvZfR1aPHj",
};

export function formatAsOfDate(asOf) {
  if (!asOf) return '';
  const [year, month] = asOf.split('-');
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export const REAL_REVIEWS = [
  {
    name: "Khanak Tyagi",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Khanak+Tyagi&background=random&color=fff",
    text: "Today's session was very knowledgeable and I experienced and learn new thing very clearly thankyou sir ☺️",
    stars: 5,
    skills: []
  },
  {
    name: "Nitin Jangra",
    role: "React Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Nitin+Jangra&background=random&color=fff",
    text: "Ramkumar Sir provided exceptionally detailed and precise instruction for the React AI course. He presented the material in a way that made it feel straightforward, and his teaching experience clearly reflected current best practices in coding.",
    stars: 5,
    skills: ['react', 'ai']
  },
  {
    name: "Komal Sharma",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Komal+Sharma&background=random&color=fff",
    text: "Today's session was truly amazing and full of valuable knowledge and insightful points. I learned so many new things today, and every point was really informative and helpful.",
    stars: 5,
    skills: []
  },
  {
    name: "Rankita Sulya",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Rankita+Sulya&background=random&color=fff",
    text: "The session was really informative and easy to understand. I learned many new HTML concepts and improved my basics. It was a great learning experience!",
    stars: 5,
    skills: ['html']
  },
  {
    name: "Smitesh Solanki",
    role: "Frontend Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Smitesh+Solanki&background=random&color=fff",
    text: "Its very informative and perfect website, I got good help and one to one support for JavaScript and React. The Group training of React and Angular was amazing.",
    stars: 5,
    skills: ['javascript', 'react']
  },
  {
    name: "Shweta Rajput",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Shweta+Rajput&background=random&color=fff",
    text: "This website is really good.. have gained a lot of knowledge from here whether it be React, JS and so on and the mentors are very supportive and helpful.",
    stars: 5,
    skills: ['react', 'javascript']
  },
  {
    name: "Riya Shelar",
    role: "Web Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Riya+Shelar&background=random&color=fff",
    text: "The one-on-one mentorship was an incredible learning experience and had a significant impact on both my technical skills and my confidence as a developer. I was able to develop a strong foundation in JavaScript, CSS, React, and Chakra UI.",
    stars: 5,
    skills: ['javascript', 'react', 'html']
  },
  {
    name: "Nitesh More",
    role: "Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Nitesh+More&background=random&color=fff",
    text: "Thank you for your invaluable guidance, support, and mentorship throughout my learning journey. Your encouragement and knowledge sharing have helped me grow significantly in React JS, Angular, and AI.",
    stars: 5,
    skills: ['react', 'ai']
  },
  {
    name: "vick",
    role: "Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=vick&background=random&color=fff",
    text: "One-on-one mentorship that completely changed how I approach coding. I highly recommend this platform to any developer looking to level up their react, JavaScript and node js skills quickly.",
    stars: 5,
    skills: ['react', 'javascript', 'nodejs']
  },
  {
    name: "Arpita Padasali",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Arpita+Padasali&background=random&color=fff",
    text: "It's was amezing experience",
    stars: 5,
    skills: []
  },
  {
    name: "Manisha Dhole",
    role: "Software Engineer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Manisha+Dhole&background=random&color=fff",
    text: "From Zero to Placed: The Best Decision for My Tech Career. OutlineDev provided top-tier training in modern frontend and AI full stack technologies. The highlight of the entire journey was the one-on-one mentorship by Ramkumar. His deep technical knowledge and patient, practical approach helped me master React and AI integrations efficiently. Most importantly, the practical training directly helped me land my job. OutlineDev is definitely the top institute if you want practical full stack training with genuine, personal mentorship. Highly recommended!",
    stars: 5,
    skills: ['react', 'ai']
  },
  {
    name: "Swapnali Pokale",
    role: "Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Swapnali+Pokale&background=random&color=fff",
    text: "The mentor provided excellent guidance throughout the training on Next.js and Node.js. The concepts were explained clearly with practical examples, making it easier to understand both the fundamentals and real-world application. The mentor was approachable, supportive, and always willing to clarify doubts. The sessions were well-structured and helped improve my technical understanding and confidence. Overall, it was a very valuable learning experience.",
    stars: 5,
    skills: ['nextjs', 'nodejs']
  },
  {
    name: "Parakh Jain",
    role: "Software Developer",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=Parakh+Jain&background=random&color=fff",
    text: "The React and JavaScript concepts are explained in a clear and practical way. The advanced patterns, architecture, and core concepts helped me build more scalable and efficient applications. Highly recommended!",
    stars: 5,
    skills: ['react', 'javascript']
  },
  {
    name: "akshanoor siddiqui",
    role: "Student",
    company: "",
    source: "Google",
    img: "https://ui-avatars.com/api/?name=akshanoor+siddiqui&background=random&color=fff",
    text: "Sir, today's React class was really helpful and easy to understand. Thank you, Sir!",
    stars: 5,
    skills: ['react']
  }
];
