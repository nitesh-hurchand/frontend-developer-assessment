import { Release } from './app.release';

export class Artist {
    constructor(
    public name: string,
    public arid: string = '',
    public url: string = '',
    public releases: Release[] = [],
    public showReleases: boolean = false){

            }
}
