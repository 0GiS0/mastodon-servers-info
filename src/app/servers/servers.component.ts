import { Component } from '@angular/core';
import { MastodonService } from '../mastodon.service';
import { ServerInfo } from '../server';
import Ping from 'ping-url';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  constructor(private mastodonService: MastodonService, private gitHubService: GithubService) { }

  servers: ServerInfo[] = [];
  cachedServers: ServerInfo[] = [];  
  active_filter: string = "";
  releases: string[] = [];

  ngOnInit(): void {
    this.getReleases();
    this.getServers();
  }


  getReleases() {
    this.gitHubService.getReleases().subscribe(releases => {
      console.log(releases);
      this.releases = releases.map(r => {
        let base = r.name.split('v')[1];
        return [base, `${base}+glitch`,`${base}~island`,`${base}~wxw`, `${base}+uri1.16`];        
      }).flat();

      this.releases.push("3.2.0+glitch");
      this.releases.push("3.1.5");
      

      console.log('releases:');
      console.log(this.releases);
    });
  }

  calculateLatency(): void {

    this.cachedServers.forEach(s => {
      Ping.check(`https://${s.domain}`).then(response => {
        // console.log(`status: ${response.status} time: ${response.time}`);
        s.latency = response.time;
      }, err => {
        console.log(`error for ${s.domain}: ${err.msg}`);
      });
    });
  }


  getServers(orderBy: string = 'version'): void {

    this.active_filter = orderBy;

    this.mastodonService.getServers().subscribe(servers => {

      this.cachedServers = servers;
      switch (orderBy) {
        case 'users':
          this.servers = this.cachedServers.sort(function (a: ServerInfo, b: ServerInfo) {
            return b.total_users - a.total_users;
          });
          break;
        case 'usersByweek':
          this.servers = this.cachedServers.sort(function (a: ServerInfo, b: ServerInfo) {
            return b.last_week_users - a.last_week_users;
          });
          break;
        case 'version':
          this.servers = this.cachedServers.sort((a, b) => this.releases.indexOf(a.version) - this.releases.indexOf(b.version));
          break;
        default:
          this.servers = this.cachedServers;
          break;
      }

      this.calculateLatency();

    });
  }

  searchByDomain(e: any): void {

    let domainName: string = e.target.value;

    if (domainName.trim() == '') {
      this.servers = this.cachedServers;

    }
    else {

      console.log(`Looking for ${domainName}`);
      this.servers = this.cachedServers.filter(({ domain }) => domain.startsWith(domainName));
    }

  }

  howOld(mastodonVer: string): string {

    if (mastodonVer == this.releases[0])
      return "isOk";
    else if (mastodonVer == "3.5.5")
      return "isSomeOld";

    return "tooOld";
  }

  isActive(filter: string): string {

    // console.log(`filter: ${filter}`);

    if (filter == this.active_filter) {
      return "active";
    }
    return "";
  }

}