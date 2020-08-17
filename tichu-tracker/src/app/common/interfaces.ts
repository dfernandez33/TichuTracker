export interface INewGame {
    team1: string[];
    team2: string[];
    targetScore: number;
}

export interface IRoundInformation {
    team1Info: ITeamRoundInfo
    team2Info: ITeamRoundInfo
}

export interface ITeamRoundInfo {
    teamScore: number;
    teamTichu?: ITichu;
}

export interface ITichu {
    tichuType: TichuType;
    user: string;
    success: boolean;
}

export enum TichuType {
    NONE,
    TICHU = 'Tichu',
    GRAND_TICHU = 'Grand Tichu'
}