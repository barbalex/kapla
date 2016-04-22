-- in sqlite fields can not be removed from table
-- need to create new table
-- insert data from old
-- remove old
-- rename new

insert into interne2 (id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname)
select id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname
from interne

drop table interne

alter table interne2 rename to interne



id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname