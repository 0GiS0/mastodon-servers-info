import { Component } from '@angular/core';
import { MastodonService } from '../mastodon.service';
import { ServerInfo } from '../server';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent {

  constructor(private mastodonService: MastodonService) { }


  servers: ServerInfo[] = [];
  last_mastodon_version: string = "4.0.2";
  self = this;

  ngOnInit(): void {
    this.getServers();
  }
  getServers(orderBy: string = 'version'): void {
    this.mastodonService.getServers().subscribe(servers => {

      switch (orderBy) {
        case 'users':
          this.servers = servers.sort(function (a: ServerInfo, b: ServerInfo) {
            return b.total_users - a.total_users;
          });
          break;
        case 'usersByweek':
          this.servers = servers.sort(function (a: ServerInfo, b: ServerInfo) {
            return b.last_week_users - a.last_week_users;
          });
          break;
        case 'version':
          //Get versions
          let versionOrder = ["4.0.2", "4.0.2+uri1.13", "4.0.1", "4.0.2+glitch", "4.0.0rc2+glitch", "4.0.0rc2", "3.5.5", "3.5.3", "3.5.3~wxw", "3.5.3+glitch", "3.5.3~island", "3.5.1", "3.4.6", "3.4.5", "3.4.1", "3.3.2", "3.2.0+glitch", "3.1.5", "3.1.3"];
          this.servers = servers.sort((a, b) => versionOrder.indexOf(a.version) - versionOrder.indexOf(b.version));
          break;
        default:
          this.servers = servers;
          break;
      }


    });

    // switch (orderBy) {
    //   case 'users':
    //     console.log('Sort by users');
    //     let sortedServers = this.

    //     console.log(sortedServers);

    //     break;

    //   default:
    //     break;
    // }

  }

  howOld(mastodonVer: string): string {

    if (mastodonVer == this.last_mastodon_version)
      return "isOk";
    else if (mastodonVer == "3.5.5")
      return "isSomeOld";

    return "tooOld";
  }

}
