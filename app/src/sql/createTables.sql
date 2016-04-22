CREATE TABLE externe (
  id INTEGER PRIMARY KEY,
  eMail TEXT,
  firma TEXT,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

CREATE TABLE gdeplz (
  id INTEGER PRIMARY KEY,
  gemeinde TEXT,
  plz INTEGER
);

CREATE TABLE interne (
  id INTEGER PRIMARY KEY,
  abteilung TEXT,
  buero TEXT,
  eMail TEXT,
  itKonto TEXT,
  kurzzeichen TEXT not null unique,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

CREATE TABLE geschaefte (
  aktennummer TEXT,
  aktenstandort TEXT,
  baumFlag INTEGER,
  benutzer TEXT,
  datumAusgangAwel TEXT,
  datumEingangAwel TEXT,
  details TEXT,
  entscheidAwelJahr INTEGER,
  entscheidAwelNr INTEGER,
  entscheidBdvJahr INTEGER,
  entscheidBdvNr INTEGER,
  entscheidKrJahr INTEGER,
  entscheidKrNr INTEGER,
  entscheidKrText TEXT,
  entscheidKrTextMitNr TEXT,
  entscheidRrbJahr INTEGER,
  entscheidRrbNr INTEGER,
  erlassform TEXT,
  faelligkeitAnzahlTage INTEGER,
  faelligkeitText TEXT,
  fristAbteilung TEXT,
  fristAmtschef TEXT,
  fristAwel TEXT,
  fristDirektion TEXT,
  fristMitarbeiter TEXT,
  fristwarnung TEXT,
  gegenstand TEXT,
  gekoNr TEXT,
  geschaeftsart TEXT,
  hWo01 INTEGER,
  hWo02 INTEGER,
  hWo03 INTEGER,
  hWo04 INTEGER,
  hWo05 INTEGER,
  hWo06 INTEGER,
  hWo07 INTEGER,
  hWo08 INTEGER,
  hWo09 INTEGER,
  hWo10 INTEGER,
  hWo11 INTEGER,
  hWo12 INTEGER,
  hWo13 INTEGER,
  idGeschaeft INTEGER PRIMARY KEY,
  idKontaktExtern TEXT,
  idKontaktIntern TEXT,
  idVorgeschaeft TEXT,
  kontaktExtern1 TEXT,
  kontaktExtern2 TEXT,
  kontaktExtern3 TEXT,
  kontaktExtern4 TEXT,
  kontaktIntern1 TEXT,
  kontaktIntern2 TEXT,
  kontaktIntern3 TEXT,
  kontaktIntern4 TEXT,
  listentitel TEXT,
  mutationsdatum TEXT,
  mutationsperson TEXT,
  mutationstext TEXT,
  naechsterSchritt TEXT,
  naechsterSchrittText TEXT,
  ort TEXT,
  parlVorstossEbene TEXT,
  parlVorstossStufe TEXT,
  parlVorstossTyp TEXT,
  parlVorstossZustaendigkeitAwel TEXT,
  rechtsmittelerledigung TEXT,
  restwochen TEXT,
  status TEXT,
  summeWo01 TEXT,
  summeWo02 TEXT,
  summeWo03 TEXT,
  summeWo04 TEXT,
  summeWo05 TEXT,
  summeWo06 TEXT,
  summeWo07 TEXT,
  summeWo08 TEXT,
  summeWo09 TEXT,
  summeWo10 TEXT,
  summeWo11 TEXT,
  summeWo12 TEXT,
  summeWo13 TEXT,
  textabfrage TEXT,
  titelWo01 TEXT,
  titelWo02 TEXT,
  titelWo03 TEXT,
  titelWo04 TEXT,
  titelWo05 TEXT,
  titelWo06 TEXT,
  titelWo07 TEXT,
  titelWo08 TEXT,
  titelWo09 TEXT,
  titelWo10 TEXT,
  titelWo11 TEXT,
  titelWo12 TEXT,
  titelWo13 TEXT,
  verantwortlich TEXT,
  vermerk TEXT,
  wo01 TEXT,
  wo02 TEXT,
  wo03 TEXT,
  wo04 TEXT,
  wo05 TEXT,
  wo06 TEXT,
  wo07 TEXT,
  wo08 TEXT,
  wo09 TEXT,
  wo10 TEXT,
  wo11 TEXT,
  wo12 TEXT,
  wo13 TEXT,
  zeitPendentH TEXT,
  zeitProWoche TEXT,
  zeitTotalNochZuLeisten TEXT,
  zeitraum TEXT,
  zustaendigeDirektion TEXT
);

CREATE TABLE geschaeftsart (
  id INTEGER PRIMARY KEY,
  geschaeftsart TEXT unique,
  sort INTEGER
);

CREATE INDEX geschaeftsartSort ON geschaeftsart (sort);

INSERT INTO
  geschaeftsart (geschaeftsart, sort)
VALUES
  ('Rechtsgeschäft', 1),
  ('Rekurs/Beschwerde', 2),
  ('Parlament. Vorstoss', 3),
  ('Vernehmlassung', 4),
  ('Strafverfahren', 5),
  ('Diverses', 6);

CREATE TABLE status (
  id INTEGER PRIMARY KEY,
  status TEXT unique,
  sort INTEGER
);

CREATE INDEX statusSort ON status (sort);

INSERT INTO
  status (status, sort)
VALUES
  ('pendent', 1),
  ('überwachen int.', 2),
  ('überwachen ext.', 3),
  ('erledigt', 4);

CREATE TABLE parlVorstossTyp (
  id INTEGER PRIMARY KEY,
  parlVorstossTyp TEXT unique,
  sort INTEGER
);

CREATE INDEX parlVorstossTypSort ON status (sort);

INSERT INTO
  parlVorstossTyp (parlVorstossTyp, sort)
VALUES
  ('Anfrage', 1),
  ('Interpellation', 2),
  ('Postulat', 3),
  ('Dringliches Postulat', 4),
  ('Leistungsmotion', 5),
  ('Motion', 6),
  ('Parlamentatische Initiative', 7),
  ('Vorlage', 8);

CREATE TABLE rechtsmittelerledigung (
  id INTEGER PRIMARY KEY,
  rechtsmittelerledigung TEXT unique,
  sort INTEGER
);

CREATE INDEX rechtsmittelerledigungSort ON status (sort);

INSERT INTO
  rechtsmittelerledigung (rechtsmittelerledigung, sort)
VALUES
  ('vollständig zugunsten AWEL', 1),
  ('überwiegend zugunsten AWEL', 2),
  ('zur Hälfte zugunsten AWEL', 3),
  ('überwiegend zulasten AWEL', 4),
  ('vollständig zulasten AWEL', 5),
  ('--------------------------', 6),
  ('gegenstandlos', 7),
  ('Rechtsmittelrückzug Rekurrent', 8),
  ('Rücknahme durch AWEL', 9),
  ('andere Gründe', 10);
