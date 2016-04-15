DROP VIEW IF EXISTS v_geschaefte;
CREATE VIEW
  v_geschaefte
AS
  SELECT
    geschaefte.*,
    interne.vorname || ' ' || interne.name AS kontaktInternVornameName,
    interne.itKonto
  FROM
    geschaefte
    LEFT JOIN
      interne
      ON geschaefte.idKontaktIntern = interne.kurzzeichen
  ORDER BY
    idGeschaeft DESC;
