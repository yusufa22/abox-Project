CREATE TABLE  users (id BIGSERIAL PRIMARY KEY, name TEXT, email TEXT UNIQUE, password TEXT, status TEXT, reset TEXT)
CREATE TABLE files (owner BIGINT REFERENCES users (id), name TEXT, type TEXT, mtime TEXT, folder TEXT, shared_by TEXT, shared_with TEXT)
