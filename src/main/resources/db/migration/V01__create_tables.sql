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
  total_flight_time time,
  seats_number integer NOT NULL,
  id_airplane_model bigserial REFERENCES airplane_model (id_airplane_model)
);

CREATE TABLE profile (
  id_profile bigserial PRIMARY KEY,
  profile text NOT NULL
);

CREATE TABLE "user" (
  id_user bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  id_profile bigserial REFERENCES profile (id_profile),
  status text NOT NULL
);

CREATE TABLE pilot (
  id_pilot bigserial PRIMARY KEY,
  id_user bigserial REFERENCES "user" (id_user)
);

CREATE TABLE passenger (
  id_passenger bigserial PRIMARY KEY,
  id_user bigserial REFERENCES "user" (id_user)
);

CREATE TABLE airport (
  id_airport bigserial PRIMARY KEY,
  name text,
  acronym text NOT NULL
);

CREATE TABLE mission (
  id_mission bigserial PRIMARY KEY,
  date_time timestamptz NOT NULL,
  id_from bigserial REFERENCES airport (id_airport),
  id_to bigserial REFERENCES airport (id_airport),
  id_airplane bigserial REFERENCES airplane (id_airplane),
  planned_by bigserial REFERENCES "user" (id_user),
  reason text NOT NULL,
  attached_file text NOT NULL
);


CREATE TABLE mission_passenger (
  id_mission_passenger bigserial PRIMARY KEY,
  id_passenger bigserial REFERENCES "user" (id_user),
  id_mission bigserial REFERENCES mission (id_mission)
);

CREATE TABLE mission_pilot (
  id_mission_pilot bigserial PRIMARY KEY,
  id_pilot bigserial REFERENCES "user" (id_user),
  id_mission bigserial REFERENCES mission (id_mission)
);

CREATE TABLE accomplished_mission (
  id_accomplished_mission bigserial PRIMARY KEY,
  id_accomplished_by bigserial REFERENCES pilot (id_pilot) 
);





