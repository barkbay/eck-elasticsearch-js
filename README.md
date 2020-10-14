# Sample usage of the Elasticsearch Node.js client with ECK

_This is a temporary/test repository which might be deleted at any time._

## Prerequisites

* A running ECK instance.
* An Elasticsearch cluster deployed with ECK using [the sample manifest](https://github.com/elastic/cloud-on-k8s/blob/master/config/samples/elasticsearch/elasticsearch.yaml).

If the cluster is not named `elasticsearch-sample` or does not live in the `default` namespace, update the service URL [in the sample](https://github.com/barkbay/eck-elasticsearch-js/blob/master/es.js) and the [deployment manifest](https://github.com/barkbay/eck-elasticsearch-js/blob/master/deployment.yaml) accordingly.

## Running the example

* Deploy the sample Pod using the deployment manifest:

```
kubectl apply -f https://raw.githubusercontent.com/barkbay/eck-elasticsearch-js/master/deployment.yaml
```

* Run a shell inside the Pod

```
kubectl exec -ti $(kubectl get pods --selector=app=node --output=jsonpath={.items..metadata.name}) /bin/bash
```

* Run the sample

```
root@node-deployment-5dbb6744c6-ngsnk:/usr/src/app# nodejs es.js
```

If everything is fine you should see something along those lines:

```
[ { _index: 'game-of-thrones',
    _type: '_doc',
    _id: 'EofsJXUB6sJu3ltUJkuA',
    _score: 0.90487003,
    _source: { character: 'Ned Stark', quote: 'Winter is coming.' } },
  { _index: 'game-of-thrones',
...
  { _index: 'game-of-thrones',
    _type: '_doc',
    _id: 'fETsJXUBDDKFUvQOmb46',
    _score: 0.90487003,
    _source: { character: 'Ned Stark', quote: 'Winter is coming.' } } ]
```

Note that the client is configured to use client autodiscovery (`sniffOnStart: true`) by default.
