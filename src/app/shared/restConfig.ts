import { baseurl, serverurl } from './baseurl';

//function for setting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(serverurl);
}