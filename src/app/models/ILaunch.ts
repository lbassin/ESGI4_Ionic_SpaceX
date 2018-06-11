import { IRocket } from './IRocket';

export interface ITelemetry {
    flight_club: string;
}

export interface IReuse {
    core: boolean;
    side_core1: boolean;
    side_core2: boolean;
    fairings: boolean;
    capsule: boolean;
}

export interface ILaunchSite {
    site_id: string;
    site_name: string;
    site_name_long: string;
}

export interface ILinks {
    mission_patch: string;
    mission_patch_small: string;
    article_link: string;
    wikipedia: string;
    video_link: string;
    presskit: string;
    reddit_campaign: string;
    reddit_launch: string;
    reddit_recovery: string;
    reddit_media: string;
}

export interface ILaunch {
    flight_number: number;
    mission_name: string;
    launch_year: string;
    launch_date_unix: number;
    launch_date_utc: Date;
    launch_date_local: Date;
    rocket: IRocket;
    telemetry: ITelemetry;
    reuse: IReuse;
    launch_site: ILaunchSite;
    launch_success?: boolean;
    links: ILinks;
    details: string;
}
