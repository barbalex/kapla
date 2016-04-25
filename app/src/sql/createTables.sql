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
  kurzzeichen TEXT unique,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

CREATE TABLE geschaefte (
  aktennummer TEXT,
  aktenstandort TEXT,
  benutzer TEXT,
  datumAusgangAwel TEXT,
  datumEingangAwel TEXT,
  details TEXT,
  entscheidAwelJahr INTEGER,
  entscheidAwelNr INTEGER,
  entscheidBdvJahr INTEGER,
  entscheidBdvNr INTEGER,
  entscheidBvvJahr INTEGER,
  entscheidBvvNr INTEGER,
  entscheidKrJahr INTEGER,
  entscheidKrNr INTEGER,
  entscheidRrbJahr INTEGER,
  entscheidRrbNr INTEGER,
  fristAbteilung TEXT,
  fristAmtschef TEXT,
  fristAwel TEXT,
  fristDirektion TEXT,
  fristMitarbeiter TEXT,
  gegenstand TEXT,
  gekoNr TEXT,
  geschaeftsart TEXT,
  idGeschaeft INTEGER PRIMARY KEY,
  idKontaktExtern_readonly TEXT,
  idKontaktIntern_readonly TEXT,
  idVorgeschaeft TEXT,
  mutationsdatum TEXT,
  mutationsperson TEXT,
  naechsterSchritt TEXT,
  ort TEXT,
  parlVorstossStufe TEXT,
  parlVorstossTyp TEXT,
  rechtsmittelerledigung TEXT,
  status TEXT,
  verantwortlich TEXT,
  vermerk TEXT,
  zustaendigeDirektion TEXT
);

CREATE TABLE geschaefteKontakteIntern (
  idGeschaeft INTEGER,
  idKontakt INTEGER,
  PRIMARY KEY (idGeschaeft, idKontakt)
);

INSERT INTO geschaefteKontakteIntern (idGeschaeft, idKontakt)
SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern1
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern2
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern3
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern4;

CREATE TABLE geschaefteKontakteExtern (
  idGeschaeft INTEGER,
  idKontakt INTEGER,
  PRIMARY KEY (idGeschaeft, idKontakt)
);

INSERT INTO geschaefteKontakteExtern (idGeschaeft, idKontakt)
SELECT geschaefte.idGeschaeft, externe.id
FROM
  geschaefte
  INNER JOIN externe
  ON instr(externe.name || ' ' || externe.vorname, geschaefte.idKontaktExtern) > 0
WHERE
  geschaefte.idKontaktExtern <> '';

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
  ('Dringliche Anfrage', 2),
  ('Interpellation', 3),
  ('Postulat', 4),
  ('Dringliches Postulat', 5),
  ('Leistungsmotion', 6),
  ('Motion', 7),
  ('Parlamentatische Initiative', 8),
  ('Vorlage', 9);

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
