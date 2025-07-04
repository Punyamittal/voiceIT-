type Department = {
  name: string;
  description: string;
  email: string[];
  questions: string[];
};

export const departments: Record<string, Department> = {
  "rj-tamil": {
    name: "RJ Tamil",
    description: "Host, engage and entertain Tamil-speaking audiences.",
    email: ["rajaraman.k2023@vitstudent.ac.in,afzalahamed.a2023@vitstudent.ac.in,jeromeemmanuel.c2023@vitstudent.ac.in,mohanaramanan.d2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in this department?",
      "Explain your previous experience in this department.",
      "Do you have any sample recordings or projects?",
      "Please provide links to your recordings/projects.",
    ],
  },
  "technical": {
    name: "Technical",
    description: "Build websites, apps, and solve tech issues.",
    email: ["punya.mittal2024@vitstudent.ac.in","rishika.v2023@vitstudent.ac.in"],
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
    email: ["monica.s2023@vitstudent.ac.in,amirthavahini.v2022@vitstudent.ac.in"],
    questions: [
      "Why are you interested in this department?",
      "Have you written blogs, scripts, or stories before?",
      "Share some samples or links to your work.",
    ],
  },
  "hr": {
    name: "HR",
    description: "Manage communication and coordination between club members.",
    email: ["shanmitha.t2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in this department?",
      "Have you worked in teams or led any group initiatives before?",
    ],
  },
  "editing": {
    name: "Editing",
    description: "Edit videos, podcasts, and other media content.",
    email: ["adithya.s2023@vitstudent.ac.in,munisaparji.vs2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in editing?",
      "What tools do you use (Premiere Pro, DaVinci, etc.)?",
      "Provide links to edited works.",
    ],
  },
  "camera": {
    name: "Camera",
    description: "Capture moments, events, and club activities with a creative eye.",
    email: ["annamalai.n2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in photography/videography?",
      "Do you have experience handling camera equipment?",
      "Provide links to your media work.",
    ],
  },
  "events-and-sponsorship": {
    name: "Events & Sponsorship",
    description: "Plan events and approach sponsors for collaborations.",
    email: ["kaushik.saravanan2022@vitstudent.ac.in"],
    questions: [
      "Why are you interested in this department?",
      "Have you organized or helped in any events before?",
    ],
  },
  "rj-english": {
    name: "RJ English",
    description: "Engage and broadcast to English-speaking audiences.",
    email: ["tannya.pasricha2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-telugu": {
    name: "RJ Telugu",
    description: "Engage and broadcast to Telugu-speaking audiences.",
    email: ["abhishek.ts2023@vitstudent.ac.in,thipireddy.nishanth2023@vitstudent.ac.in"],
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-malayalam": {
    name: "RJ Malayalam",
    description: "Engage and broadcast to Malayalam-speaking audiences.",
    email: ["rj.english@club.com"],
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
  "rj-hindi": {
    name: "RJ Hindi",
    description: "Engage and broadcast to hindi-speaking audiences.",
    email: ["aman.virat2022@vitstudent.ac.in"],
    questions: [
      "Why are you interested in RJ (English)?",
      "Any prior experience in speaking, anchoring or podcasting?",
      "Provide voice clips or audio samples.",
    ],
  },
};
