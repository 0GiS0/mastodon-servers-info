import { Component } from '@angular/core';
import { MastodonService } from '../mastodon.service';
import { ServerInfo } from '../server';
import Ping from 'ping-url';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  constructor(private mastodonService: MastodonService) { }

  servers: ServerInfo[] = [];
  cachedServers: ServerInfo[] = [];
  last_mastodon_version: string = "4.0.2";

  ngOnInit(): void {
    this.getServers();
  }

  calculateLatency(): void {

    this.cachedServers.forEach(s => {
      Ping.check(`https://${s.domain}`).then(response => {
        console.log(`status: ${response.status} time: ${response.time}`);
        s.latency = response.time;
      }, err => {
        console.log(`error msg: ${err.msg}`);
      });
    });
  }


  getServers(orderBy: string = 'version'): void {
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
          //Get versions
          let versionOrder = ["4.0.2", "4.0.2+uri1.13", "4.0.1", "4.0.2+glitch", "4.0.0rc2+glitch", "4.0.0rc2", "3.5.5", "3.5.3", "3.5.3~wxw", "3.5.3+glitch", "3.5.3~island", "3.5.1", "3.4.6", "3.4.5", "3.4.1", "3.3.2", "3.2.0+glitch", "3.1.5", "3.1.3"];
          this.servers = this.cachedServers.sort((a, b) => versionOrder.indexOf(a.version) - versionOrder.indexOf(b.version));
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

    if (mastodonVer == this.last_mastodon_version)
      return "isOk";
    else if (mastodonVer == "3.5.5")
      return "isSomeOld";

    return "tooOld";
  }

}