DROP VIEW IF EXISTS v_geschaefte;
CREATE VIEW
  v_geschaefte
AS
  SELECT
    geschaefte.*,
    interne.vornameName AS kontaktInternVornameName,
    interne.itKonto
  FROM
    geschaefte
    LEFT JOIN
      interne
      ON geschaefte.idKontaktIntern = interne.kurzzeichen
  ORDER BY
    idGeschaeft DESC;
