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
INSERT INTO geschaefte2 (aktennummer, aktenstandort, benutzer, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, gekoNr, geschaeftsart, idGeschaeft,  idKontaktExtern_readonly, idKontaktIntern_readonly, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, rechtsmittelerledigung, status, verantwortlich, vermerk, zustaendigeDirektion)
SELECT aktennummer, aktenstandort, benutzer, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, gekoNr, geschaeftsart, idGeschaeft,  idKontaktExtern, idKontaktIntern, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, rechtsmittelerledigung, status, verantwortlich, vermerk, zustaendigeDirektion
FROM geschaefte

drop table geschaefte

alter table geschaefte2 rename to geschaefte

