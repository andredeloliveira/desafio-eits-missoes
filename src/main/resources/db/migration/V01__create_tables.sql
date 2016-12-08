- Table: public.mission

-- DROP TABLE public.mission;

CREATE TABLE public.mission
(
  id_mission bigint NOT NULL DEFAULT nextval('mission_id_mission_seq'::regclass),
  attached_file bytea,
  date_time timestamp without time zone,
  reason character varying(255),
  id_airplane bigint,
  id_mission_from bigint,
  id_mission_to bigint,
  in_mission boolean,
  finished boolean,
  CONSTRAINT mission_pkey PRIMARY KEY (id_mission),
  CONSTRAINT fk4byffx0ggwc6lqamo088dl30m FOREIGN KEY (id_mission_from)
      REFERENCES public.airport (id_airport) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fk4m28j6lq2prl2h7sxpvxrs493 FOREIGN KEY (id_mission_to)
      REFERENCES public.airport (id_airport) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkj2h5ntsv471wfuobcwq6qvo22 FOREIGN KEY (id_airplane)
      REFERENCES public.airplane (id_airplane) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mission
  OWNER TO postgres;

  
- Table: public.airplane

-- DROP TABLE public.airplane;

CREATE TABLE public.airplane
(
  id_airplane bigint NOT NULL DEFAULT nextval('airplane_id_airplane_seq'::regclass),
  seats_number integer NOT NULL,
  subscription_number character varying(255) NOT NULL,
  total_flight_time double precision NOT NULL,
  id_airplane_model bigint,
  CONSTRAINT airplane_pkey PRIMARY KEY (id_airplane),
  CONSTRAINT fk1xoyy8tcfa9ujn7lo2hpcqsm3 FOREIGN KEY (id_airplane_model)
      REFERENCES public.airplane_model (id_airplane_model) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.airplane
  OWNER TO postgres;

  
- Table: public.airplane_manufacturer

-- DROP TABLE public.airplane_manufacturer;

CREATE TABLE public.airplane_manufacturer
(
  id_airplane_manufacturer bigint NOT NULL DEFAULT nextval('airplane_manufacturer_id_airplane_manufacturer_seq'::regclass),
  name character varying(255) NOT NULL,
  CONSTRAINT airplane_manufacturer_pkey PRIMARY KEY (id_airplane_manufacturer)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.airplane_manufacturer
  OWNER TO postgres;
  
  
-- Table: public.airplane_model

-- DROP TABLE public.airplane_model;

CREATE TABLE public.airplane_model
(
  id_airplane_model bigint NOT NULL DEFAULT nextval('airplane_model_id_airplane_model_seq'::regclass),
  name character varying(255) NOT NULL,
  id_airplane_manufacturer bigint,
  CONSTRAINT airplane_model_pkey PRIMARY KEY (id_airplane_model),
  CONSTRAINT fk6yhsjv58ordj70sdgac4e7ojm FOREIGN KEY (id_airplane_manufacturer)
      REFERENCES public.airplane_manufacturer (id_airplane_manufacturer) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.airplane_model
  OWNER TO postgres;

  
-- Table: public.airport

-- DROP TABLE public.airport;

CREATE TABLE public.airport
(
  id_airport bigint NOT NULL DEFAULT nextval('airport_id_airport_seq'::regclass),
  acronym character varying(255) NOT NULL,
  name character varying(255) NOT NULL,
  CONSTRAINT airport_pkey PRIMARY KEY (id_airport)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.airport
  OWNER TO postgres;

  
  -- Table: public.mission_passenger

-- DROP TABLE public.mission_passenger;

CREATE TABLE public.mission_passenger
(
  id_mission_passenger bigint NOT NULL DEFAULT nextval('mission_passenger_id_mission_passenger_seq'::regclass),
  id_mission bigint,
  id_passenger bigint,
  CONSTRAINT mission_passenger_pkey PRIMARY KEY (id_mission_passenger),
  CONSTRAINT fkluo2p69604bjr7nrywijok5qa FOREIGN KEY (id_mission)
      REFERENCES public.mission (id_mission) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkn4ysk9ckn26kpsa2rufug2jf7 FOREIGN KEY (id_passenger)
      REFERENCES public.users (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mission_passenger
  OWNER TO postgres;

  
  - Table: public.mission_pilot

-- DROP TABLE public.mission_pilot;

CREATE TABLE public.mission_pilot
(
  id_mission_pilot bigint NOT NULL DEFAULT nextval('mission_pilot_id_mission_pilot_seq'::regclass),
  id_mission bigint,
  id_pilot bigint,
  CONSTRAINT mission_pilot_pkey PRIMARY KEY (id_mission_pilot),
  CONSTRAINT fk1qvnof750pkmkd2b86burm6hj FOREIGN KEY (id_pilot)
      REFERENCES public.users (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkrd8nr0xa0yis59cylcejb5m39 FOREIGN KEY (id_mission)
      REFERENCES public.mission (id_mission) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mission_pilot
  OWNER TO postgres;

  
-- Table: public.mission_planner

-- DROP TABLE public.mission_planner;

CREATE TABLE public.mission_planner
(
  id_mission_planner bigint NOT NULL DEFAULT nextval('mission_planner_id_mission_planner_seq'::regclass),
  id_mission bigint,
  id_user bigint,
  CONSTRAINT mission_planner_pkey PRIMARY KEY (id_mission_planner),
  CONSTRAINT fkdyd594da4ioppbw1tcq65k92o FOREIGN KEY (id_mission)
      REFERENCES public.mission (id_mission) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkky2mkkt7tvae5n0hovmaph9b9 FOREIGN KEY (id_user)
      REFERENCES public.users (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mission_planner
  OWNER TO postgres;

  
-- Table: public.mission_users

-- DROP TABLE public.mission_users;

CREATE TABLE public.mission_users
(
  mission_id_mission bigint NOT NULL,
  pilots_id_user bigint NOT NULL,
  passengers_id_user bigint NOT NULL,
  CONSTRAINT fk80eee5l0v06swsl7rhsvlyjxv FOREIGN KEY (mission_id_mission)
      REFERENCES public.mission (id_mission) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkft6sh5yrx11t6u363s50ve4nm FOREIGN KEY (pilots_id_user)
      REFERENCES public.users (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT fkqtrltm7wlq3wmbp8d3eqdpglw FOREIGN KEY (passengers_id_user)
      REFERENCES public.users (id_user) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT uk_o8ljm766wxnc2tx5sspu5w6n UNIQUE (passengers_id_user),
  CONSTRAINT uk_rc9ldlarq2umve64vghfuk5xt UNIQUE (pilots_id_user)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.mission_users
  OWNER TO postgres;

  
  -- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
  id_user bigint NOT NULL DEFAULT nextval('users_id_user_seq'::regclass),
  email character varying(255) NOT NULL,
  name character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  profile integer,
  status boolean,
  CONSTRAINT users_pkey PRIMARY KEY (id_user)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.users
  OWNER TO postgres;


