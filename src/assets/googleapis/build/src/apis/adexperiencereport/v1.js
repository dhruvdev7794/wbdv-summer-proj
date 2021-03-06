"use strict";
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var apirequest_1 = require("../../lib/apirequest");
/**
 * Google Ad Experience Report API
 *
 * View Ad Experience Report data, and get a list of sites that have a
 * significant number of annoying ads.
 *
 * @example
 * const google = require('googleapis');
 * const adexperiencereport = google.adexperiencereport('v1');
 *
 * @namespace adexperiencereport
 * @type {Function}
 * @version v1
 * @variation v1
 * @param {object=} options Options for Adexperiencereport
 */
function Adexperiencereport(options) {
    var self = this;
    self._options = options || {};
    self.sites = {
        /**
         * adexperiencereport.sites.get
         * @desc Gets a summary of the ad experience rating of a site.
         * @alias adexperiencereport.sites.get
         * @memberOf! adexperiencereport(v1)
         *
         * @param {object} params Parameters for request
         * @param {string} params.name The required site name. It should be the site property whose ad experiences may have been reviewed, and it should be URL-encoded. For example, sites/https%3A%2F%2Fwww.google.com. The server will return an error of BAD_REQUEST if this field is not filled in. Note that if the site property is not yet verified in Search Console, the reportUrl field returned by the API will lead to the verification page, prompting the user to go through that process before they can gain access to the Ad Experience Report.
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        get: function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://adexperiencereport.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/{name}').replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET'
                }, options),
                params: params,
                requiredParams: ['name'],
                pathParams: ['name'],
                context: self
            };
            return apirequest_1.createAPIRequest(parameters, callback);
        }
    };
    self.violatingSites = {
        /**
         * adexperiencereport.violatingSites.list
         * @desc Lists sites with Ad Experience Report statuses of "Failing" or
         * "Warning".
         * @alias adexperiencereport.violatingSites.list
         * @memberOf! adexperiencereport(v1)
         *
         * @param {object} params Parameters for request
         * @param {object} [options] Optionally override request options, such as `url`, `method`, and `encoding`.
         * @param {callback} callback The callback that handles the response.
         * @return {object} Request object
         */
        list: function (params, options, callback) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            options = options || {};
            var rootUrl = options.rootUrl || 'https://adexperiencereport.googleapis.com/';
            var parameters = {
                options: Object.assign({
                    url: (rootUrl + '/v1/violatingSites')
                        .replace(/([^:]\/)\/+/g, '$1'),
                    method: 'GET'
                }, options),
                params: params,
                requiredParams: [],
                pathParams: [],
                context: self
            };
            return apirequest_1.createAPIRequest(parameters, callback);
        }
    };
}
module.exports = Adexperiencereport;
//# sourceMappingURL=v1.js.map