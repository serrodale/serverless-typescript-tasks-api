CREATE TABLE tasks (
	id serial PRIMARY KEY,
	title VARCHAR (255) NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

CREATE TABLE tasks_lists (
	id serial PRIMARY KEY,
	title VARCHAR (255) NOT NULL,
	updated_at TIMESTAMP NOT NULL
);

CREATE TABLE tasks__tasks_lists (
  task_id INT REFERENCES tasks(id) ON DELETE CASCADE ON UPDATE CASCADE,
  task_list_id INT REFERENCES tasks_lists(id) ON DELETE CASCADE ON UPDATE CASCADE,
	assigned_at TIMESTAMP NOT NULL,
  PRIMARY KEY (task_id, task_list_id)
);