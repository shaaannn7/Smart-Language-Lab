const Database = require('better-sqlite3');
const db = new Database('dev.db');

const lessons = [
  {
    id: "greeting-introductions",
    title: "Greeting & Introductions",
    description: "Learn basic greetings and how to introduce yourself to others.",
    type: "VOCABULARY",
    difficulty: "BEGINNER",
    content: JSON.stringify({
      exercises: [
        { question: "How do you say 'Hello' in Spanish?", answer: "Hola" },
        { question: "How do you say 'Good morning'?", answer: "Buenos días" }
      ]
    })
  },
  {
    id: "essential-verbs",
    title: "Essential Verbs",
    description: "Master the 20 most commonly used verbs in everyday Spanish.",
    type: "GRAMMAR",
    difficulty: "BEGINNER",
    content: JSON.stringify({
      exercises: [
        { question: "Translate 'To be' (permanent)", answer: "Ser" },
        { question: "Translate 'To eat'", answer: "Comer" }
      ]
    })
  },
  {
    id: "business-negotiations",
    title: "Business Negotiations",
    description: "Navigate complex discussions and handle objections in a professional setting.",
    type: "SPEAKING",
    difficulty: "INTERMEDIATE",
    content: JSON.stringify({
      phrases: [
        "Estoy de acuerdo con su propuesta.",
        "¿Podemos discutir el presupuesto?",
        "Necesito más tiempo para revisar el contrato."
      ]
    })
  }
];

console.log("Seeding lessons via direct SQL...");

for (const lesson of lessons) {
  const row = db.prepare('SELECT id FROM Lesson WHERE id = ?').get(lesson.id);
  const now = new Date().toISOString();
  
  if (row) {
    db.prepare(`
      UPDATE Lesson 
      SET title = ?, description = ?, type = ?, difficulty = ?, content = ?, updatedAt = ? 
      WHERE id = ?
    `).run(lesson.title, lesson.description, lesson.type, lesson.difficulty, lesson.content, now, lesson.id);
    console.log(`Updated lesson: ${lesson.title}`);
  } else {
    db.prepare(`
      INSERT INTO Lesson (id, title, description, type, difficulty, content, createdAt, updatedAt) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(lesson.id, lesson.title, lesson.description, lesson.type, lesson.difficulty, lesson.content, now, now);
    console.log(`Inserted lesson: ${lesson.title}`);
  }
}

console.log("Seeding complete.");
db.close();
