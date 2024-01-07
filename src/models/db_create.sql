
CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    level TEXT NOT NULL,
    number_question INT NOT NULL
);

CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    doc_link VARCHAR(255) NOT NULL,
    quiz_id INT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quiz(id)
);

CREATE TABLE proposition (
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    is_true BOOLEAN NOT NULL,
    question_id INT NOT NULL,
    FOREIGN KEY (question_id) REFERENCES question(id)
);