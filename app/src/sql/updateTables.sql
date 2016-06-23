-- in sqlite fields can not be removed from table
-- need to create new table
-- insert data from old
-- remove old
-- rename new


-- interne
insert into interne2 (id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname)
select id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname
from interne

drop table interne

alter table interne2 rename to interne


-- geschaefte
INSERT INTO geschaefte2 (abteilung, aktennummer, aktenstandort, ausloeser, benutzer, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidBvvJahr, entscheidBvvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, gekoNr, geschaeftsart, idGeschaeft, idKontaktExtern_readonly, idKontaktIntern_readonly, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion)
SELECT abteilung, aktennummer, aktenstandort, ausloeser, benutzer, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidBvvJahr, entscheidBvvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, gekoNr, geschaeftsart, idGeschaeft, idKontaktExtern_readonly, idKontaktIntern_readonly, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion
FROM geschaefte

DROP TABLE geschaefte

ALTER TABLE geschaefte2 RENAME TO geschaefte


--geschaefteKontakteIntern
INSERT INTO
  geschaefteKontakteIntern2(idGeschaeft, idKontakt)
SELECT
  geschaefteKontakteIntern.idGeschaeft, geschaefteKontakteIntern.idKontakt
FROM
  geschaefteKontakteIntern
LEFT JOIN
    geschaefte
    ON geschaefte.idGeschaeft = geschaefteKontakteIntern.idGeschaeft
WHERE
  geschaefte.idGeschaeft IS NOT NULL;

DROP TABLE geschaefteKontakteIntern

ALTER TABLE geschaefteKontakteIntern2 RENAME TO geschaefteKontakteIntern