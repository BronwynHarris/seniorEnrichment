const { Campus, Student, db } = require("./server/db");
console.log(Campus, Student, db);
const campuses = [
  {
    name: "Rutgers",
    image:
      "https://collegecandy.files.wordpress.com/2015/09/rutgers-university-campus.jpg?quality=88&strip=all"
  },

  {
    name: "TCNJ",
    image:
      "https://oneclassblog.com/wp-content/uploads/2017/09/tcnjs-green-hall-d792a72d42b5039f-1.jpg"
  },

  {
    name: "Rowan",
    image:
      "https://today.rowan.edu/home/sites/default/files/styles/image_crop/public/news-assets/news-photos/2013/final_4539_cc.jpeg?itok=Cgm_tRQQ"
  },

  {
    name: "Princeton",
    image: "https://www.princeton.edu/themes/custom/tony/logo.svg"
  },

  {
    name: "Ramapo",
    image: "https://www.nse.org/docs/campuses/70.jpg"
  }
];

const students = [
  {
    firstName: "Jack",
    lastName: "Smith",
    email: "tb@tb.com",
    image:
      "http://soucyagency.com/blog/wp-content/uploads/2012/08/female-college-student1.jpg",
    campusId: 1
  },

  {
    firstName: "Elizabeth",
    lastName: "Dawn",
    email: "ms@ms.com",
    image:
      "http://soucyagency.com/blog/wp-content/uploads/2012/08/female-college-student1.jpg",
    campusId: 2
  },

  {
    firstName: "Chase",
    lastName: "Cross",
    email: "pm@pm.com",
    image:
      "http://soucyagency.com/blog/wp-content/uploads/2012/08/female-college-student1.jpg",
    campusId: 3
  },

  {
    firstName: "John",
    lastName: "Harrison",
    email: "jw@jw.com",
    image:
      "http://soucyagency.com/blog/wp-content/uploads/2012/08/female-college-student1.jpg",
    campusId: 4
  },
  {
    firstName: "Jay",
    lastName: "May",
    email: "jc@jc.com",
    image:
      "http://soucyagency.com/blog/wp-content/uploads/2012/08/female-college-student1.jpg",
    campusId: 5
  }
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(campuses.map(campus => Campus.create(campus)));
    await Promise.all(students.map(student => Student.create(student)));

    console.log("Done!");
    db.close();
  } catch (err) {
    console.error("Something went wrong!", err.message);
    db.close();
  }
};

seed();
