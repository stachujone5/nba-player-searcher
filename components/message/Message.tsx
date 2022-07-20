import classes from './Message.module.scss'

import type { Children } from '../../types/types'

export const Message = ({ children }: Children) => {
  return <h1 className={classes.msg}>{children}</h1>
}
