export interface Club {
  club_id: number;
  name: string;
  logo: string;
  description: string;
  numberOfParticipants: number;
}

export interface ClubMinimized {
  name: string;
  logo: string;
}
