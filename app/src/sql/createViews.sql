DROP VIEW IF EXISTS v_geschaefte;
CREATE VIEW
  v_geschaefte
AS
  SELECT
    geschaefte.*,
    interne.vorname || ' ' || interne.name AS verantwortlichVornameName,
    interne.itKonto
  FROM
    geschaefte
    LEFT JOIN
      interne
      ON geschaefte.verantwortlich = interne.kurzzeichen
  ORDER BY
    idGeschaeft DESC;
