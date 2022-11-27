import { Component } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { AngularPlugin } from '@microsoft/applicationinsights-angularplugin-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mastodon-servers-info';

  constructor(
    private router: Router
  ) {
    var angularPlugin = new AngularPlugin();
    const appInsights = new ApplicationInsights({
      config: {
        connectionString: 'InstrumentationKey=86f890fa-abcd-48a5-861e-9c1297f9947d;IngestionEndpoint=https://francecentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://francecentral.livediagnostics.monitor.azure.com/',
        autoExceptionInstrumented: true,
        enableCorsCorrelation: true,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        extensions: [angularPlugin],
        extensionConfig: {
          [angularPlugin.identifier]: { router: this.router }
        }
      }
    });
    appInsights.loadAppInsights();
  }
}
