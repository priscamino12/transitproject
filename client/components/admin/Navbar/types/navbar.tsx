export interface NavbarProps {
  onMenuClick: () => void
}

export interface DecodedToken {
  nom: string
  type: string
  id: string
  exp: number
}
