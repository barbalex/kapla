'use strict'

import React, { PropTypes } from 'react'
import styles from './AreaZuletztMutiert.css'

const AreaZuletztMutiert = ({ values, interneOptions }) => {
  let zuletztMutiertText

  if (!values.mutationsperson) {
    zuletztMutiertText = 'Bei diesem Geschäft wurde (noch) keine Mutationsperson gespeichert'
  } else {
    const mutPersonOptions = interneOptions.find((o) => {
      if (o.itKonto) {
        // seems that data contains lower case differences
        // and whitespace
        return o.itKonto.toLowerCase().replace(/ /g, '') === values.mutationsperson.toLowerCase().replace(/ /g, '')
      }
      return false
    })
    const name = (
      mutPersonOptions ?
      ` (${mutPersonOptions.vorname} ${mutPersonOptions.name})` :
      ''
    )
    zuletztMutiertText = `Zuletzt mutiert durch ${values.mutationsperson}${name} am ${values.mutationsdatum}`
  }

  return (
    <div className={styles.areaZuletztMutiert}>
      <div className={styles.fieldZuletztMutiert}>
        {zuletztMutiertText}
      </div>
    </div>
  )
}

AreaZuletztMutiert.displayName = 'AreaZuletztMutiert'

AreaZuletztMutiert.propTypes = {
  values: PropTypes.object,
  interneOptions: PropTypes.array
}

export default AreaZuletztMutiert
