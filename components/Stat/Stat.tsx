import classes from './Stat.module.scss'

interface Props {
  readonly title: string
  readonly text?: string
}

export const Stat = ({ title, text }: Props) => {
  return (
    <p>
      {title}
      {text && <span className={classes.stat}>{text}</span>}
    </p>
  )
}
