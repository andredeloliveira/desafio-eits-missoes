CREATE TABLE airplane_manufacturer (
  id_airplane_manufacturer bigserial PRIMARY KEY,
  name text NOT NULL
);


CREATE TABLE airplane_model (
  id_airplane_model bigserial PRIMARY KEY,
  name text NOT NULL,
  id_airplane_manufacturer bigserial REFERENCES airplane_manufacturer (id_airplane_manufacturer)
);


CREATE TABLE airplane (
  id_airplane bigserial PRIMARY KEY,
  subscription_number text NOT NULL,
  total_flight_time float,
  seats_number integer NOT NULL,
  id_airplane_model bigserial REFERENCES airplane_model (id_airplane_model)
);



CREATE TABLE "users" (
  id_user bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  profile text NOT NULL,
  status text NOT NULL
);

CREATE TABLE pilot (
  id_pilot bigserial PRIMARY KEY,
  id_user bigserial REFERENCES "users" (id_user)
);

CREATE TABLE passenger (
  id_passenger bigserial PRIMARY KEY,
  id_user bigserial REFERENCES "users" (id_user)
);

CREATE TABLE airport (
  id_airport bigserial PRIMARY KEY,
  name text,
  acronym text NOT NULL
);

CREATE TABLE mission (
  id_mission bigserial PRIMARY KEY,
  date_time timestamptz NOT NULL,
  id_mission_from bigserial REFERENCES airport (id_airport) ,
  id_mission_to bigserial REFERENCES airport (id_airport),
  id_airplane bigserial REFERENCES airplane (id_airplane),
  reason text,
  attached_file text
);


CREATE TABLE mission_passenger (
  id_mission_passenger bigserial PRIMARY KEY,
  id_passenger bigserial REFERENCES "users" (id_user),
  id_mission bigserial REFERENCES mission (id_mission)
);

CREATE TABLE mission_pilot (
  id_mission_pilot bigserial PRIMARY KEY,
  id_pilot bigserial REFERENCES "users" (id_user),
  id_mission bigserial REFERENCES mission (id_mission)
);

CREATE TABLE accomplished_mission (
  id_accomplished_mission bigserial PRIMARY KEY,
  id_accomplished_by bigserial REFERENCES pilot (id_pilot) 
);





