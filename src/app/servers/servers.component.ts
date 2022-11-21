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

  ngOnInit(): void {
    this.getServers();
  }
  getServers(): void {
    this.mastodonService.getServers().subscribe(servers => this.servers = servers);
  }

  howOld(mastodonVer: string): string {

    if (mastodonVer == this.last_mastodon_version)
      return "isOk";
    else if (mastodonVer == "3.5.5")
      return "isSomeOld";

    return "tooOld";
  }

}
