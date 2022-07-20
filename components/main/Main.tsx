import classes from './Main.module.scss'

import type { Children } from '../../types/types'

export const Main = ({ children }: Children) => {
  return <main className={classes.main}>{children}</main>
}
