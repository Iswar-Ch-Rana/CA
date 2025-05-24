import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ServicesComponent } from './features/services/services.component';
import { ServiceDetailComponent } from './features/services/service-detail/service-detail.component';
import { KnowledgeHubComponent } from './features/knowledge-hub/knowledge-hub.component';
import { BlogComponent } from './features/knowledge-hub/blog/blog.component';
import { ResourcesComponent } from './features/knowledge-hub/resources/resources.component';
import { CalculatorsComponent } from './features/knowledge-hub/calculators/calculators.component';
import { WebinarsComponent } from './features/knowledge-hub/webinars/webinars.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'about/team', component: AboutComponent, data: { section: 'team' } },
  { path: 'about/certifications', component: AboutComponent, data: { section: 'certifications' } },
  { path: 'contact', component: ContactComponent },

  // Services routes
  { path: 'services', component: ServicesComponent },
  { path: 'services/tax-planning', component: ServiceDetailComponent },
  { path: 'services/audit', component: ServiceDetailComponent },
  { path: 'services/advisory', component: ServiceDetailComponent },
  { path: 'services/gst', component: ServiceDetailComponent },
  { path: 'services/registration', component: ServiceDetailComponent },

  // Knowledge Hub routes
  { path: 'knowledge', component: KnowledgeHubComponent },
  { path: 'knowledge/blog', component: BlogComponent },
  { path: 'knowledge/resources', component: ResourcesComponent },
  { path: 'knowledge/calculators', component: CalculatorsComponent },
  { path: 'knowledge/webinars', component: WebinarsComponent },

  { path: '**', redirectTo: '' } // Wildcard route for 404 page
];
