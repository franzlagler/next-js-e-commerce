INSERT INTO reviews (author, description)
VALUES
  ('Donald Trump', 'Oh my god. Their products are just beautiful. I literally fell in love with them. Totally gonna recommend.'),
  ('Bernie Sanders', 'As a big supporter of working class people and small enterprises, I can totally recommend this candy store.'),
  ('Hillary Clinton', 'I support literally any person or company as long as they''re going to vote for me. ');


CREATE Table reviews(
  id SERIAL,
  author VARCHAR(30),
  description VARCHAR(180)
);

CREATE Table orders(
  order_id SERIAL,
  date DATE REQUIRED,
  address VARCHAR(100) REQUIRED,
  total_price FLOAT,
);