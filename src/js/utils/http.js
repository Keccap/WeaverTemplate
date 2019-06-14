/**
 * http(href).get().then(response => {});
 */

export default function http(url) {
  const core = {
    ajax: function(method, url, args, type) {
      const promise = new Promise(function(resolve, reject) {
        const client = new XMLHttpRequest();
        let query;
        let json;
        let argcount;
        let key;

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            resolve(this.response);
          } else {
            reject(this.statusText);
          }
        };

        client.onerror = function () {
          reject(this.statusText);
        };

        if (!args) {
          client.open(method, url);
          client.send();
        } else {
          if (!type || type === 'urlencoded') {
            query = '';
            argcount = 0;
            for (key in args) {
              if (args.hasOwnProperty(key)) {
                if (argcount++) {
                  query += '&';
                }
                query += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
              }
            }
          } else if (type === 'json') {
            json = JSON.stringify(args);
          }

          if ((method === 'GET' || method === 'DELETE')) {
            client.open(method, url + '?' + query);
            client.send(args);
          } else {
            client.open(method, url);

            if (type === 'json') {
              client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              client.send(json);
            } else if (type === 'urlencoded') {
              client.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              client.send(query);
            } else {
              client.send(args);
            }
          }
        }
      });
      return promise;
    }
  };

  return {
    'get': function(args, type) {
      return core.ajax('GET', url, args, type);
    },
    'post': function(args, type) {
      return core.ajax('POST', url, args, type);
    },
    'put': function(args, type) {
      return core.ajax('PUT', url, args, type);
    },
    'delete': function(args, type) {
      return core.ajax('DELETE', url, args, type);
    }
  };
}
