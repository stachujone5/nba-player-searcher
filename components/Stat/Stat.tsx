import classes from './Stat.module.scss'

interface Props {
  readonly text?: string
  readonly title: string
}

export const Stat = ({ text, title }: Props) => {
  return (
    <p>
      {title}
      {text && <span className={classes.stat}>{text}</span>}
    </p>
  )
}
