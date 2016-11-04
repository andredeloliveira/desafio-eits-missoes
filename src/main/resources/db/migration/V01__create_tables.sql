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

CREATE TABLE perfis_acesso (
  id_perfil_acesso bigserial PRIMARY KEY,
  perfilAcesso text NOT NULL
);

CREATE TABLE usuarios (
  id_usuario bigserial PRIMARY KEY,
  nome text NOT NULL,
  email text NOT NULL,
  senha text NOT NULL,
  id_perfil_acesso bigserial REFERENCES perfis_acesso (id_perfil_acesso),
  status text NOT NULL
);

CREATE TABLE pilotos (
  id_piloto bigserial PRIMARY KEY,
  id_usuario bigserial REFERENCES usuarios (id_usuario)
);

CREATE TABLE passageiros (
  id_passageiro bigserial PRIMARY KEY,
  id_usuario bigserial REFERENCES usuarios (id_usuario)
);

CREATE TABLE aeroportos (
  id_aeroporto bigserial PRIMARY KEY,
  nome text,
  sigla text NOT NULL
);

CREATE TABLE missoes (
  id_missao bigserial PRIMARY KEY,
  data_hora timestamptz NOT NULL,
  id_origem bigserial REFERENCES aeroportos (id_aeroporto),
  id_destino bigserial REFERENCES aeroportos (id_aeroporto),
  id_aeronave bigserial REFERENCES aeronaves (id_aeronave),
  objetivo text NOT NULL,
  anexo text NOT NULL
);


CREATE TABLE missao_passageiros (
  id_missao_passageiro bigserial PRIMARY KEY,
  id_passageiro bigserial REFERENCES usuarios (id_usuario),
  id_missao bigserial REFERENCES missoes (id_missao)
);

CREATE TABLE missao_pilotos (
  id_missao_piloto bigserial PRIMARY KEY,
  id_piloto bigserial REFERENCES usuarios (id_usuario),
  id_missao bigserial REFERENCES missoes (id_missao)
);

CREATE TABLE missoes_finalizadas (
  id_missao_finalizada bigserial PRIMARY KEY,
  id_finalizada_por bigserial REFERENCES pilotos (id_piloto) 
);





