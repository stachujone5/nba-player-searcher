import type { ReactNode } from 'react'

export interface Children {
  readonly children: ReactNode
}

export interface Player {
  readonly id: number
  readonly first_name: string
  readonly last_name: string
  readonly position: string
  readonly height_feet: number | null
  readonly height_inches: number | null
  readonly weight_pounds: number | null
  readonly team: {
    readonly id: number
    readonly abbreviation: string
    readonly city: string
    readonly conference: string
    readonly division: string
    readonly full_name: string
    readonly name: string
  }
}

export interface Stats {
  readonly games_played: number
  readonly player_id: number
  readonly season: number
  readonly min: string
  readonly fgm: number
  readonly fga: number
  readonly fg3m: number
  readonly fg3a: number
  readonly ftm: number
  readonly fta: number
  readonly oreb: number
  readonly dreb: number
  readonly reb: number
  readonly ast: number
  readonly stl: number
  readonly blk: number
  readonly turnover: number
  readonly pf: number
  readonly pts: number
  readonly fg_pct: number
  readonly fg3_pct: number
  readonly ft_pct: number
}
