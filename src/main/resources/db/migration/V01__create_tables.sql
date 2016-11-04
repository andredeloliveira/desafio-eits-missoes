CREATE TABLE fabricantes_aeronave (
  id_fabricante_aeronave bigserial PRIMARY KEY,
  nome text NOT NULL
);


CREATE TABLE modelos_aeronave (
  id_modelo_aeronave bigserial PRIMARY KEY,
  nome text NOT NULL,
  id_fabricante_aeronave bigserial REFERENCES fabricantes_aeronave (id_fabricante_aeronave)
);


CREATE TABLE aeronaves (
  id_aeronave bigserial PRIMARY KEY,
  matricula text NOT NULL,
  horas_voo time,
  numero_assentos integer NOT NULL,
  id_modelo_aeronave bigserial REFERENCES modelos_aeronave (id_modelo_aeronave)
);