'use strict'

import React, { PropTypes } from 'react'
import styles from './areaFristen.css'
import DateField from '../../containers/filterFields/DateField'

const AreaFristen = ({
  values,
  nrOfFieldsBeforeFristen,
  change,
  changeComparator,
}) =>
  <div className={styles.areaFristen}>
    <div className={styles.areaFristenTitle}>
      Fristen
    </div>
    <DateField
      name="datumEingangAwel"
      label="Datum des Eingangs im AWEL"
      tabIndex={1 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="fristAwel"
      label="Frist für Erledigung durch AWEL"
      tabIndex={2 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="fristAmtschef"
      label="Frist Vorlage an Amtschef"
      tabIndex={3 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="fristAbteilung"
      label="Frist für Erledigung durch Abteilung"
      tabIndex={4 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="fristMitarbeiter"
      label="Frist Erledigung nächster Schritt Re"
      tabIndex={5 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="datumAusgangAwel"
      label="Datum Ausgang AWEL (erledigt)"
      tabIndex={6 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
    <DateField
      name="fristDirektion"
      label="Frist für Erledigung durch Direktion"
      tabIndex={7 + nrOfFieldsBeforeFristen}
      values={values}
      change={change}
      changeComparator={changeComparator}
    />
  </div>

AreaFristen.displayName = 'AreaFristen'

AreaFristen.propTypes = {
  values: PropTypes.object,
  change: PropTypes.func.isRequired,
  changeComparator: PropTypes.func.isRequired,
  nrOfFieldsBeforeFristen: PropTypes.number,
}

export default AreaFristen
