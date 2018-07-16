import { Compute, GoogleAuth, JWT, OAuth2Client } from 'google-auth-library';
import * as apis from './../apis';
import { APIEndpoint, GlobalOptions } from './api';
import { Endpoint } from './endpoint';
export declare class AuthPlus extends GoogleAuth {
    JWT: typeof JWT;
    Compute: typeof Compute;
    OAuth2: typeof OAuth2Client;
}
export declare class GoogleApis extends apis.GeneratedAPIs {
    private _discovery;
    auth: AuthPlus;
    _options: GlobalOptions;
    [index: string]: APIEndpoint;
    /**
     * GoogleApis constructor.
     *
     * @example
     * const GoogleApis = require('googleapis').GoogleApis;
     * const google = new GoogleApis();
     *
     * @class GoogleApis
     * @param {Object} [options] Configuration options.
     */
    constructor(options?: {});
    /**
     * Set options.
     *
     * @param  {Object} [options] Configuration options.
     */
    options(options?: GlobalOptions): void;
    /**
     * Add APIs endpoints to googleapis object
     * E.g. googleapis.drive and googleapis.datastore
     *
     * @name GoogleApis#addAPIs
     * @method
     * @param {Object} apis Apis to be added to this GoogleApis instance.
     * @private
     */
    private addAPIs(apisToAdd);
    /**
     * Dynamically generate an apis object that can provide Endpoint objects for
     * the discovered APIs.
     *
     * @example
     * const {google} = require('googleapis');
     * const discoveryUrl =
     * 'https://myapp.appspot.com/_ah/api/discovery/v1/apis/';
     * google.discover(discoveryUrl, function (err) {
     *   const someapi = google.someapi('v1');
     * });
     *
     * @name GoogleApis#discover
     * @method
     * @param url Url to the discovery service for a set of APIs. e.g.,
     * https://www.googleapis.com/discovery/v1/apis
     * @param {Function} callback Callback function.
     */
    discover(url: string): Promise<void>;
    discover(url: string, callback: (err?: Error) => void): void;
    private discoverAsync(url);
    /**
     * Dynamically generate an Endpoint object from a discovery doc.
     *
     * @param path Url or file path to discover doc for a single API.
     * @param Options to configure the Endpoint object generated from the
     * discovery doc.
     * @returns A promise that resolves with the configured endpoint.
     */
    discoverAPI(apiPath: string, options?: {}): Promise<Readonly<Endpoint>>;
}
