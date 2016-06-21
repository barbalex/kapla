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
  rechtsmittelInstanz TEXT,
  rechtsmittelErledigung TEXT,
  rechtsmittelEntscheidNr INTEGER,
  rechtsmittelEntscheidDatum TEXT,
  status TEXT,
  verantwortlich TEXT,
  vermerk TEXT,
  vermerkIntern TEXT,
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
  -- ON instr(geschaefte.idKontaktExtern, externe.name || ' ' || externe.vorname) > 0
  ON geschaefte.idKontaktExtern LIKE '%' || externe.name || ' ' || externe.vorname || '%'
WHERE
  geschaefte.idKontaktExtern <> '';

CREATE TABLE geschaeftsart (
  id INTEGER PRIMARY KEY,
  geschaeftsart TEXT unique,
  sort INTEGER,
  zeigeBereichRechtsmittel INTEGER,
  zeigeBereichParlVorstoss INTEGER
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
  ('angekündigt', 1),
  ('pendent', 2),
  ('überwachen int.', 3),
  ('überwachen ext.', 4),
  ('erledigt', 5);

CREATE TABLE parlVorstossTyp (
  id INTEGER PRIMARY KEY,
  parlVorstossTyp TEXT unique,
  sort INTEGER
);

CREATE INDEX parlVorstossTypSort ON parlVorstossTyp (sort);

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

CREATE TABLE rechtsmittelErledigung (
  id INTEGER PRIMARY KEY,
  rechtsmittelErledigung TEXT unique,
  sort INTEGER
);

CREATE INDEX rechtsmittelErledigungSort ON rechtsmittelErledigung (sort);

INSERT INTO
  rechtsmittelErledigung (rechtsmittelErledigung, sort)
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

CREATE TABLE rechtsmittelInstanz (
  id INTEGER PRIMARY KEY,
  rechtsmittelInstanz TEXT unique,
  sort INTEGER
);

CREATE INDEX rechtsmittelInstanzSort ON rechtsmittelInstanz (sort);

INSERT INTO
  rechtsmittelInstanz (rechtsmittelInstanz, sort)
VALUES
  ('Instanz 1', 1),
  ('Instanz 2', 2),
  ('Instanz 3', 3);
