type Department = {
  name: string;
  description: string;
  email: string;
  questions: string[];
};

export const departments: Record<string, Department> = {
  "rj-tamil": {
    name: "RJ Tamil",
    description: "Host, engage and entertain Tamil-speaking audiences.",
    email: "rj.tamil@club.com",
    questions: [
      "Why are you interested in this department?",
      "Explain your previous experience in this department.",
      "Do you have any sample recordings or projects?",
      "Please provide links to your recordings/projects.",
    ],
  },
  "design": {
    name: "Design",
    description: "Create visuals for club promotions and events.",
    email: "design@club.com",
    questions: [
      "Why are you interested in this department?",
      "Explain your previous experience in design.",
      "Do you have a design portfolio?",
      "Please provide portfolio links (Dribbble, Behance, etc.).",
    ],
  },
  "technical": {
    name: "Technical",
    description: "Build websites, apps, and solve tech issues.",
    email: "black.goku.007.279@gmail.com",
    questions: [
      "Why are you interested in this department?",
      "What technical skills do you have?",
      "Have you built any projects?",
      "Provide GitHub or project links.",
    ],
  },
  "content": {
    name: "Content",
    description: "Write compelling content for campaigns, events, and social media.",
    email: "content@club.com",
    questions: [
      "Why are you interested in this department?",
      "Have you written blogs, scripts, or stories before?",
      "Share some samples or links to your work.",
    ],
  },
  "hr": {
    name: "HR",
    description: "Manage communication and coordination between club members.",
    email: "hr@club.com",
    questions: [
      "Why are you interested in this department?",
      "Have you worked in teams or led any group initiatives before?",
    ],
  },
  "editing": {
    name: "Editing",
    description: "Edit videos, podcasts, and other media content.",
    email: "editing@club.com",
    questions: [
      "Why are you interested in editing?",
      "What tools do you use (Premiere Pro, DaVinci, etc.)?",
      "Provide links to edited works.",
    ],
  },
  "camera": {
    name: "Camera",
    description: "Capture moments, events, and club activities with a creative eye.",
    email: "camera@club.com",
    questions: [
      "Why are you interested in photography/videography?",
      "Do you have experience handling camera equipment?",
      "Provide links to your media work.",
    ],
  },
  "events-and-sponsors": {
    name: "Events & Sponsors",
    description: "Plan events and approach sponsors for collaborations.",
    email: "events@club.com",
    questions: [
      "Why are you interested in this department?",
      "Have you organized or helped in any events before?",
    ],
  },
  "sponsorship": {
    name: "Sponsorship",
    description: "Secure sponsorships and build partnerships for club activities.",
    email: "sponsorship@club.com",
    questions: [
      "Why are you interested in sponsorship?",
      "Have you pitched ideas or negotiated before?",
    ],
  },

  // Add the rest of the RJ departments similarly...
  "rj-english": {
    name: "RJ English",
    description: "Engage and broadcast to English-speaking audiences.",
    email: "rj.english@club.com",
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-telugu": {
    name: "RJ Telugu",
    description: "Engage and broadcast to Telugu-speaking audiences.",
    email: "rj.english@club.com",
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-malayalam": {
    name: "RJ Malayalam",
    description: "Engage and broadcast to Malayalam-speaking audiences.",
    email: "rj.english@club.com",
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-hindi": {
    name: "RJ Hindi",
    description: "Engage and broadcast to hindi-speaking audiences.",
    email: "rj.english@club.com",
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },

};
