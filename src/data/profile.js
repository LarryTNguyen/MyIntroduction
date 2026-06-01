const assetBase = import.meta.env.DEV || import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
const assetPath = (path) => `${assetBase}${path}`;

export const profile = {
  name: 'Larry Nguyen',
  initials: 'LN',
  tagline: 'MS Software Eng - UC San Diego ML - San Jose, CA',
  heroTitle: "Hi, I'm Larry Nguyen.",
  heroBio:
    'Welcome to my website! I am currently pursuing my master\'s degree in software engineering at San Jose State University while having a bachelor\'s in machine learning from the University of California, San Diego. My main technical interests revolve around architecting distributed systems and training ML models. Besides focusing on technology, I enjoy watching all kinds of movies while also listening to a wide array of music genres. Go check out my recent and past reviews of the movies and albums I have consumed!',
  email: 'larrynguyen4567@gmail.com',
  adminEmail: 'larrynguyen4567@gmail.com',
  location: 'San Jose, CA',
  resumePath: assetPath('/assets/Nguyen_Larry_Resume.pdf'),
  photoPath: assetPath('/assets/larry-photo.jpg'),
  links: {
    linkedin: 'https://www.linkedin.com/in/larry-t-nguyen/',
    github: 'https://github.com/LarryTNguyen',
  },
};
