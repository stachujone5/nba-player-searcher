import type { ReactNode } from 'react'

export interface Children {
  readonly children: ReactNode
}

export interface Player {
  readonly first_name: string
  readonly height_feet: number | null
  readonly height_inches: number | null
  readonly id: number
  readonly last_name: string
  readonly position: string
  readonly team: {
    readonly abbreviation: string
    readonly city: string
    readonly conference: string
    readonly division: string
    readonly full_name: string
    readonly id: number
    readonly name: string
  }
  readonly weight_pounds: number | null
}

export interface Stats {
  readonly ast: number
  readonly blk: number
  readonly dreb: number
  readonly fg3_pct: number
  readonly fg3a: number
  readonly fg3m: number
  readonly fg_pct: number
  readonly fga: number
  readonly fgm: number
  readonly ft_pct: number
  readonly fta: number
  readonly ftm: number
  readonly games_played: number
  readonly min: string
  readonly oreb: number
  readonly pf: number
  readonly player_id: number
  readonly pts: number
  readonly reb: number
  readonly season: number
  readonly stl: number
  readonly turnover: number
}
