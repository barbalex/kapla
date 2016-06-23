CREATE TABLE externe (
  id INTEGER PRIMARY KEY,
  eMail TEXT,
  firma TEXT,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

CREATE INDEX iExterneVornameName ON externe (vorname, name);

-------------------------------------------

CREATE TABLE gdeplz (
  id INTEGER PRIMARY KEY,
  gemeinde TEXT,
  plz INTEGER
);

-------------------------------------------

CREATE TABLE interne (
  id INTEGER PRIMARY KEY,
  abteilung TEXT,
  buero TEXT,
  eMail TEXT,
  itKonto TEXT,
  kurzzeichen TEXT UNIQUE,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

CREATE INDEX iInterneVornameName ON interne (vorname, name);

-------------------------------------------

CREATE TABLE geschaefte (
  abteilung TEXT,
  aktennummer TEXT,
  aktenstandort TEXT,
  ausloeser TEXT,
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
  geschaeftsart TEXT REFERENCES geschaeftsart.geschaeftsart ON UPDATE CASCADE ON DELETE RESTRICT,
  idGeschaeft INTEGER PRIMARY KEY,
  idKontaktExtern_readonly TEXT,
  idKontaktIntern_readonly TEXT,
  idVorgeschaeft TEXT,
  mutationsdatum TEXT,
  mutationsperson TEXT,
  naechsterSchritt TEXT,
  ort TEXT,
  parlVorstossStufe TEXT,
  parlVorstossTyp TEXT REFERENCES parlVorstossTyp.parlVorstossTyp ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelInstanz TEXT REFERENCES rechtsmittelInstanz.rechtsmittelInstanz ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelErledigung TEXT REFERENCES rechtsmittelErledigung.rechtsmittelErledigung ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelEntscheidNr INTEGER,
  rechtsmittelEntscheidDatum TEXT,
  status TEXT REFERENCES status.status ON UPDATE CASCADE ON DELETE RESTRICT,
  verantwortlich TEXT REFERENCES interne.kurzzeichen ON UPDATE CASCADE ON DELETE RESTRICT,
  vermerk TEXT,
  vermerkIntern TEXT,
  zustaendigeDirektion TEXT
);
CREATE INDEX iGeschaefteVerantwortlich ON geschaefte (verantwortlich);
CREATE INDEX iGeschaefteFristMitarbeiter ON geschaefte (fristMitarbeiter);
CREATE INDEX iGeschaefteGeschaeftsart ON geschaefte (geschaeftsart);
CREATE INDEX iGeschaefteParlVorstossTyp ON geschaefte (parlVorstossTyp);
CREATE INDEX iGeschaefteRechtsmittelInstanz ON geschaefte (rechtsmittelInstanz);
CREATE INDEX iGeschaefteRechtsmittelErledigung ON geschaefte (rechtsmittelErledigung);
CREATE INDEX iGeschaefteStatus ON geschaefte (status);

-------------------------------------------

CREATE TABLE geschaefteKontakteIntern (
  idGeschaeft INTEGER REFERENCES geschaefte.idGeschaeft ON UPDATE CASCADE ON DELETE CASCADE,
  idKontakt INTEGER REFERENCES interne.id ON UPDATE CASCADE ON DELETE RESTRICT,
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

-------------------------------------------

CREATE TABLE geschaefteKontakteExtern (
  idGeschaeft INTEGER REFERENCES geschaefte.idGeschaeft ON UPDATE CASCADE ON DELETE CASCADE,
  idKontakt INTEGER REFERENCES externe.id ON UPDATE CASCADE ON DELETE RESTRICT,
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

-------------------------------------------

CREATE TABLE geschaeftsart (
  geschaeftsart TEXT PRIMARY KEY,
  sort INTEGER
);
CREATE INDEX iGeschaeftsartSort ON geschaeftsart (sort);

INSERT INTO
  geschaeftsart (geschaeftsart, sort)
VALUES
  ('Rechtsgeschäft', 1),
  ('Rekurs/Beschwerde', 2),
  ('Parlament. Vorstoss', 3),
  ('Vernehmlassung', 4),
  ('Strafverfahren', 5),
  ('Diverses', 6);

-------------------------------------------

CREATE TABLE status (
  status TEXT PRIMARY KEY,
  sort INTEGER
);

CREATE INDEX iStatusSort ON status (sort);

INSERT INTO
  status (status, sort)
VALUES
  ('angekündigt', 1),
  ('pendent', 2),
  ('überwachen int.', 3),
  ('überwachen ext.', 4),
  ('erledigt', 5);

-------------------------------------------

CREATE TABLE parlVorstossTyp (
  parlVorstossTyp TEXT PRIMARY KEY,
  sort INTEGER
);

CREATE INDEX iParlVorstossTypSort ON parlVorstossTyp (sort);

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

-------------------------------------------

CREATE TABLE rechtsmittelErledigung (
  rechtsmittelErledigung TEXT PRIMARY KEY,
  sort INTEGER
);

CREATE INDEX iRechtsmittelErledigungSort ON rechtsmittelErledigung (sort);

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

-------------------------------------------

CREATE TABLE rechtsmittelInstanz (
  rechtsmittelInstanz TEXT PRIMARY KEY,
  sort INTEGER
);

CREATE INDEX iRechtsmittelInstanzSort ON rechtsmittelInstanz (sort);

INSERT INTO
  rechtsmittelInstanz (rechtsmittelInstanz, sort)
VALUES
  ('Instanz 1', 1),
  ('Instanz 2', 2),
  ('Instanz 3', 3);
