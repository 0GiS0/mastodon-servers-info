export interface ServerInfo {
    version: string;
    domain: string;
    description: string;
    languages: string[];
    proxied_thumbnail: string;
    total_users: number;
    last_week_users: number;
    approval_required: boolean;
    language: string;
    category: string;
}