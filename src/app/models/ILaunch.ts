export interface ICore {
    core_serial: string;
    flight?: number;
    block?: number;
    reused?: boolean;
    land_success?: boolean;
    landing_type: string;
    landing_vehicle: string;
}

export interface IFirstStage {
    cores: ICore[];
}

export interface IPayload {
    payload_id: string;
    reused?: boolean;
    customers: string[];
    payload_type: string;
    payload_mass_kg?: number;
    payload_mass_lbs?: number;
    orbit: string;
    cap_serial: string;
    mass_returned_kg?: number;
    mass_returned_lbs?: number;
    flight_time_sec?: number;
    cargo_manifest: string;
}

export interface ISecondStage {
    payloads: IPayload[];
}

export interface IRocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: IFirstStage;
    second_stage: ISecondStage;
}

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